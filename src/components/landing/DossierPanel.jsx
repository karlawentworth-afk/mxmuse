import { useState, useEffect } from 'react';

const STEPS = 7; // rule, label, name, tagline, section1, section2, section3, section4 = 8 but we index 0-7

export default function DossierPanel({ archetype, reduceMotion }) {
  const [step, setStep] = useState(-1);
  const [ruleWidth, setRuleWidth] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(STEPS);
      setRuleWidth(100);
      return;
    }

    // Reset on mount (new panel)
    setStep(-1);
    setRuleWidth(0);

    // Step 0: rule draws in
    const t0 = setTimeout(() => {
      setRuleWidth(100);
      setStep(0);
    }, 50);

    // Step 1: label fades up (after rule: 0.3s + 0.15s)
    const t1 = setTimeout(() => setStep(1), 500);
    // Step 2: name
    const t2 = setTimeout(() => setStep(2), 650);
    // Step 3: tagline
    const t3 = setTimeout(() => setStep(3), 800);
    // Step 4-7: four sections, 0.2s apart
    const t4 = setTimeout(() => setStep(4), 1000);
    const t5 = setTimeout(() => setStep(5), 1200);
    const t6 = setTimeout(() => setStep(6), 1400);
    const t7 = setTimeout(() => setStep(7), 1600);

    return () => {
      [t0, t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    };
  }, [archetype.key, reduceMotion]);

  const show = (s) => reduceMotion || step >= s;
  const fadeClass = (s) =>
    reduceMotion
      ? ''
      : `transition-all duration-300 ${step >= s ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

  return (
    <div className="bg-off-white">
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
        {/* Top rule */}
        <div
          className="h-[3px] transition-all duration-300 ease-out"
          style={{
            backgroundColor: archetype.hex,
            width: reduceMotion ? '100%' : `${ruleWidth}%`,
          }}
        />

        {/* File label */}
        <div className={`mt-5 ${fadeClass(1)}`}>
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: archetype.hex }}
          >
            {archetype.fileLabel}
          </span>
        </div>

        {/* Archetype name */}
        <div className={`mt-4 ${fadeClass(2)}`}>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold leading-none"
            style={{ color: archetype.hex }}
          >
            {archetype.name}
          </h2>
        </div>

        {/* Tagline */}
        <div className={`mt-5 mb-10 md:mb-14 ${fadeClass(3)}`}>
          <p className="text-xl md:text-2xl font-heading italic text-near-black/60 leading-snug">
            {archetype.tagline}
          </p>
        </div>

        {/* Four sections */}
        {archetype.sections.map((section, i) => (
          <div key={i} className={fadeClass(4 + i)}>
            {i > 0 && <div className="border-t border-warm-gray/60 my-8 md:my-10" />}
            <p
              className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: archetype.hex }}
            >
              {section.label}
            </p>
            {section.type === 'checklist' ? (
              <div className="space-y-2.5">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <span
                      className="text-lg leading-relaxed shrink-0"
                      style={{ color: item.checked ? archetype.hex : '#B8B5AE' }}
                    >
                      {item.checked ? '☑' : '☐'}
                    </span>
                    <span className={`text-[17px] leading-relaxed ${
                      item.checked ? 'text-near-black/50' : 'text-near-black font-medium'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[17px] leading-[1.65] text-near-black/85">
                {section.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
