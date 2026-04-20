const RANKS = [1, 2, 3, 4];

export default function RankingQuestion({ question, value, onChange }) {
  // value shape: { storyteller: 2, strategist: 1, scientist: 4, builder: 3 } or null
  const currentRanks = value || {};

  function handleRankChange(archetype, rank) {
    const updated = { ...currentRanks };

    // If another option already has this rank, swap them
    const existingHolder = Object.keys(updated).find(k => updated[k] === rank);
    if (existingHolder && existingHolder !== archetype) {
      updated[existingHolder] = currentRanks[archetype] || null;
    }

    updated[archetype] = rank;
    onChange(updated);
  }

  function isComplete() {
    const archetypes = question.options.map(o => o.archetype);
    const assignedRanks = archetypes.map(a => currentRanks[a]).filter(Boolean);
    return assignedRanks.length === 4 && new Set(assignedRanks).size === 4;
  }

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const archetype = option.archetype;
        const selectedRank = currentRanks[archetype];

        return (
          <div key={archetype} className="flex gap-3 items-start">
            <div className="flex gap-1.5 pt-1 shrink-0">
              {RANKS.map((rank) => {
                const isSelected = selectedRank === rank;
                const isTaken = !isSelected && Object.values(currentRanks).includes(rank);
                return (
                  <button
                    key={rank}
                    onClick={() => handleRankChange(archetype, rank)}
                    className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-muse-teal text-white'
                        : isTaken
                          ? 'bg-warm-gray/50 text-mid-gray border border-warm-gray'
                          : 'bg-white text-near-black border border-warm-gray hover:border-mid-gray'
                    }`}
                  >
                    {rank}
                  </button>
                );
              })}
            </div>
            <p className="text-near-black leading-relaxed pt-1.5">{option.text}</p>
          </div>
        );
      })}
      <p className="text-xs text-mid-gray mt-2">
        1 = most, 4 = least. Each number used once.
      </p>
    </div>
  );
}
