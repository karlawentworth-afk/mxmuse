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
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(() => setStep(3), 800);
    const t4 = setTimeout(() => setStep(4), 1000);
    const t5 = setTimeout(() => setStep(5), 1200);
    const t6 = setTimeout(() => setStep(6), 1400);
    const t7 = setTimeout(() => setStep(7), 1600);

    return () => {
      [t0, t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    };
  }, [archetype.key, reduceMotion]);

  const fadeStyle = (s) =>
    reduceMotion
      ? {}
      : {
          opacity: step >= s ? 1 : 0,
          transform: step >= s ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        };

  return (
    <div className="max-w-4xl mx-auto px-6 mt-0">
      <div className="bg-card-white rounded-b-2xl px-8 md:px-14 lg:px-16 py-12 md:py-16">
        {/* Top rule - 2px, archetype colour */}
        <div
          className="h-[2px] rounded-full"
          style={{
            backgroundColor: archetype.hex,
            width: reduceMotion ? '100%' : `${ruleWidth}%`,
            transition: 'width 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Archetype name */}
        <div style={fadeStyle(1)} className="mt-8">
          <h3
            className="text-[3rem] md:text-[3.5rem] font-bold text-navy"
            style={{ lineHeight: 1.1 }}
          >
            {archetype.name}
          </h3>
        </div>

        {/* Tagline */}
        <div style={fadeStyle(2)} className="mt-3 mb-12">
          <p className="text-xl md:text-2xl font-light italic text-mid-gray leading-snug">
            {archetype.tagline}
          </p>
        </div>

        {/* Content - constrained width */}
        <div className="max-w-[680px]">
          {archetype.sections.map((section, i) => (
            <div key={i} style={fadeStyle(3 + i)}>
              {i > 0 && <div className="border-t border-warm-gray/60 mt-10 mb-10" />}
              <p
                className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-4"
                style={{ color: archetype.hex }}
              >
                {section.label}
              </p>
              {section.type === 'checklist' ? (
                <div className="space-y-2.5">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-baseline gap-3">
                      <span
                        className="text-sm shrink-0"
                        style={{ color: item.checked ? archetype.hex : '#c8c5be' }}
                      >
                        {item.checked ? '\u2713' : '\u2610'}
                      </span>
                      <span
                        className={`text-[15px] ${
                          item.checked
                            ? 'text-mid-gray line-through decoration-warm-gray'
                            : 'text-navy font-semibold'
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
                  className="text-[15px] text-navy/80 font-light"
                  style={{ lineHeight: 1.6 }}
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
