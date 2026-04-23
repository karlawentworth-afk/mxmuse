const ARCHETYPES = [
  { key: 'Storyteller', color: '#c87d5e' },
  { key: 'Strategist', color: '#3d5066' },
  { key: 'Scientist', color: '#7a6a9e' },
  { key: 'Builder', color: '#6ba89d' },
]

const TALENT = [65, 10, 5, 20]
const ROLE = [15, 20, 15, 50]

function BarGroup({ label, values }) {
  return (
    <div className="flex-1">
      <p className="text-[11px] font-bold tracking-[0.15em] text-mid-gray uppercase mb-6">
        {label}
      </p>
      <div className="space-y-4">
        {ARCHETYPES.map((a, i) => (
          <div key={a.key}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-semibold text-navy">{a.key}</span>
              <span className="font-bold tabular-nums text-navy/60">
                {values[i]}%
              </span>
            </div>
            <div className="h-3 bg-off-white rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg"
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
    <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="bg-card-white rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          <BarGroup label="Natural talent" values={TALENT} />

          {/* Gap indicator - desktop */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-6">
            <div className="w-px flex-1 bg-warm-gray" />
            <div className="bg-navy text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold leading-none">7</span>
              <span className="text-[10px] tracking-wider uppercase opacity-70">/10 gap</span>
            </div>
            <div className="w-px flex-1 bg-warm-gray" />
          </div>

          {/* Gap indicator - mobile */}
          <div className="flex lg:hidden items-center justify-center gap-4 py-4">
            <div className="h-px flex-1 bg-warm-gray" />
            <div className="bg-navy text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold leading-none">7</span>
              <span className="text-[10px] tracking-wider uppercase opacity-70">/10 gap</span>
            </div>
            <div className="h-px flex-1 bg-warm-gray" />
          </div>

          <BarGroup label="Role demands" values={ROLE} />
        </div>

        <div className="mt-12 pt-8 border-t border-warm-gray/60 text-center">
          <p className="text-navy text-xl md:text-2xl font-bold max-w-lg mx-auto leading-snug">
            This person's role demands the opposite of what they're built for.
          </p>
          <p className="text-mid-gray mt-2 text-lg font-light">
            They're not failing. They're displaced.
          </p>
        </div>
      </div>
    </section>
  )
}
