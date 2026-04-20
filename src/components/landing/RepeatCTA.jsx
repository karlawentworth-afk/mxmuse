import { Link } from 'react-router-dom'

export default function RepeatCTA() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <Link
        to="/assessment"
        className="inline-block px-8 py-4 bg-muse-teal text-white text-lg font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
      >
        Take the assessment →
      </Link>
    </section>
  )
}
