"use client";

import { ArrowRight, Check, ChevronDown, ArrowLeftRight, Hourglass } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Auto-resize hook (from 21st.dev/r/kokonutd/animated-ai-input) ───
interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}


export type CROModel = "CRO-X MINI" | "CRO-X ULTRA";

const CRO_MODELS: CROModel[] = ["CRO-X MINI", "CRO-X ULTRA"];

interface HeroInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder: string;
  inputHint?: string;
  selectedModel: CROModel;
  onModelChange: (m: CROModel) => void;
  disabled?: boolean;
  showModelSelector?: boolean;
  className?: string;
  isEnabled?: boolean;
}

export function HeroInput({
  value,
  onChange,
  onSubmit,
  isFocused: externalIsFocused,
  onFocus,
  onBlur,
  placeholder,
  inputHint = "",
  selectedModel,
  onModelChange,
  disabled = false,
  showModelSelector = true,
  className = "",
  isEnabled = true,
}: HeroInputProps) {
  const [status, setStatus] = useState<"loading" | "live" | "maintenance">("loading");
  const [isMounted, setIsMounted] = useState(false);
  const [internalIsFocused, setInternalIsFocused] = useState(false);

  // Combine external and internal focus state
  const isFocused = externalIsFocused ?? internalIsFocused;

  useEffect(() => {
    setIsMounted(true);
    if (!isEnabled) {
      setStatus("maintenance");
      return;
    }
    setStatus("loading");
    // Random delay between 3 and 7 seconds
    const delay = Math.floor(Math.random() * 4000) + 3000;
    const timer = setTimeout(() => {
      setStatus("live");
    }, delay);
    return () => clearTimeout(timer);
  }, [selectedModel, isEnabled]);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  if (!isMounted) return null;

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>

      {/* Model label removed to prevent overlap with dashboard Card headers */}


      <motion.div
        key={status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          "hero-input-status-indicator absolute -top-[40px] right-1 pointer-events-none select-none flex items-center gap-1.5 px-2 py-0.5 rounded-full backdrop-blur-sm mt-[5px] transition-colors duration-500",
          status === "live"
            ? "bg-emerald-500/10 border border-emerald-500/20"
            : status === "maintenance"
            ? "bg-amber-500/10 border border-amber-500/20"
            : "bg-amber-500/10 border border-amber-500/20"
        )}
      >
        {status === "live" ? (
          <>
            <div className="relative flex h-1.5 w-1.5">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></div>
            </div>
            <span className="text-[9px] font-black text-emerald-600/90 tracking-widest uppercase flex items-center gap-1">
              CANLI
            </span>
          </>
        ) : status === "maintenance" ? (
          <>
            <div className="relative flex h-1.5 w-1.5">
              <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></div>
            </div>
            <span className="text-[9px] font-black text-amber-600/90 tracking-widest uppercase flex items-center gap-1">
              BAKIMDA
            </span>
          </>
        ) : (
          <>
            <div className="relative flex h-1.5 w-1.5">
              <div className="animate-spin absolute inline-flex h-full w-full rounded-full border border-amber-500/30 border-t-amber-500"></div>
            </div>
            <span className="text-[9px] font-black text-amber-600/90 tracking-widest uppercase flex items-center gap-1">
              BEKLENİYOR
            </span>
          </>
        )}
      </motion.div>

      {/* Glow wrapper — replicates GlowingShadow border effect around input */}
      <div className="hero-ai-input-glow-wrapper relative rounded-2xl">
        {/* Animated glow border */}
        <div className="hero-ai-input-glow-border absolute inset-0 rounded-2xl" aria-hidden="true" />

        {/* Inner card */}
        <div
          className={cn(
            "relative z-[1] flex flex-col w-full rounded-2xl overflow-hidden",
            "bg-white/80 backdrop-blur-2xl",
            "border transition-colors duration-200",
            isFocused || value ? "border-black/12" : "border-black/8"
          )}
        >
          {/* Textarea area */}
          <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
            <div className="relative">
              {!value && (
                <div
                  className="pointer-events-none absolute inset-0 z-10 flex items-center px-4 text-[11px]"
                  aria-hidden="true"
                >
                  {/* Show simulated cursor only when NOT focused */}
                  {!isFocused && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-[1px] h-4.5 bg-black/80 mr-1.5 translate-y-[0.5px]"
                    />
                  )}
                  <span className={cn(
                    "hero-metallic-placeholder whitespace-nowrap transition-colors duration-200",
                    isFocused && inputHint ? "text-black/30" : ""
                  )}>
                    {(isFocused && inputHint) ? inputHint : placeholder}
                  </span>
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={value}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  onChange(e.target.value);
                  adjustHeight();
                }}
                onFocus={(e) => {
                  setInternalIsFocused(true);
                  onFocus?.();
                }}
                onBlur={(e) => {
                  setInternalIsFocused(false);
                  onBlur?.();
                }}
                disabled={disabled || !isEnabled}
                rows={1}
                className={cn(
                  "w-full bg-transparent border-none resize-none",
                  "px-4 py-4 text-sm text-[var(--color-text)]",
                  "placeholder:text-transparent",
                  "focus:outline-none focus:ring-0",
                  "min-h-[52px]",
                  (disabled || !isEnabled) && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="h-12 bg-black/[0.02] flex items-center">
            <div className="absolute left-3 right-3 bottom-[6px] flex items-center justify-between w-[calc(100%-24px)]">
              {/* Left: model dropdown */}
              <div className="flex items-center gap-2">
                {showModelSelector ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 h-8 pl-1.5 pr-2 text-[11px] font-semibold rounded-md text-black/50 hover:text-black hover:bg-black/5 transition-all focus:outline-none"
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={selectedModel}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1.5"
                          >
                            <ArrowLeftRight className="w-3 h-3 opacity-40" />
                            <span className="tracking-wider uppercase">{selectedModel}</span>
                            <ChevronDown className="w-3 h-3 opacity-40" />
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className={cn(
                        "min-w-[10rem] z-50",
                        "border-black/10",
                        "bg-white/95 backdrop-blur-xl"
                      )}
                    >
                      {CRO_MODELS.map((model) => (
                        <DropdownMenuItem
                          key={model}
                          onSelect={() => onModelChange(model)}
                          className="flex items-center justify-between gap-2 cursor-pointer text-black/60 hover:text-black focus:text-black focus:bg-black/5"
                        >
                          <span className="text-[11px] font-semibold tracking-wider uppercase">{model}</span>
                          {selectedModel === model && (
                            <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-1.5 h-8 px-2 text-[10px] font-black tracking-widest text-black/30 uppercase opacity-60">
                    {selectedModel}
                  </div>
                )}
              </div>

              {/* Right: send button — black bg, white arrow */}
              <button
                type="button"
                onClick={onSubmit}
                disabled={disabled || !isEnabled}
                aria-label="Analiz Et"
                className={cn(
                  "rounded-lg p-2 transition-all",
                  "bg-[#0F172A]",
                  "hover:bg-black active:scale-[0.97]",
                  "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
                  (disabled || !isEnabled) && "opacity-50 cursor-not-allowed active:scale-100"
                )}
              >
                {(disabled || !isEnabled) ? <Hourglass className="w-4 h-4 text-white animate-pulse" /> : <ArrowRight className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
