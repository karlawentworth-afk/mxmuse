export default function PointsQuestion({ question, value, onChange }) {
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
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;
    const updated = { ...currentPoints, [archetype]: numValue };
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const points = currentPoints[archetype];

        return (
          <div
            key={archetype}
            className={`p-5 md:p-6 rounded-xl border-2 transition-all duration-200 ${
              points > 0
                ? 'border-muse-teal/30 bg-muse-teal/5'
                : 'border-warm-gray bg-white'
            }`}
          >
            <p className="text-base md:text-lg text-near-black leading-relaxed mb-3">
              {option.text}
            </p>
            <input
              type="number"
              min="0"
              max="100"
              value={points || ''}
              onChange={(e) => handleChange(archetype, e.target.value)}
              className="w-20 h-10 text-center text-base font-semibold border-2 border-warm-gray rounded-lg bg-white text-near-black focus:outline-none focus:border-muse-teal tabular-nums"
              placeholder="0"
            />
          </div>
        );
      })}
      <div className={`text-base font-semibold tabular-nums pt-2 ${
        total === 100 ? 'text-muse-teal' : total > 100 ? 'text-storyteller' : 'text-mid-gray'
      }`}>
        {total === 100 ? '100 points distributed' :
         total > 100 ? `${total}/100 (over budget)` :
         `${total}/100 (${remaining} remaining)`}
      </div>
    </div>
  );
}
