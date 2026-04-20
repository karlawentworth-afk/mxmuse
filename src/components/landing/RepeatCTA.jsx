import { Link } from 'react-router-dom'

export default function RepeatCTA() {
  return (
    <section className="py-20 md:py-28 text-center px-6">
      <Link
        to="/assessment"
        className="inline-block px-10 py-5 bg-muse-teal text-white text-lg font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
      >
        Take the assessment
      </Link>
    </section>
  )
}
