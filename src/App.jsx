import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import ShareResults from './pages/ShareResults'
import CMO from './pages/CMO'
import About from './pages/About'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/results/:id" element={<Results />} />
      <Route path="/results/:id/share" element={<ShareResults />} />
      <Route path="/cmo" element={<CMO />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}
