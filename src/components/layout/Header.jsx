import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="px-6 py-6 max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-3 group">
        <img
          src="/assets/Colour logo no words.png"
          alt="MX Muse"
          className="h-10 w-auto"
        />
        <div>
          <span className="text-xl font-semibold tracking-tight text-near-black font-heading">
            MX Muse
          </span>
          <p className="text-xs text-mid-gray mt-0.5">
            A{' '}
            <a
              href="https://thatsclevermx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-near-black transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              CleverMX
            </a>{' '}
            company.
          </p>
        </div>
      </Link>
    </header>
  )
}
