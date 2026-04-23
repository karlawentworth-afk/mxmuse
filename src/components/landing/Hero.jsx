import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black leading-[1.05] text-navy max-w-4xl">
          It's 2pm. You haven't done any actual marketing yet.
        </h1>

        <p className="mt-8 md:mt-10 text-lg md:text-xl font-light text-mid-gray leading-relaxed max-w-2xl">
          You've fixed a broken automation. Pulled a report manually. Sat through
          a vendor demo. Updated the CMS. Four completely different ways the same
          day hits you.
        </p>

        <div className="mt-12 md:mt-16">
          <Link
            to="/assessment"
            className="inline-flex items-center justify-center px-10 py-5 bg-muse-teal text-white text-lg font-bold rounded-xl hover:bg-muse-teal-dark transition-colors duration-200"
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
