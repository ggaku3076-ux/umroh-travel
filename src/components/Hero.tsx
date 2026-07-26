import Image from "next/image";
import Link from "next/link";
import { Compass, Camera, Map, ArrowRight, ShieldCheck, BadgeCheck, Award } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark text-white"
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 hidden lg:block z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND_MEKKAH_DESKTOP_V2.webp"
          alt="Umroh Travel Desktop Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 block lg:hidden z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND_MEKKAH_MOBILE_V2.webp"
          alt="Umroh Travel Mobile Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>


      {/* OVERLAY FOR TEXT READABILITY & DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none z-10" />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8 flex-grow flex flex-col justify-end pt-32 pb-6 lg:pb-8">
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start gap-4 md:gap-5 mb-4">
          {/* FLOATING BADGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-semibold text-white tracking-wide shadow-xs">
            <BadgeCheck className="h-4 w-4 text-brand-orange-light shrink-0" />
            <span>Layanan Umroh & Hajj Premium Terpercaya</span>
          </div>
          
          {/* MAIN HEADING */}
          <h1 
            id="hero-title" 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans drop-shadow-md"
          >
            Ibadah Suci & Perjalanan Khusyu <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
              Ke Tanah Suci Makkah & Madinah.
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg font-light drop-shadow-sm">
            Wujudkan impian ibadah Umroh dan Haji Anda bersama pembimbing ibadah berpengalaman, hotel berbintang dekat Masjidil Haram, serta pelayanan privat dan nyaman.
          </p>


          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm shadow-lg shadow-brand-orange/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/paket"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <Compass className="h-4 w-4 text-blue-200" />
              <span>Lihat Paket Wisata</span>
            </Link>
          </div>
        </div>

        {/* HERO FOOTER - ENHANCED STATS BAR */}
        <div className="hidden md:grid grid-cols-12 gap-6 pt-4 border-t border-white/15 mt-4 items-center text-left w-full bg-brand-dark/40">
          <div className="col-span-5 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange-light flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-brand-orange-light" /> Best Experience
              </span>
              <span className="text-[11px] text-white/80">Tersedia Sepanjang Tahun</span>
            </div>
            <div className="h-7 w-px bg-white/20" />
            <div className="flex items-center gap-2.5 text-white/80">
              <Camera className="h-4 w-4 hover:text-white transition-colors" />
              <Compass className="h-4 w-4 hover:text-white transition-colors" />
              <Map className="h-4 w-4 hover:text-white transition-colors" />
              <ShieldCheck className="h-4 w-4 text-brand-orange-light" />
            </div>
          </div>

          <div className="col-span-7">
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Dari pemandangan matahari terbit yang memukau hingga hamparan laut pasir dan kawah vulkanik yang megah, Bromo menawarkan pengalaman ajaib yang tidak akan pernah Anda lupakan sepanjang hidup.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
