import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Reveals an array of content segments word-by-word in small bursts.
 *
 * Each segment is an object: { type: 'prose'|'tagline'|'todo'|'promise', text: string }
 * For 'todo' type, text is the todo item text, and it also accepts: { checked: boolean }
 *
 * Returns:
 *   - revealedSegments: array of { ...segment, revealedText, checkRevealed }
 *   - isComplete: boolean
 *   - skipToEnd: function
 */
export function useTypingReveal(segments, active, reduceMotion) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  // Build a flat list of all words with their segment index
  const wordMap = useRef([]);

  useEffect(() => {
    const map = [];
    segments.forEach((seg, segIdx) => {
      const words = seg.text.split(/\s+/).filter(Boolean);
      words.forEach((word, wIdx) => {
        map.push({ segIdx, word, wordInSeg: wIdx });
      });
      // Add a pause marker between segments
      if (segIdx < segments.length - 1) {
        map.push({ segIdx, pause: true });
      }
    });
    wordMap.current = map;
  }, [segments]);

  const totalWords = wordMap.current.filter(w => !w.pause).length;

  // Reset when becoming active
  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setWordIndex(wordMap.current.length);
      setIsComplete(true);
      return;
    }

    setWordIndex(0);
    setIsComplete(false);
  }, [active, reduceMotion]);

  // Animate
  useEffect(() => {
    if (!active || isComplete || reduceMotion) return;

    if (wordIndex >= wordMap.current.length) {
      setIsComplete(true);
      return;
    }

    const current = wordMap.current[wordIndex];

    // Pause between segments
    if (current?.pause) {
      timerRef.current = setTimeout(() => {
        setWordIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timerRef.current);
    }

    // Variable speed: 2-4 words per burst, 50-90ms per word
    const burstSize = Math.floor(Math.random() * 3) + 2;
    const delay = Math.floor(Math.random() * 40) + 50;

    timerRef.current = setTimeout(() => {
      setWordIndex(prev => Math.min(prev + burstSize, wordMap.current.length));
    }, delay * burstSize);

    return () => clearTimeout(timerRef.current);
  }, [active, wordIndex, isComplete, reduceMotion]);

  const skipToEnd = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setWordIndex(wordMap.current.length);
    setIsComplete(true);
  }, []);

  // Build revealed segments
  const revealedSegments = segments.map((seg, segIdx) => {
    if (isComplete || reduceMotion) {
      return { ...seg, revealedText: seg.text, checkRevealed: true };
    }

    // Count how many words in this segment have been revealed
    let revealedCount = 0;
    for (let i = 0; i < wordIndex && i < wordMap.current.length; i++) {
      const entry = wordMap.current[i];
      if (!entry.pause && entry.segIdx === segIdx) {
        revealedCount++;
      }
    }

    const words = seg.text.split(/\s+/).filter(Boolean);
    const revealedText = words.slice(0, revealedCount).join(' ');

    // For todo items, reveal the check after the text is fully shown
    const textFullyRevealed = revealedCount >= words.length;
    const checkRevealed = textFullyRevealed && seg.type === 'todo' && seg.checked;

    return { ...seg, revealedText, checkRevealed, textFullyRevealed };
  });

  return { revealedSegments, isComplete, skipToEnd };
}
