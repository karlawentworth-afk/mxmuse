import { useParams, Link } from 'react-router-dom'

export default function ShareResults() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-heading font-semibold text-near-black">Shared Profile</h1>
      <p className="mt-4 text-mid-gray">Result ID: {id}</p>
      <p className="mt-2 text-mid-gray">Public shareable view. Coming in Stage 6.</p>
      <Link to="/" className="mt-8 text-muse-teal hover:text-muse-teal-dark underline">
        Back to home
      </Link>
    </div>
  )
}
