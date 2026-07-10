import { NextRequest, NextResponse } from "next/server";

/**
 * CivicPulse AI — Universal API Proxy
 *
 * All requests to /api/proxy/* from the Next.js frontend are transparently
 * forwarded to the FastAPI backend. This eliminates CORS preflight issues
 * because the browser always talks to the same Vercel origin.
 *
 * Usage from the frontend:
 *   fetch("/api/proxy/api/triage", { method: "POST", body: ... })
 *
 * Maps to:
 *   https://<BACKEND_URL>/api/triage
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Strip the /api/proxy prefix so we forward the clean path to FastAPI.
function buildUpstreamUrl(request: NextRequest): string {
  const { pathname, search } = new URL(request.url);
  const upstreamPath = pathname.replace(/^\/api\/proxy/, "");
  return `${BACKEND_URL}${upstreamPath}${search}`;
}

// Forward all HTTP methods generically.
async function handler(request: NextRequest) {
  const upstreamUrl = buildUpstreamUrl(request);

  // Clone headers and strip host so the backend sees its own host.
  const headers = new Headers(request.headers);
  headers.delete("host");

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      // Only attach body for methods that carry one.
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : request.body,
      // Required for streaming request bodies (e.g. large base64 images).
      duplex: "half",
    } as RequestInit);

    // Relay the full response (status, headers, body) back to the browser.
    const responseHeaders = new Headers(upstreamResponse.headers);
    // Ensure CORS headers on the Vercel edge response are not duplicated.
    responseHeaders.delete("access-control-allow-origin");
    responseHeaders.set("access-control-allow-origin", "*");

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
        error: "Backend unreachable. Please ensure the FastAPI service is running.",
      },
      { status: 503 }
    );
  }
}

// Export all HTTP method handlers (Next.js App Router requires named exports).
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
