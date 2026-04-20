import { useState } from 'react'

const ARCHETYPES = [
  {
    key: 'storyteller',
    name: 'Storyteller',
    hex: '#C4553A',
    hexLight: '#C4553A0A',
    hexMedium: '#C4553A18',
    strapline: "It's 2pm and you haven't created a single thing today.",
    howFeels:
      "You opened your laptop this morning ready to write. Eight hours later you've approved a template, updated a spreadsheet, and sat through two calls about 'brand consistency' that had nothing to do with actual storytelling. The words are still inside you. They just never made it to the page.",
    whatTheyDo:
      "Storytellers are the voice. They build narrative, shape brand language, write the campaigns that make people feel something. They think in stories, metaphors, and emotional arcs. When they're in flow, they produce work that moves markets.",
    whatTheySay:
      '"Can we just make something today? Anything? I haven\'t written a single original sentence in two weeks and I\'m starting to forget what that feels like."',
    whyMatters:
      "When a Storyteller stops creating, the brand loses its voice. Not immediately. There's enough legacy content to coast on for a while. But slowly the messaging becomes generic, the campaigns become safe, and the brand starts sounding like everyone else.",
    hiddenCost:
      "Storytellers who can't tell stories don't just underperform. They disengage. They start treating work as administrative rather than creative. The irony is that most of them were hired specifically for their creative talent, and the role has slowly edited that talent out of the job description.",
  },
  {
    key: 'strategist',
    name: 'Strategist',
    hex: '#2C3E6B',
    hexLight: '#2C3E6B0A',
    hexMedium: '#2C3E6B18',
    strapline: 'Another day, another reactive firefight.',
    howFeels:
      "You had a plan for this quarter. It was good. Clear objectives, sensible sequencing, measurable outcomes. That was six weeks ago. Since then you've pivoted twice, absorbed two 'urgent' requests from sales, and spent most of your time justifying the strategy rather than executing it.",
    whatTheyDo:
      'Strategists see the system. They connect market signals to business objectives, sequence activity for compounding effect, and build the logic that holds campaigns together. They think in frameworks, dependencies, and long-term positioning.',
    whatTheySay:
      '"I\'d love to be strategic but I spend 80% of my time being reactive. By the time I\'ve dealt with everyone else\'s emergencies there\'s no time left to think about what we should actually be doing."',
    whyMatters:
      "Without strategic thinking, marketing becomes a collection of unconnected activities. Each one might be competently executed, but they don't compound. The team stays busy without building anything durable. Strategists are the ones who turn activity into momentum.",
    hiddenCost:
      "Strategists trapped in reactive roles develop a specific kind of frustration: they can see exactly what needs to happen but can't get to it. Over time, they stop raising strategic concerns because they've learned nobody has time to listen. The organisation loses its strategic voice without realising it's gone.",
  },
  {
    key: 'scientist',
    name: 'Scientist',
    hex: '#7B4DAA',
    hexLight: '#7B4DAA0A',
    hexMedium: '#7B4DAA18',
    strapline: 'Decisions getting made without a shred of data.',
    howFeels:
      "You built the dashboard. You ran the analysis. You found the insight that should change how the team allocates budget next quarter. It's sitting in a slide deck that nobody's opened. Meanwhile, someone just made a six-figure campaign decision based on a hunch and a competitor screenshot.",
    whatTheyDo:
      'Scientists find the truth in the numbers. They design tests, interpret results, spot patterns that others miss, and turn data into decisions. They think in hypotheses, confidence intervals, and evidence-based iteration.',
    whatTheySay:
      '"We have the data. We literally have the answer sitting in the dashboard. But nobody looks at it before making decisions and I don\'t know how to make them care."',
    whyMatters:
      "Marketing without measurement isn't marketing. It's guessing with a budget. Scientists are the ones who close the loop between spending and outcomes. When they're sidelined, the team keeps repeating what doesn't work because nobody's tracking what does.",
    hiddenCost:
      "Scientists who feel ignored don't leave loudly. They leave quietly. They stop volunteering insights, stop pushing for rigour, and eventually stop caring whether the numbers get looked at. By the time leadership notices the team is flying blind, the person who could have fixed it has mentally checked out.",
  },
  {
    key: 'builder',
    name: 'Builder',
    hex: '#2A9D8F',
    hexLight: '#2A9D8F0A',
    hexMedium: '#2A9D8F18',
    strapline: 'Everyone wants the thing shipped. No one wants to build it.',
    howFeels:
      "The automation broke again. The CMS update created a formatting issue on mobile. Someone needs the landing page changed before tomorrow's launch. You fix all of it. Quickly, competently, invisibly. Nobody notices when it works. Everyone notices when it doesn't.",
    whatTheyDo:
      'Builders make things work. They create systems, optimise processes, implement technology, and build the infrastructure that marketing runs on. They think in workflows, integrations, and scalable solutions.',
    whatTheySay:
      '"I spend my whole day keeping the lights on and then people ask me why I haven\'t started the new project yet. The new project would take a week if the old systems worked properly. They don\'t. That\'s what I\'m doing."',
    whyMatters:
      "Modern marketing runs on technology. Without Builders maintaining and improving that technology, everything else stalls. The Storyteller can't publish, the Strategist can't execute, and the Scientist can't measure. Builders are the foundation the rest of the team stands on.",
    hiddenCost:
      "Builders are the most likely to burn out invisibly. Their work is only visible when it fails, which means they get escalations instead of recognition. Over time they become the team's firefighter. Permanently reactive, never building forward, increasingly resentful that nobody understands what they actually do.",
  },
]

export default function ArchetypeTabs() {
  const [active, setActive] = useState('storyteller')
  const archetype = ARCHETYPES.find((a) => a.key === active)
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-16 md:py-24">
      {/* Tab bar */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex" role="tablist">
          {ARCHETYPES.map((a) => {
            const isActive = active === a.key;
            return (
              <button
                key={a.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(a.key)
                  setExpanded(false)
                }}
                className={`flex-1 py-4 md:py-5 text-sm md:text-base font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-mid-gray hover:text-near-black bg-off-white'
                }`}
                style={isActive ? {
                  backgroundColor: a.hex,
                  color: 'white'
                } : undefined}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel with full colour wash */}
      <div
        className="transition-colors duration-500"
        style={{ backgroundColor: archetype.hexMedium }}
        role="tabpanel"
        aria-label={archetype.name}
      >
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          {/* Archetype name as large editorial headline */}
          <h2
            className="text-4xl md:text-6xl font-heading font-semibold leading-none"
            style={{ color: archetype.hex }}
          >
            {archetype.name}
          </h2>

          <p className="text-lg md:text-xl font-medium text-near-black mt-3 mb-12 md:mb-16">
            {archetype.strapline}
          </p>

          {/* Divider in archetype colour */}
          <div className="h-0.5 w-16 mb-10" style={{ backgroundColor: archetype.hex }} />

          {/* HOW THAT DAY FEELS */}
          <div
            className="rounded-lg p-6 md:p-8 mb-10"
            style={{ backgroundColor: `${archetype.hex}10` }}
          >
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: archetype.hex }}
            >
              How that day feels
            </p>
            <p className="text-near-black leading-relaxed text-lg italic">
              {archetype.howFeels}
            </p>
          </div>

          {/* WHAT THEY ACTUALLY DO */}
          <div className="mb-10">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: archetype.hex }}
            >
              What they actually do
            </p>
            <p className="text-near-black leading-relaxed text-lg">
              {archetype.whatTheyDo}
            </p>
          </div>

          {/* Divider */}
          <div className="h-0.5 w-16 mb-10" style={{ backgroundColor: archetype.hex, opacity: 0.3 }} />

          {/* WHAT THEY SAY TO COLLEAGUES */}
          <div
            className="rounded-lg p-6 md:p-8 mb-10"
            style={{ backgroundColor: `${archetype.hex}10` }}
          >
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: archetype.hex }}
            >
              What they say to colleagues
            </p>
            <p className="text-near-black leading-relaxed text-lg italic">
              {archetype.whatTheySay}
            </p>
          </div>

          {/* WHY THIS MATTERS */}
          <div className="mb-10">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: archetype.hex }}
            >
              Why this matters
            </p>
            <p className="text-near-black leading-relaxed text-lg">
              {archetype.whyMatters}
            </p>
          </div>

          {/* THE HIDDEN COST */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: `${archetype.hex}10` }}
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full text-left p-6 md:p-8 transition-colors"
              aria-expanded={expanded}
            >
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: archetype.hex }}
              >
                The hidden cost no one talks about
              </span>
              <span
                className="text-xl font-light transition-transform duration-200"
                style={{ color: archetype.hex, transform: expanded ? 'rotate(45deg)' : 'none' }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {expanded && (
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-near-black leading-relaxed text-lg">
                  {archetype.hiddenCost}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
