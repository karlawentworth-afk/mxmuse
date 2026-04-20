import { useEffect } from 'react';
import { useTypingReveal } from './useTypingReveal';

export default function DiaryPanel({ archetype, isActive, hasBeenSeen, reduceMotion, onComplete }) {
  const shouldAnimate = isActive && !hasBeenSeen;
  const showInstant = !shouldAnimate || reduceMotion;

  const { revealedSegments, isComplete, skipToEnd } = useTypingReveal(
    archetype.segments,
    isActive,
    showInstant
  );

  // Notify parent when typing completes
  useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-opacity duration-300"
      style={{
        backgroundColor: '#FBF9F4',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
      }}
      onClick={() => { if (!isComplete) skipToEnd(); }}
    >
      {/* Margin line */}
      <div
        className="absolute left-6 md:left-10 top-0 bottom-0 w-px"
        style={{ backgroundColor: archetype.hex, opacity: 0.25 }}
      />

      <div className="pl-10 md:pl-16 pr-6 md:pr-10 py-8 md:py-12">
        {/* Date/time - appears instantly */}
        <p className="text-sm text-mid-gray mb-8 text-right">
          Tuesday. 14:47.
        </p>

        {/* Skip affordance */}
        {!isComplete && !showInstant && (
          <button
            onClick={(e) => { e.stopPropagation(); skipToEnd(); }}
            className="absolute top-4 right-6 text-xs text-mid-gray hover:text-near-black transition-colors"
          >
            skip
          </button>
        )}

        {/* Segments */}
        <div className="space-y-6">
          {revealedSegments.map((seg, i) => {
            if (!seg.revealedText && !showInstant) return null;

            const text = showInstant ? seg.text : seg.revealedText;
            if (!text) return null;

            if (seg.type === 'tagline') {
              return (
                <p key={i} className="font-heading italic text-lg md:text-xl text-near-black/70 leading-relaxed">
                  {text}
                </p>
              );
            }

            if (seg.type === 'todo-header') {
              return (
                <p key={i} className="font-hand text-xl md:text-2xl text-near-black/80 mt-6 mb-2" style={{ fontFamily: 'var(--font-family-hand)' }}>
                  {text}
                </p>
              );
            }

            if (seg.type === 'todo') {
              const isChecked = showInstant ? seg.checked : seg.checkRevealed;
              const isLastUnchecked = !seg.checked;
              return (
                <div key={i} className="flex items-start gap-3 ml-1">
                  <span
                    className="inline-block w-5 h-5 mt-1.5 rounded border-2 shrink-0 flex items-center justify-center transition-colors duration-300"
                    style={{
                      borderColor: isChecked ? archetype.hex : '#D1CFC8',
                      backgroundColor: isChecked ? `${archetype.hex}15` : 'transparent',
                    }}
                  >
                    {isChecked && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke={archetype.hex} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-lg leading-relaxed transition-colors duration-300 ${
                      isChecked ? 'text-near-black/50 line-through' : isLastUnchecked ? 'text-near-black font-medium' : 'text-near-black'
                    }`}
                    style={{ fontFamily: 'var(--font-family-hand)', fontSize: '1.25rem' }}
                  >
                    {text}
                  </span>
                </div>
              );
            }

            if (seg.type === 'promise') {
              return (
                <div key={i} className="mt-8 pt-6 border-t border-warm-gray/40">
                  <p
                    className="text-base md:text-lg leading-relaxed text-muse-teal"
                    style={{ fontFamily: 'var(--font-family-hand)', fontSize: '1.2rem' }}
                  >
                    {text}
                  </p>
                </div>
              );
            }

            // Default: prose
            return (
              <p key={i} className="text-near-black/85 leading-relaxed text-base md:text-lg">
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
