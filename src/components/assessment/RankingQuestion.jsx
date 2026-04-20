const RANKS = [1, 2, 3, 4];

export default function RankingQuestion({ question, value, onChange }) {
  const currentRanks = value || {};

  function handleRankChange(archetype, rank) {
    const updated = { ...currentRanks };
    const existingHolder = Object.keys(updated).find(k => updated[k] === rank);
    if (existingHolder && existingHolder !== archetype) {
      updated[existingHolder] = currentRanks[archetype] || null;
    }
    updated[archetype] = rank;
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const selectedRank = currentRanks[archetype];

        return (
          <div
            key={archetype}
            className={`p-5 md:p-6 rounded-xl border-2 transition-all duration-200 ${
              selectedRank
                ? 'border-muse-teal/30 bg-muse-teal/5'
                : 'border-warm-gray bg-white'
            }`}
          >
            <p className="text-base md:text-lg text-near-black leading-relaxed mb-4">
              {option.text}
            </p>
            <div className="flex gap-2">
              {RANKS.map((rank) => {
                const isSelected = selectedRank === rank;
                const isTaken = !isSelected && Object.values(currentRanks).includes(rank);
                return (
                  <button
                    key={rank}
                    onClick={() => handleRankChange(archetype, rank)}
                    className={`w-11 h-11 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-muse-teal text-white shadow-sm'
                        : isTaken
                          ? 'bg-warm-gray/60 text-mid-gray border border-warm-gray'
                          : 'bg-white text-near-black border-2 border-warm-gray hover:border-mid-gray'
                    }`}
                  >
                    {rank}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-sm text-mid-gray mt-3">
        1 = most, 4 = least. Each number used once.
      </p>
    </div>
  );
}
