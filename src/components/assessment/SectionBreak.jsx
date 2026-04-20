export default function SectionBreak({ text, onContinue }) {
  const paragraphs = text.split('\n\n');

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-near-black leading-relaxed text-lg">
            {p}
          </p>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="mt-10 px-8 py-3 bg-muse-teal text-white font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
