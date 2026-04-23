import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="px-6 py-6 max-w-5xl mx-auto flex items-center justify-between">
      <Link to="/" className="inline-flex items-center gap-3 group">
        <img
          src="/assets/Colour logo no words.png"
          alt="MX Muse"
          className="h-9 w-auto"
        />
        <div>
          <span className="text-lg font-bold tracking-tight text-navy">
            MX Muse
          </span>
          <p className="text-[11px] text-mid-gray leading-tight">
            A{' '}
            <a
              href="https://thatsclevermx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-navy transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              CleverMX
            </a>{' '}
            company
          </p>
        </div>
      </Link>
      <Link
        to="/about"
        className="text-sm text-mid-gray hover:text-navy transition-colors"
      >
        About
      </Link>
    </header>
  )
}
