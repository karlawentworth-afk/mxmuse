import { Link } from 'react-router-dom'

export default function RepeatCTA() {
  return (
    <section className="py-28 md:py-40 text-center px-6">
      <Link
        to="/assessment"
        className="group inline-flex items-center justify-center gap-3 w-full max-w-lg px-14 py-7 bg-muse-teal text-off-white text-xl md:text-2xl font-heading font-semibold rounded-xl hover:bg-muse-teal-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
      >
        Find out which one you are
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </Link>
      <p className="mt-5 text-sm text-mid-gray">
        30 questions. 10 minutes. No sign-up required.
      </p>
    </section>
  )
}
