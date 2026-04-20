import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-off-white">
      <header className="px-6 py-6 flex items-start justify-between max-w-5xl mx-auto">
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
              className="underline hover:text-near-black"
            >
              CleverMX
            </a>{' '}
            company.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold leading-tight text-near-black">
          It's 2pm. You haven't done any actual marketing yet.
        </h1>
        <p className="mt-8 text-lg text-mid-gray leading-relaxed max-w-2xl mx-auto">
          30 questions. 10 minutes. No sign-up. Find out what kind of marketer you're built to be.
        </p>
        <Link
          to="/assessment"
          className="mt-12 inline-block px-8 py-4 bg-muse-teal text-white font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
        >
          Take the assessment →
        </Link>
      </main>

      <footer className="border-t border-warm-gray mt-24 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mid-gray">
          <p>
            MX Muse is a{' '}
            <a
              href="https://thatsclevermx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-near-black"
            >
              CleverMX
            </a>{' '}
            company.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-near-black">About</Link>
            <a href="mailto:karla@mxmuse.com" className="hover:text-near-black">Contact</a>
            <Link to="/privacy" className="hover:text-near-black">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
