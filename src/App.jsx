import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { bind } from 'cuelume'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const unbind = bind()
    return () => unbind?.()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <Navbar />
        <main className="mx-auto max-w-2xl bg-bg px-6">
          <Hero />
          <Projects />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  )
}

export default App
