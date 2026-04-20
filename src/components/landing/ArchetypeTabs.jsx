import { useState, useEffect } from 'react';
import DiaryPanel from './DiaryPanel';

const ARCHETYPES = [
  {
    key: 'storyteller',
    name: 'Storyteller',
    hex: '#C4553A',
    segments: [
      { type: 'tagline', text: 'The one who joined marketing for the craft.' },
      { type: 'prose', text: "You got into marketing because you loved the creative. The thrill of a campaign coming together. The line that writes itself once you've found the angle. The brief that had you pacing the room until it clicked. That's why you're here. You're a maker." },
      { type: 'todo-header', text: "Today's list:" },
      { type: 'todo', text: 'Fix broken automation (again)', checked: true },
      { type: 'todo', text: 'Pull weekly report', checked: true },
      { type: 'todo', text: 'Sit through vendor demo', checked: true },
      { type: 'todo', text: 'Update the CMS', checked: true },
      { type: 'todo', text: 'Chase agency for deliverables', checked: true },
      { type: 'todo', text: 'Approve merge tags for campaign', checked: true },
      { type: 'todo', text: 'Creative work', checked: false },
      { type: 'prose', text: "You can't stop doing the operational stuff, because if you do, the whole machine breaks and everyone blames you. But every hour you spend on it is an hour you don't spend making the work you were hired for. So you keep the machine running, your craft keeps atrophying, and by the time anyone notices the campaigns have gone flat, you've forgotten how to do your own job. The ideas don't stop arriving. There are three of them circling right now. You'll forget them by Friday, because you never had an hour to sit with them." },
      { type: 'promise', text: "MX Muse won't teach you your craft. You already have it. What it will do is give you the language to explain why the shape of your role is quietly destroying the work you were hired to do. And a map for getting some of that shape back." },
    ],
  },
  {
    key: 'strategist',
    name: 'Strategist',
    hex: '#2C3E6B',
    segments: [
      { type: 'tagline', text: 'The one who sees the whole board.' },
      { type: 'prose', text: "You joined marketing because you could see how the pieces connected. The campaign that compounds. The positioning that changes how people think about you versus them. You think in systems, not tasks. You were never here to execute a brief. You were here to write the strategy the brief comes from." },
      { type: 'todo-header', text: "Today's list:" },
      { type: 'todo', text: 'Respond to urgent sales request', checked: true },
      { type: 'todo', text: 'Rewrite deck for third stakeholder review', checked: true },
      { type: 'todo', text: 'Join cross-functional alignment call', checked: true },
      { type: 'todo', text: 'Rework Q3 plan (again, after budget change)', checked: true },
      { type: 'todo', text: 'Provide competitive context for exec meeting', checked: true },
      { type: 'todo', text: 'Debrief with product on launch pivot', checked: true },
      { type: 'todo', text: 'Actual strategic thinking', checked: false },
      { type: 'prose', text: "You spend most of your time justifying the strategy rather than executing it. The plans you built are good. The sequencing is sound. But the organisation keeps pulling you into reactive mode, and by the time you've dealt with everyone else's emergencies, there's no time left for the work that actually moves the business forward. You're a strategist who never gets to be strategic." },
      { type: 'promise', text: "MX Muse won't give you more hours. What it will do is show you, and the people who set your priorities, exactly where the gap is between what you're built for and what you're spending your time on. That's the conversation that changes things." },
    ],
  },
  {
    key: 'scientist',
    name: 'Scientist',
    hex: '#7B4DAA',
    segments: [
      { type: 'tagline', text: 'The one who trusts the numbers over the noise.' },
      { type: 'prose', text: "You got into marketing because you could find the signal. The test that proved the hypothesis. The dashboard that told the real story. The insight that changed how the team spent its budget. Evidence over opinion. That's what drew you in. You're an analyst, a tester, a person who believes in proof." },
      { type: 'todo-header', text: "Today's list:" },
      { type: 'todo', text: 'Rebuild broken dashboard', checked: true },
      { type: 'todo', text: 'Pull ad hoc report for leadership', checked: true },
      { type: 'todo', text: 'Reconcile conflicting data sources', checked: true },
      { type: 'todo', text: 'Attend campaign review (no data discussed)', checked: true },
      { type: 'todo', text: 'Fix tracking tags from last sprint', checked: true },
      { type: 'todo', text: 'Document metrics definitions (again)', checked: true },
      { type: 'todo', text: 'Run the experiment you designed three weeks ago', checked: false },
      { type: 'prose', text: "The insight is sitting in a slide deck that nobody opened. You found it, you validated it, you wrote it up clearly. Meanwhile, someone made a six-figure campaign decision based on a hunch and a competitor screenshot. You're not angry, exactly. You're tired of caring more about the answer than the people asking the question. So you've started keeping the good insights to yourself, because sharing them just leads to being ignored politely." },
      { type: 'promise', text: "MX Muse won't make people care about data. But it will show you why you keep ending up in roles that treat analysis as a service function instead of a strategic one. And what a role that actually fits your talent looks like." },
    ],
  },
  {
    key: 'builder',
    name: 'Builder',
    hex: '#2A9D8F',
    segments: [
      { type: 'tagline', text: 'The one who makes the whole thing actually work.' },
      { type: 'prose', text: "You got into marketing because you liked making things run. The system that handles scale. The process that stops things falling through cracks. The launch that lands on time because you wired together the twelve things nobody else noticed needed wiring. You're the infrastructure. You're the reason it ships." },
      { type: 'todo-header', text: "Today's list:" },
      { type: 'todo', text: 'Fix automation that broke overnight', checked: true },
      { type: 'todo', text: 'Troubleshoot CMS formatting issue on mobile', checked: true },
      { type: 'todo', text: 'Unblock designer waiting on asset specs', checked: true },
      { type: 'todo', text: 'Migrate landing page before tomorrow\'s launch', checked: true },
      { type: 'todo', text: 'Re-scope sprint after scope change from product', checked: true },
      { type: 'todo', text: 'Update stakeholder on revised timeline', checked: true },
      { type: 'todo', text: 'Start the new project everyone keeps asking about', checked: false },
      { type: 'prose', text: "Nobody notices when it works. Everyone notices when it doesn't. You get escalations instead of recognition. The new project would take a week if the old systems worked properly, but they don't, and fixing them is invisible work that nobody tracks or thanks you for. Over time you've become the team's permanent firefighter. Reactive, essential, and slowly burning out in a way that looks fine from the outside." },
      { type: 'promise', text: "MX Muse won't lighten your load. But it will make visible the gap between what you're built for and what the role is doing to you. That gap is the thing your manager can't see. Once they can, the conversation changes." },
    ],
  },
];

export default function ArchetypeTabs() {
  const [active, setActive] = useState('storyteller');
  const [seen, setSeen] = useState({});
  const [reduceMotion, setReduceMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track which panels have completed their typing animation
  function markSeen(key) {
    setSeen(prev => ({ ...prev, [key]: true }));
  }

  const archetype = ARCHETYPES.find(a => a.key === active);

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
                onClick={() => setActive(a.key)}
                className={`flex-1 py-4 md:py-5 text-sm md:text-base font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-mid-gray hover:text-near-black bg-off-white'
                }`}
                style={isActive ? { backgroundColor: a.hex } : undefined}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Diary panel */}
      <div className="max-w-4xl mx-auto px-6 mt-0">
        <DiaryPanel
          key={active}
          archetype={archetype}
          isActive={true}
          hasBeenSeen={!!seen[active]}
          reduceMotion={reduceMotion}
          onComplete={() => markSeen(active)}
        />
      </div>
    </section>
  );
}
