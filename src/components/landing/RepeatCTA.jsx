import { Link } from 'react-router-dom'

export default function RepeatCTA() {
  return (
    <section className="py-20 md:py-28 text-center px-6">
      <Link
        to="/assessment"
        className="inline-flex items-center justify-center px-10 py-5 bg-muse-teal text-white text-lg font-bold rounded-xl hover:bg-muse-teal-dark transition-colors duration-200"
      >
        Take the assessment
      </Link>
      <p className="mt-4 text-sm text-mid-gray">
        30 questions. 10 minutes. No sign-up required.
      </p>
    </section>
  )
}
