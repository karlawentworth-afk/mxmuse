export default function PercentageQuestion({ question, value, onChange }) {
  // Same UI as points but labelled as percentages.
  // value shape: { storyteller: 40, strategist: 20, scientist: 10, builder: 30 } or null
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
    if (isNaN(numValue) || numValue < 0) return;
    if (numValue > 100) return;

    const updated = { ...currentValues, [archetype]: numValue };
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const pct = currentValues[archetype];

        return (
          <div key={archetype} className="flex gap-3 items-start">
            <div className="shrink-0 pt-1 flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="100"
                value={pct || ''}
                onChange={(e) => handleChange(archetype, e.target.value)}
                className="w-16 h-9 text-center text-sm border border-warm-gray rounded-md bg-white text-near-black focus:outline-none focus:border-muse-teal tabular-nums"
                placeholder="0"
              />
              <span className="text-sm text-mid-gray">%</span>
            </div>
            <p className="text-near-black leading-relaxed pt-1.5">{option.text}</p>
          </div>
        );
      })}
      <div className={`text-sm font-medium tabular-nums ${
        total === 100 ? 'text-muse-teal' : total > 100 ? 'text-storyteller' : 'text-mid-gray'
      }`}>
        {total}% allocated
        {remaining > 0 && ` (${remaining}% remaining)`}
        {total > 100 && ' (over 100%)'}
      </div>
    </div>
  );
}
