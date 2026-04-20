import { useMemo } from 'react';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SelectQuestion({ question, value, onChange, shuffleOrder }) {
  // Shuffle options once per question render using a stable seed per question number.
  // shuffleOrder is an array of indices passed from parent to keep order stable
  // across re-renders but randomised per session.
  const orderedOptions = useMemo(() => {
    if (shuffleOrder) {
      return shuffleOrder.map(i => question.options[i]);
    }
    return shuffle(question.options);
  }, [question.number, shuffleOrder]);

  return (
    <div className="space-y-3">
      {orderedOptions.map((option) => {
        const isSelected = value === option.archetype;
        return (
          <button
            key={option.archetype}
            onClick={() => onChange(option.archetype)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              isSelected
                ? 'border-muse-teal bg-muse-teal/5 text-near-black'
                : 'border-warm-gray bg-white text-near-black hover:border-mid-gray'
            }`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}
