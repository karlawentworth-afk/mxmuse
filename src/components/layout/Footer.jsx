import { Link } from 'react-router-dom'
import BookOptIn from '../shared/BookOptIn'

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray mt-24 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <p className="text-sm text-mid-gray">
          MX Muse is a{' '}
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

        <BookOptIn source="landing" />

        <div className="flex gap-6 text-sm text-mid-gray md:justify-end">
          <Link to="/about" className="hover:text-near-black transition-colors">About</Link>
          <a href="mailto:karla@mxmuse.com" className="hover:text-near-black transition-colors">Contact</a>
          <Link to="/privacy" className="hover:text-near-black transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
