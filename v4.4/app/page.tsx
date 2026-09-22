import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StoryChapter from '@/components/StoryChapter'
import MeatScienceDashboard from '@/components/MeatScienceDashboard'
import TimeCraft from '@/components/TimeCraft'
import SignatureCarousel from '@/components/SignatureCarousel'
import TheHouse from '@/components/TheHouse'
import MenuEditorial from '@/components/MenuEditorial'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import Reservation from '@/components/Reservation'
import AlwarpetChapter from '@/components/AlwarpetChapter'
import TeamSection from '@/components/TeamSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StoryChapter />
        <MeatScienceDashboard />
        <TimeCraft />
        <SignatureCarousel />
        <TheHouse />
        <MenuEditorial />
        <TestimonialsCarousel />
        <Reservation />
        <AlwarpetChapter />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
