// Section break colours keyed by question number
const BREAK_COLOURS = {
  '6':  { bg: '#C4553A', label: 'Energy and instinct' },
  '12': { bg: '#2C3E6B', label: 'Your instincts' },
  '18': { bg: '#7B4DAA', label: 'Who you really are' },
  '24': { bg: '#2A9D8F', label: 'Your actual role' },
};

export default function SectionBreak({ text, onContinue, questionNumber }) {
  const paragraphs = text.split('\n\n');
  const config = BREAK_COLOURS[String(questionNumber)] || { bg: '#0D7377', label: '' };

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
          className="mt-12 px-10 py-4 bg-white text-near-black font-medium rounded-lg hover:bg-white/90 transition-colors text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
