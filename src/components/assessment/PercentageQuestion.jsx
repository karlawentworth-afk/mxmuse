export default function PercentageQuestion({ question, value, onChange }) {
  const currentValues = value || {
    storyteller: 0,
    strategist: 0,
    scientist: 0,
    builder: 0
  };

  const total = Object.values(currentValues).reduce((sum, v) => sum + v, 0);
  const remaining = 100 - total;

  function handleChange(archetype, rawValue) {
    const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;
    const updated = { ...currentValues, [archetype]: numValue };
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const pct = currentValues[archetype];

        return (
          <div
            key={archetype}
            className={`p-5 md:p-6 rounded-xl border-2 transition-all duration-200 ${
              pct > 0
                ? 'border-muse-teal/30 bg-muse-teal/5'
                : 'border-warm-gray bg-white'
            }`}
          >
            <p className="text-base md:text-lg text-near-black leading-relaxed mb-3">
              {option.text}
            </p>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={pct || ''}
                onChange={(e) => handleChange(archetype, e.target.value)}
                className="w-20 h-10 text-center text-base font-semibold border-2 border-warm-gray rounded-lg bg-white text-near-black focus:outline-none focus:border-muse-teal tabular-nums"
                placeholder="0"
              />
              <span className="text-base text-mid-gray font-medium">%</span>
            </div>
          </div>
        );
      })}
      <div className={`text-base font-semibold tabular-nums pt-2 ${
        total === 100 ? 'text-muse-teal' : total > 100 ? 'text-storyteller' : 'text-mid-gray'
      }`}>
        {total === 100 ? '100% allocated' :
         total > 100 ? `${total}% (over 100%)` :
         `${total}% (${remaining}% remaining)`}
      </div>
    </div>
  );
}
