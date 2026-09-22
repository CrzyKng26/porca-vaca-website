import Image from 'next/image'

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Closing call to action"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=85&w=2400&auto=format&fit=crop"
          alt="Restaurant exterior at night with warm glowing lights, inviting and atmospheric"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-bg-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 to-bg-primary/60" />
      </div>

      {/* Content — centred cinematic frame */}
      <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">

        {/* Top thin line */}
        <div className="w-px h-16 bg-gold-DEFAULT/30 mb-10 reveal" aria-hidden="true" />

        {/* Label */}
        <p className="text-label text-gold-DEFAULT tracking-[0.22em] mb-6 reveal delay-100">
          ALWARPET · CHENNAI
        </p>

        {/* Brand name — huge */}
        <h2
          className="font-display text-cream leading-[0.88] mb-6 reveal delay-200"
          style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
        >
          PORCA
          <br />
          <span className="text-gold-DEFAULT italic">&</span>
          <br />
          VACA
        </h2>

        {/* Tagline */}
        <p className="text-cream/55 text-base font-light tracking-wide mb-10 reveal delay-300">
          Bold cuts. Slow fire. Serious flavour.
        </p>

        {/* CTA */}
        <a
          href="#location"
          className="btn-primary reveal delay-400"
        >
          Visit Us
        </a>

        {/* Bottom thin line */}
        <div className="w-px h-16 bg-gold-DEFAULT/30 mt-10 reveal delay-500" aria-hidden="true" />
      </div>
    </section>
  )
}
