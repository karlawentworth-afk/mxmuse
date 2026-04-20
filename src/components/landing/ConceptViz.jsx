const ARCHETYPES = [
  { key: 'Storyteller', color: '#C4553A' },
  { key: 'Strategist', color: '#2C3E6B' },
  { key: 'Scientist', color: '#7B4DAA' },
  { key: 'Builder', color: '#2A9D8F' },
]

const TALENT = [65, 10, 5, 20]
const ROLE = [15, 20, 15, 50]

function BarGroup({ label, values }) {
  return (
    <div className="flex-1">
      <p className="text-xs font-bold tracking-[0.2em] text-mid-gray uppercase mb-6">
        {label}
      </p>
      <div className="space-y-5">
        {ARCHETYPES.map((a, i) => (
          <div key={a.key}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-near-black">{a.key}</span>
              <span className="font-semibold tabular-nums" style={{ color: a.color }}>
                {values[i]}%
              </span>
            </div>
            <div className="h-4 bg-warm-gray/50 rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm"
                style={{ width: `${values[i]}%`, backgroundColor: a.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ConceptViz() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <div className="bg-white border border-warm-gray rounded-2xl p-8 md:p-12 lg:p-16 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          <BarGroup label="Natural talent" values={TALENT} />

          {/* Gap indicator - desktop */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-6">
            <div className="w-px flex-1 bg-warm-gray" />
            <div className="bg-near-black text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <span className="text-2xl font-heading font-bold leading-none">7</span>
              <span className="text-[10px] tracking-wider uppercase opacity-70">/10 gap</span>
            </div>
            <div className="w-px flex-1 bg-warm-gray" />
          </div>

          {/* Gap indicator - mobile */}
          <div className="flex lg:hidden items-center justify-center gap-4 py-4">
            <div className="h-px flex-1 bg-warm-gray" />
            <div className="bg-near-black text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <span className="text-2xl font-heading font-bold leading-none">7</span>
              <span className="text-[10px] tracking-wider uppercase opacity-70">/10 gap</span>
            </div>
            <div className="h-px flex-1 bg-warm-gray" />
          </div>

          <BarGroup label="Role demands" values={ROLE} />
        </div>

        <div className="mt-12 pt-8 border-t border-warm-gray text-center">
          <p className="text-near-black font-heading text-xl md:text-2xl font-medium max-w-lg mx-auto leading-snug">
            This person's role demands the opposite of what they're built for.
          </p>
          <p className="text-mid-gray mt-2 text-lg">
            They're not failing. They're displaced.
          </p>
        </div>
      </div>
    </section>
  )
}
