export default function Header() {
  return (
    <header className="px-6 py-6 max-w-5xl mx-auto">
      <div>
        <span className="text-xl font-semibold tracking-tight text-muse-teal font-heading">
          MX Muse
        </span>
        <p className="text-xs text-mid-gray mt-0.5">
          A{' '}
          <a
            href="https://thatsclevermx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-near-black transition-colors"
          >
            CleverMX
          </a>{' '}
          company.
        </p>
      </div>
    </header>
  )
}
