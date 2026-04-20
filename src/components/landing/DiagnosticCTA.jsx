import { Link } from 'react-router-dom'

export default function DiagnosticCTA() {
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-semibold text-near-black leading-tight">
          Now find out which one is really you.
        </h2>

        <div className="mt-16 md:mt-24">
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
        </div>
      </div>
    </section>
  )
}
