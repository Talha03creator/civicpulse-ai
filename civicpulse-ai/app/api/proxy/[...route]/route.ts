import { NextRequest, NextResponse } from "next/server";

/**
 * CivicPulse AI — Universal Streaming API Proxy
 *
 * Transparently forwards all /api/proxy/* requests to the FastAPI backend.
 * Critically, this proxy does NOT buffer — it pipes the ReadableStream body
 * directly through, so SSE chunks from the Python backend reach the browser
 * in real-time without any intermediate buffering.
 *
 * Vercel note: `export const maxDuration = 60` extends the serverless
 * function timeout from the default 10s to 60s, which is required for
 * long-running AI inference streams. Upgrade to Pro plan for 300s max.
 */

// Extend Vercel function timeout for AI streaming responses
export const maxDuration = 60;

// Tell Next.js this route must run as a dynamic serverless function
// (not statically prerendered) — required for streaming responses.
export const dynamic = "force-dynamic";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function buildUpstreamUrl(request: NextRequest): string {
  const { pathname, search } = new URL(request.url);
  const upstreamPath = pathname.replace(/^\/api\/proxy/, "");
  return `${BACKEND_URL}${upstreamPath}${search}`;
}

async function handler(request: NextRequest) {
  const upstreamUrl = buildUpstreamUrl(request);

  const headers = new Headers(request.headers);
  headers.delete("host");
  // Signal to FastAPI that we accept SSE streams
  headers.set("Accept", "text/event-stream");

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : request.body,
      // Required for streaming request bodies (large base64 image payloads)
      duplex: "half",
      // CRITICAL: do NOT set cache: "no-store" here — that converts the
      // response to a buffered Response, breaking SSE streaming.
    } as RequestInit);

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.delete("access-control-allow-origin");
    responseHeaders.set("access-control-allow-origin", "*");

    // Pipe the upstream ReadableStream body directly to the client response.
    // Using `new NextResponse(upstreamResponse.body, ...)` correctly passes
    // the stream through WITHOUT buffering — the key that makes SSE work.
    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[API Proxy] Upstream fetch failed:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Backend unreachable. Please ensure the FastAPI service is running.",
      },
      { status: 503 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
