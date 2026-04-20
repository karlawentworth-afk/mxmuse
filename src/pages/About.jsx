import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-heading font-semibold text-near-black">About MX Muse</h1>
      <p className="mt-4 text-mid-gray max-w-lg text-center">
        MX Muse is a free marketing profile assessment built by Karla Wentworth at CleverMX.
        Full about page coming in Stage 6.
      </p>
      <Link to="/" className="mt-8 text-muse-teal hover:text-muse-teal-dark underline">
        Back to home
      </Link>
    </div>
  )
}
