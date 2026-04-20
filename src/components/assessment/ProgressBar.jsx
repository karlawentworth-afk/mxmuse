export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-4">
      <span className="text-3xl md:text-4xl font-heading font-bold text-near-black tabular-nums leading-none">
        {current}
      </span>
      <div className="flex-1">
        <div className="h-1 bg-warm-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-muse-teal rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <span className="text-sm text-mid-gray tabular-nums">
        of {total}
      </span>
    </div>
  );
}
