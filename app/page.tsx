import { Header } from './(components)/Header'
import { Hero } from './(components)/Hero'
import { About } from './(components)/About'
import { Tickets } from './(components)/Tickets'
import { Schedule } from './(components)/Schedule'
import { FAQ } from './(components)/FAQ'
import { Sponsors } from './(components)/Sponsors'
import { GalleryCarousel } from './(components)/GalleryCarousel'
import { Newsletter } from './(components)/Newsletter'
import { CTA } from './(components)/CTA'
import { Footer } from './(components)/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <GalleryCarousel />
      <Tickets />
      <Schedule />
      <FAQ />
      <Sponsors />
      <Newsletter />
      <CTA />
      <Footer />
    </main>
  )
}
