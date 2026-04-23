import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/landing/Hero'
import ArchetypeTabs from '../components/landing/ArchetypeTabs'
import DiagnosticCTA from '../components/landing/DiagnosticCTA'
import ConceptViz from '../components/landing/ConceptViz'
import Editorial from '../components/landing/Editorial'
import RepeatCTA from '../components/landing/RepeatCTA'

export default function Landing() {
  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <main>
        <Hero />
        <ArchetypeTabs />
        <DiagnosticCTA />
        <ConceptViz />
        <Editorial />
        <RepeatCTA />
      </main>
      <Footer />
    </div>
  )
}
