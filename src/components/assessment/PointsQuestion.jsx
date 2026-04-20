export default function PointsQuestion({ question, value, onChange }) {
  // value shape: { storyteller: 30, strategist: 25, scientist: 20, builder: 25 } or null
  const currentPoints = value || {
    storyteller: 0,
    strategist: 0,
    scientist: 0,
    builder: 0
  };

  const total = Object.values(currentPoints).reduce((sum, v) => sum + v, 0);
  const remaining = 100 - total;

  function handleChange(archetype, rawValue) {
    const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
    if (isNaN(numValue) || numValue < 0) return;

    // Don't allow individual value over 100
    if (numValue > 100) return;

    const updated = { ...currentPoints, [archetype]: numValue };
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const points = currentPoints[archetype];

        return (
          <div key={archetype} className="flex gap-3 items-start">
            <div className="shrink-0 pt-1">
              <input
                type="number"
                min="0"
                max="100"
                value={points || ''}
                onChange={(e) => handleChange(archetype, e.target.value)}
                className="w-16 h-9 text-center text-sm border border-warm-gray rounded-md bg-white text-near-black focus:outline-none focus:border-muse-teal tabular-nums"
                placeholder="0"
              />
            </div>
            <p className="text-near-black leading-relaxed pt-1.5">{option.text}</p>
          </div>
        );
      })}
      <div className={`text-sm font-medium tabular-nums ${
        total === 100 ? 'text-muse-teal' : total > 100 ? 'text-storyteller' : 'text-mid-gray'
      }`}>
        {total}/100 points used
        {remaining > 0 && ` (${remaining} remaining)`}
        {total > 100 && ' (over budget)'}
      </div>
    </div>
  );
}
