import { Link } from 'react-router-dom'

export default function DiagnosticCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-semibold text-near-black leading-tight">
          Now find out which one is really you.
        </h2>

        <p className="mt-6 md:mt-8 text-lg md:text-xl text-mid-gray leading-relaxed max-w-xl mx-auto">
          30 questions. 10 minutes. No sign-up. You'll get a detailed personal
          profile showing where your natural talents sit, and where your current
          role is costing you.
        </p>

        <Link
          to="/assessment"
          className="mt-10 md:mt-12 inline-block px-10 py-5 bg-muse-teal text-white text-lg font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
        >
          Take the assessment
        </Link>
      </div>
    </section>
  )
}
