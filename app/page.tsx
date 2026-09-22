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

import { getMenuCategories, getMenuItems } from '@/data/menu'
import { getTestimonials } from '@/data/testimonials'
import { getTeamMembers } from '@/data/team'
import { getSignatureImages } from '@/data/signature'

export default async function Home() {
  const [categories, items, testimonials, team, signatureImages] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getTestimonials(),
    getTeamMembers(),
    getSignatureImages(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StoryChapter />
        <MeatScienceDashboard />
        <TimeCraft />
        <SignatureCarousel initialImages={signatureImages} />
        <TheHouse />
        <MenuEditorial categories={categories} items={items} />
        <TestimonialsCarousel initialTestimonials={testimonials} />
        <Reservation />
        <AlwarpetChapter />
        <TeamSection initialTeam={team} />
      </main>
      <Footer />
    </>
  )
}
