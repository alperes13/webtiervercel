"use client";

import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionSpan = motion.span;

interface TextProps
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    "children" | "onAnimationStart" | "onAnimationEnd" | "onClick"
  > {
  children: ReactNode;
  reverse?: boolean;
  transition?: Transition;
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = {
        type: "spring",
        stiffness: 190,
        damping: 22,
      },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref
  ) => {
    const text = typeof children === "string" ? children : children?.toString() || "";
    const [isAnimating, setIsAnimating] = useState(autoStart);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), ({ segment }) => segment);
      }
      return Array.from(text);
    };

    const elements = useMemo<WordObject[]>(() => {
      if (splitBy === "characters") {
        const words = text.split(" ");

        return words.map((word, index) => ({
          characters: splitIntoCharacters(word),
          needsSpace: index !== words.length - 1,
        }));
      }

      const segments =
        splitBy === "words"
          ? text.split(" ")
          : splitBy === "lines"
            ? text.split("\n")
            : text.split(splitBy);

      return segments.map((segment, index) => ({
        characters: [segment],
        needsSpace:
          (splitBy === "words" || splitBy === "characters") &&
          index !== segments.length - 1,
      }));
    }, [text, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number) => {
        const total = elements.reduce(
          (acc, word) => acc + word.characters.length + (word.needsSpace ? 1 : 0),
          0
        );
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [elements, staggerFrom, staggerDuration]
    );

    const startAnimation = useCallback(() => {
      setIsAnimating(true);
      onStart?.();
    }, [onStart]);

    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }));

    const variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (i: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: (transition?.delay ?? 0) + getStaggerDelay(i),
        },
      }),
    };

    return (
      <span
        className={cn(containerClassName, "flex flex-wrap whitespace-pre-wrap", splitBy === "lines" && "flex-col")}
        onClick={onClick}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {elements.map((wordObj, wordIndex, array) => {
          const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);

          return (
            <span key={wordIndex} aria-hidden="true" className={cn("inline-flex overflow-hidden", wordLevelClassName)}>
              {wordObj.characters.map((char, charIndex) => (
                <span className={cn(elementLevelClassName, "whitespace-pre-wrap relative")} key={charIndex}>
                  <MotionSpan
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={
                      wordIndex === elements.length - 1 && charIndex === wordObj.characters.length - 1 ? onComplete : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </MotionSpan>
                </span>
              ))}
              {wordObj.needsSpace && <span> </span>}
            </span>
          );
        })}
      </span>
    );
  }
);

VerticalCutReveal.displayName = "VerticalCutReveal";

export { VerticalCutReveal };
