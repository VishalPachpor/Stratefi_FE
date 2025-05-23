"use client";

import { useEffect, useState, RefObject } from "react";

interface UseSplitTextOptions {
  splitBy?: "words" | "chars";
}

export function useSplitText(
  text: string,
  ref: RefObject<HTMLElement>,
  options: UseSplitTextOptions = { splitBy: "words" }
) {
  const [words, setWords] = useState<string[]>([]);
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    if (!text) return;

    if (options.splitBy === "words") {
      setWords(text.split(" "));
    } else {
      setChars(text.split(""));
    }
  }, [text, options.splitBy]);

  return {
    words,
    chars,
    splitBy: options.splitBy,
  };
}
