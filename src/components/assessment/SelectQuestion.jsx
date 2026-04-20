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
            className={`w-full text-left p-5 md:p-6 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'border-muse-teal bg-muse-teal/5 shadow-sm'
                : 'border-warm-gray bg-white hover:border-mid-gray hover:shadow-sm'
            }`}
          >
            <span className={`text-base md:text-lg leading-relaxed ${
              isSelected ? 'text-near-black font-medium' : 'text-near-black'
            }`}>
              {option.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
