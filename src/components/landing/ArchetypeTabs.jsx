import { useState, useEffect } from 'react';
import DossierPanel from './DossierPanel';

const ARCHETYPES = [
  {
    key: 'storyteller',
    name: 'Storyteller',
    hex: '#c87d5e',
    tagline: 'The one who joined marketing for the craft.',
    sections: [
      {
        label: 'Observed',
        type: 'prose',
        text: "You got into marketing because you loved the creative. The thrill of a campaign coming together. The line that writes itself once you've found the angle. The brief that had you pacing the room until it clicked. That's why you're here. You're a maker.",
      },
      {
        label: 'Recorded',
        type: 'checklist',
        items: [
          { text: 'Fix broken automation (again)', checked: true },
          { text: 'Pull weekly report', checked: true },
          { text: 'Sit through vendor demo', checked: true },
          { text: 'Update the CMS', checked: true },
          { text: 'Chase agency for deliverables', checked: true },
          { text: 'Approve merge tags for campaign', checked: true },
          { text: 'Creative work', checked: false },
        ],
      },
      {
        label: 'Underlying',
        type: 'prose',
        text: "You can't stop doing the operational stuff, because if you do, the whole machine breaks and everyone blames you. But every hour you spend on it is an hour you don't spend making the work you were hired for. So you keep the machine running, your craft keeps atrophying, and by the time anyone notices the campaigns have gone flat, you've forgotten how to do your own job. The ideas don't stop arriving. There are three of them circling right now. You'll forget them by Friday, because you never had an hour to sit with them.",
      },
      {
        label: 'Protocol',
        type: 'prose',
        text: "MX Muse won't teach you your craft. You already have it. What it will do is give you the language to explain why the shape of your role is quietly destroying the work you were hired to do. And a map for getting some of that shape back.",
      },
    ],
  },
  {
    key: 'strategist',
    name: 'Strategist',
    hex: '#3d5066',
    tagline: 'The one who sees the whole board.',
    sections: [
      {
        label: 'Observed',
        type: 'prose',
        text: "You joined marketing because you could see how the pieces connected. The campaign that compounds. The positioning that changes how people think about you versus them. You think in systems, not tasks. You were never here to execute a brief. You were here to write the strategy the brief comes from.",
      },
      {
        label: 'Recorded',
        type: 'checklist',
        items: [
          { text: 'Respond to urgent sales request', checked: true },
          { text: 'Rewrite deck for third stakeholder review', checked: true },
          { text: 'Join cross-functional alignment call', checked: true },
          { text: 'Rework Q3 plan (again, after budget change)', checked: true },
          { text: 'Provide competitive context for exec meeting', checked: true },
          { text: 'Debrief with product on launch pivot', checked: true },
          { text: 'Actual strategic thinking', checked: false },
        ],
      },
      {
        label: 'Underlying',
        type: 'prose',
        text: "You spend most of your time justifying the strategy rather than executing it. The plans you built are good. The sequencing is sound. But the organisation keeps pulling you into reactive mode, and by the time you've dealt with everyone else's emergencies, there's no time left for the work that actually moves the business forward. You're a strategist who never gets to be strategic.",
      },
      {
        label: 'Protocol',
        type: 'prose',
        text: "MX Muse won't give you more hours. What it will do is show you, and the people who set your priorities, exactly where the gap is between what you're built for and what you're spending your time on. That's the conversation that changes things.",
      },
    ],
  },
  {
    key: 'scientist',
    name: 'Scientist',
    hex: '#7a6a9e',
    tagline: 'The one who trusts the numbers over the noise.',
    sections: [
      {
        label: 'Observed',
        type: 'prose',
        text: "You got into marketing because you could find the signal. The test that proved the hypothesis. The dashboard that told the real story. The insight that changed how the team spent its budget. Evidence over opinion. That's what drew you in. You're an analyst, a tester, a person who believes in proof.",
      },
      {
        label: 'Recorded',
        type: 'checklist',
        items: [
          { text: 'Rebuild broken dashboard', checked: true },
          { text: 'Pull ad hoc report for leadership', checked: true },
          { text: 'Reconcile conflicting data sources', checked: true },
          { text: 'Attend campaign review (no data discussed)', checked: true },
          { text: 'Fix tracking tags from last sprint', checked: true },
          { text: 'Document metrics definitions (again)', checked: true },
          { text: 'Run the experiment you designed three weeks ago', checked: false },
        ],
      },
      {
        label: 'Underlying',
        type: 'prose',
        text: "The insight is sitting in a slide deck that nobody opened. You found it, you validated it, you wrote it up clearly. Meanwhile, someone made a six-figure campaign decision based on a hunch and a competitor screenshot. You're not angry, exactly. You're tired of caring more about the answer than the people asking the question. So you've started keeping the good insights to yourself, because sharing them just leads to being ignored politely.",
      },
      {
        label: 'Protocol',
        type: 'prose',
        text: "MX Muse won't make people care about data. But it will show you why you keep ending up in roles that treat analysis as a service function instead of a strategic one. And what a role that actually fits your talent looks like.",
      },
    ],
  },
  {
    key: 'builder',
    name: 'Builder',
    hex: '#6ba89d',
    tagline: 'The one who makes the whole thing actually work.',
    sections: [
      {
        label: 'Observed',
        type: 'prose',
        text: "You got into marketing because you liked making things run. The system that handles scale. The process that stops things falling through cracks. The launch that lands on time because you wired together the twelve things nobody else noticed needed wiring. You're the infrastructure. You're the reason it ships.",
      },
      {
        label: 'Recorded',
        type: 'checklist',
        items: [
          { text: 'Fix automation that broke overnight', checked: true },
          { text: 'Troubleshoot CMS formatting issue on mobile', checked: true },
          { text: 'Unblock designer waiting on asset specs', checked: true },
          { text: "Migrate landing page before tomorrow's launch", checked: true },
          { text: 'Re-scope sprint after scope change from product', checked: true },
          { text: 'Update stakeholder on revised timeline', checked: true },
          { text: 'Start the new project everyone keeps asking about', checked: false },
        ],
      },
      {
        label: 'Underlying',
        type: 'prose',
        text: "Nobody notices when it works. Everyone notices when it doesn't. You get escalations instead of recognition. The new project would take a week if the old systems worked properly, but they don't, and fixing them is invisible work that nobody tracks or thanks you for. Over time you've become the team's permanent firefighter. Reactive, essential, and slowly burning out in a way that looks fine from the outside.",
      },
      {
        label: 'Protocol',
        type: 'prose',
        text: "MX Muse won't lighten your load. But it will make visible the gap between what you're built for and what the role is doing to you. That gap is the thing your manager can't see. Once they can, the conversation changes.",
      },
    ],
  },
];

export default function ArchetypeTabs() {
  const [active, setActive] = useState('storyteller');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const archetype = ARCHETYPES.find(a => a.key === active);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-10">
          Which one sounds like yours?
        </h2>

        {/* Tab bar */}
        <div className="flex rounded-xl overflow-hidden" role="tablist">
          {ARCHETYPES.map((a) => {
            const isActive = active === a.key;
            return (
              <button
                key={a.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(a.key)}
                className={`flex-1 py-4 text-[13px] font-semibold tracking-[0.06em] uppercase ${
                  isActive ? 'text-white' : 'text-mid-gray hover:text-navy bg-card-white'
                }`}
                style={{
                  backgroundColor: isActive ? a.hex : undefined,
                  transition: 'background-color 200ms ease, color 200ms ease',
                }}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Archetype panel */}
      <DossierPanel
        key={active}
        archetype={archetype}
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
