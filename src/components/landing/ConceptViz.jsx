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
      <p className="text-sm font-semibold text-mid-gray uppercase tracking-widest mb-4">
        {label}
      </p>
      <div className="space-y-3">
        {ARCHETYPES.map((a, i) => (
          <div key={a.key}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-near-black">{a.key}</span>
              <span className="text-mid-gray tabular-nums">{values[i]}%</span>
            </div>
            <div className="h-3 bg-warm-gray rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
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
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white border border-warm-gray rounded-xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <BarGroup label="Natural talent" values={TALENT} />

          {/* Gap indicator */}
          <div className="hidden md:flex flex-col items-center justify-center gap-2">
            <div className="w-px h-8 bg-warm-gray" />
            <div className="bg-near-black text-white text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
              MX Gap: 7/10
            </div>
            <div className="w-px h-8 bg-warm-gray" />
          </div>
          {/* Mobile gap indicator */}
          <div className="flex md:hidden items-center justify-center gap-3 py-2">
            <div className="h-px flex-1 bg-warm-gray" />
            <div className="bg-near-black text-white text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
              MX Gap: 7/10
            </div>
            <div className="h-px flex-1 bg-warm-gray" />
          </div>

          <BarGroup label="Role demands" values={ROLE} />
        </div>

        <p className="mt-8 text-center text-mid-gray text-sm leading-relaxed max-w-lg mx-auto">
          This person's role demands the opposite of what they're built for.
          They're not failing — they're displaced.
        </p>
      </div>
    </section>
  )
}
