import { Header } from './(components)/Header'
import { Hero } from './(components)/Hero'
import { About } from './(components)/About'
import { Tickets } from './(components)/Tickets'
import { Schedule } from './(components)/Schedule'
import { FAQ } from './(components)/FAQ'
import { Sponsors } from './(components)/Sponsors'
import { CTA } from './(components)/CTA'
import { Footer } from './(components)/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Tickets />
      <Schedule />
      <FAQ />
      <Sponsors />
      <CTA />
      <Footer />
    </main>
  )
}
