export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-mid-gray">
          Question {current} of {total}
        </span>
        <span className="text-sm text-mid-gray tabular-nums">
          {percent}%
        </span>
      </div>
      <div className="h-1.5 bg-warm-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-muse-teal rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
