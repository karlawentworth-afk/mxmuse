// Section break colours keyed by question number
const BREAK_COLOURS = {
  '6':  { bg: '#c87d5e', label: 'Energy and instinct' },
  '12': { bg: '#3d5066', label: 'Your instincts' },
  '18': { bg: '#7a6a9e', label: 'Who you really are' },
  '24': { bg: '#6ba89d', label: 'Your actual role' },
};

export default function SectionBreak({ text, onContinue, questionNumber }) {
  const paragraphs = text.split('\n\n');
  const config = BREAK_COLOURS[String(questionNumber)] || { bg: '#3d7680', label: '' };

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: config.bg }}
    >
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-white/90 leading-relaxed text-lg md:text-xl">
              {p}
            </p>
          ))}
        </div>
        <button
          onClick={onContinue}
          className="group inline-flex items-center gap-2 mt-12 px-12 py-5 bg-white text-near-black font-heading font-semibold text-lg rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
        >
          Continue
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
