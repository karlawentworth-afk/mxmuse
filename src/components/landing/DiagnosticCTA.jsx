import { Link } from 'react-router-dom'

export default function DiagnosticCTA() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-semibold text-near-black leading-tight">
          Now find out which one is really you.
        </h2>

        <div className="mt-14 md:mt-20">
          <Link
            to="/assessment"
            className="inline-block w-full max-w-md px-12 py-6 bg-muse-teal text-off-white text-xl md:text-2xl font-heading font-semibold rounded-xl hover:bg-muse-teal-dark hover:-translate-y-0.5 transition-all duration-200"
          >
            Take the assessment
          </Link>
          <p className="mt-4 text-sm text-mid-gray">
            30 questions. 10 minutes. No sign-up required.
          </p>
        </div>
      </div>
    </section>
  )
}
