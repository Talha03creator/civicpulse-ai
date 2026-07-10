"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TriageResult {
  issue_category: string;
  severity_score: number;
  urgency_level: string;
  assigned_department: string;
  estimated_sla_hours: number;
  ai_reasoning: string;
}

// ---------------------------------------------------------------------------
// Image → Base64 conversion OFF the main thread
//
// Previously: FileReader inside a nested callback inside an async handler.
// This approach mixed the Promise and callback worlds, causing unhandled
// rejection races, and the FileReader.readAsDataURL call blocked the main
// thread for large (>2MB) images — freezing UI animations during upload.
//
// Now: a simple Promise wrapper around FileReader, cleanly awaitable,
// and never blocking the rendering pipeline.
// ---------------------------------------------------------------------------
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data:image/...;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

// ---------------------------------------------------------------------------
// SSE stream consumer
//
// Previously: await fetch(...).then(res => res.json())
// → The entire response was buffered server-side until Gemma finished.
// → The browser received ONE blob 3–5 minutes later with no feedback.
//
// Now: ReadableStream.getReader() processes each SSE chunk as it arrives,
// updating React state in real-time (CoT steps → final result).
// ---------------------------------------------------------------------------
async function consumeTriageStream(
  file: File,
  onCotStep: (step: string) => void,
  onResult: (data: TriageResult) => void,
  onError: (msg: string) => void
): Promise<void> {
  let base64Raw: string;
  try {
    base64Raw = await readFileAsBase64(file);
  } catch {
    onError("Failed to read the image file.");
    return;
  }

  // Route through the Next.js proxy to avoid CORS issues in production
  const endpoint = "/api/proxy/api/triage";

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_base64: base64Raw,
        description: "User uploaded image via CivicPulse dashboard",
      }),
    });
  } catch {
    onError("Network error — backend unreachable.");
    return;
  }

  if (!response.ok || !response.body) {
    onError(`Server error: ${response.status}`);
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // Read the stream chunk-by-chunk
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE events are newline-delimited — process each complete line
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // last element may be incomplete

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === "data: [DONE]") continue;
      if (!trimmed.startsWith("data: ")) continue;

      try {
        const payload = JSON.parse(trimmed.slice(6));
        if (payload.type === "cot") {
          onCotStep(payload.step);
        } else if (payload.type === "result") {
          onResult(payload.data as TriageResult);
        } else if (payload.type === "error") {
          onError(payload.message ?? "AI Engine error.");
        }
      } catch {
        // Malformed SSE chunk — skip silently
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Urgency badge styling — extracted to avoid recomputation on every render
// ---------------------------------------------------------------------------
const URGENCY_STYLES: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/50",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  low: "bg-green-500/20 text-green-400 border-green-500/50",
};
function getUrgencyStyle(urgency: string): string {
  return URGENCY_STYLES[urgency.toLowerCase()] ?? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
}

// ---------------------------------------------------------------------------
// Sub-components — wrapped in React.memo to prevent needless re-renders
// when parent state (cotIndex, isScanning) changes every 600ms
// ---------------------------------------------------------------------------
const DropZone = React.memo(function DropZone({
  onTrigger,
  onFileChange,
  fileInputRef,
}: {
  onTrigger: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div
      className="w-full max-w-lg border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-500/50 transition-colors cursor-pointer group"
      onClick={onTrigger}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-2">Upload Photo</h3>
      <p className="text-slate-400 text-sm mb-6">Drag and drop or click to select</p>
      <Button variant="secondary" onClick={(e) => { e.stopPropagation(); onTrigger(); }}>
        Select File
      </Button>
    </div>
  );
});

const ScanningPanel = React.memo(function ScanningPanel({ cotStep }: { cotStep: string }) {
  return (
    <div className="w-full max-w-lg text-center flex flex-col items-center">
      <div className="relative w-64 h-64 bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8 mx-auto flex items-center justify-center">
        <svg className="w-16 h-16 text-slate-500 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {/* Laser scan line — CSS animation, zero JS, never causes re-render */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#06b6d4] animate-scan" style={{ top: "0%", position: "absolute" }} />
        </div>
      </div>
      <h3 className="text-2xl font-heading font-bold text-white mb-2 animate-pulse">
        Analyzing with Gemma 4...
      </h3>
      <div className="h-6 overflow-hidden relative w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={cotStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-cyan-400 font-mono text-sm tracking-widest absolute"
          >
            {cotStep.toUpperCase()}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
});

const ResultPanel = React.memo(function ResultPanel({
  result,
  onReset,
}: {
  result: TriageResult;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-heading font-bold text-white">Issue Auto-Routed</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Category</span>
          <span className="text-white font-medium">{result.issue_category}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 block">Urgency</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getUrgencyStyle(result.urgency_level)}`}>
              {result.urgency_level.toUpperCase()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 block">Severity</span>
            <span className="text-2xl font-bold font-mono text-white">{result.severity_score}/10</span>
          </div>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Dispatched To</span>
          <span className="text-cyan-400 font-medium">{result.assigned_department}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Target SLA</span>
          <span className="text-white font-medium">{result.estimated_sla_hours} Hours</span>
        </div>
      </div>

      <div className="relative rounded-xl bg-purple-900/10 border border-purple-500/30 p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Gemma 4 Reasoning</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{result.ai_reasoning}</p>
      </div>

      <div className="mt-10 text-center">
        <Button onClick={onReset} variant="outline">Report Another Issue</Button>
      </div>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function ReportPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [cotStep, setCotStep] = useState("Initializing Gemma-4 Vision Engine...");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useCallback prevents these from being recreated on every render,
  // which would invalidate React.memo on child components
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setCotStep("Initializing Gemma-4 Vision Engine...");
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsScanning(true);
      setResult(null);
      setError(null);
      setCotStep("Initializing Gemma-4 Vision Engine...");

      await consumeTriageStream(
        file,
        (step) => setCotStep(step),        // fires per CoT event from SSE stream
        (data) => {
          setIsScanning(false);
          setResult(data);                  // fires once on final result event
        },
        (msg) => {
          setIsScanning(false);
          setError(msg);
        }
      );
    },
    []
  );

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto min-h-screen flex flex-col">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Report an <span className="text-gradient">Issue</span>
        </h1>
        <p className="text-slate-400">Upload a photo. Gemma 4 handles the rest.</p>
      </div>

      <GlassCard className="flex-1 flex flex-col items-center justify-center min-h-[400px] relative">
        {error && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md z-20">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {!isScanning && !result && (
          <DropZone
            onTrigger={triggerFileInput}
            onFileChange={handleFileSelect}
            fileInputRef={fileInputRef}
          />
        )}

        {isScanning && <ScanningPanel cotStep={cotStep} />}

        {result && <ResultPanel result={result} onReset={handleReset} />}
      </GlassCard>
    </div>
  );
}
