import { Link } from 'react-router-dom'
import BookOptIn from '../shared/BookOptIn'

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray/60 mt-16 py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <p className="text-sm text-mid-gray">
          MX Muse is a{' '}
          <a
            href="https://thatsclevermx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy transition-colors"
          >
            CleverMX
          </a>{' '}
          company.
        </p>

        <BookOptIn source="landing" />

        <div className="flex gap-6 text-sm text-mid-gray md:justify-end">
          <Link to="/about" className="hover:text-navy transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
