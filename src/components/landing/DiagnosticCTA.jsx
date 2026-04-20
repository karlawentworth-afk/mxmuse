import { Link } from 'react-router-dom'

export default function DiagnosticCTA() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-semibold text-near-black">
        Now find out which one is really you.
      </h2>

      <p className="mt-6 text-lg text-mid-gray leading-relaxed max-w-xl mx-auto">
        30 questions. 10 minutes. No sign-up. You'll get a detailed personal
        profile showing where your natural talents sit, and where your current
        role is costing you.
      </p>

      <Link
        to="/assessment"
        className="mt-10 inline-block px-8 py-4 bg-muse-teal text-white text-lg font-medium rounded-lg hover:bg-muse-teal-dark transition-colors"
      >
        Take the assessment →
      </Link>
    </section>
  )
}
