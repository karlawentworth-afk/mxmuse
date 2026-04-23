import { useState, useEffect } from 'react';

const STEPS = 7;

export default function DossierPanel({ archetype, reduceMotion }) {
  const [step, setStep] = useState(-1);
  const [ruleWidth, setRuleWidth] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(STEPS);
      setRuleWidth(100);
      return;
    }

    setStep(-1);
    setRuleWidth(0);

    const t0 = setTimeout(() => {
      setRuleWidth(100);
      setStep(0);
    }, 50);
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 650);
    const t3 = setTimeout(() => setStep(3), 800);
    const t4 = setTimeout(() => setStep(4), 1000);
    const t5 = setTimeout(() => setStep(5), 1200);
    const t6 = setTimeout(() => setStep(6), 1400);
    const t7 = setTimeout(() => setStep(7), 1600);

    return () => {
      [t0, t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    };
  }, [archetype.key, reduceMotion]);

  const show = (s) => reduceMotion || step >= s;
  const fadeStyle = (s) =>
    reduceMotion
      ? {}
      : {
          opacity: step >= s ? 1 : 0,
          transform: step >= s ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        };

  return (
    <div className="bg-off-white">
      <div className="max-w-3xl mx-auto px-8 md:px-16 py-16 md:py-24">
        {/* Top rule - 2px, archetype colour */}
        <div
          className="h-[2px] ease-out"
          style={{
            backgroundColor: archetype.hex,
            width: reduceMotion ? '100%' : `${ruleWidth}%`,
            transition: 'width 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* File label - small, quiet, positioned above the name */}
        <div style={fadeStyle(1)} className="mt-8">
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: archetype.hex }}
          >
            {archetype.fileLabel}
          </span>
        </div>

        {/* Archetype name - the focal point */}
        <div style={fadeStyle(2)} className="mt-3">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold"
            style={{
              color: archetype.hex,
              lineHeight: 1.05,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {archetype.name}
          </h2>
        </div>

        {/* Tagline - editorial italic, subordinate to name */}
        <div style={fadeStyle(3)} className="mt-4 mb-16">
          <p
            className="text-xl md:text-2xl font-heading italic text-near-black/50"
            style={{
              lineHeight: 1.3,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            {archetype.tagline}
          </p>
        </div>

        {/* Content column - constrained for readability */}
        <div className="max-w-[680px]">
          {archetype.sections.map((section, i) => (
            <div key={i} style={fadeStyle(4 + i)}>
              {i > 0 && <div className="border-t border-warm-gray/50 mt-12 mb-12" />}
              <p
                className="text-[11px] font-medium tracking-[0.15em] uppercase mb-4"
                style={{ color: archetype.hex }}
              >
                {section.label}
              </p>
              {section.type === 'checklist' ? (
                <div className="space-y-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-baseline gap-3">
                      <span
                        className="text-[15px] shrink-0 relative top-[1px]"
                        style={{ color: item.checked ? archetype.hex : '#C8C5BE' }}
                      >
                        {item.checked ? '\u2713' : '\u2610'}
                      </span>
                      <span className={`text-[16px] font-body ${
                        item.checked
                          ? 'text-near-black/45 line-through decoration-warm-gray'
                          : 'text-near-black font-medium'
                      }`}
                        style={{ lineHeight: 1.55 }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="text-[16px] text-near-black/85"
                  style={{ lineHeight: 1.55 }}
                >
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
