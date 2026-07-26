import Image from "next/image";
import Link from "next/link";
import { Compass, Camera, Map, ArrowRight, ShieldCheck, BadgeCheck, Award, Star } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0D0C0A] text-white"
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 hidden lg:block z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND_MEKKAH_DESKTOP_V2.webp"
          alt="Soraya Tour Umroh Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85]"
        />
      </div>
      <div className="absolute inset-0 block lg:hidden z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND_MEKKAH_MOBILE_V2.webp"
          alt="Soraya Tour Umroh Background Mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85]"
        />
      </div>

      {/* OVERLAY FOR TEXT READABILITY & DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-[#0D0C0A]/40 to-black/30 pointer-events-none z-10" />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8 flex-grow flex flex-col justify-end pt-32 pb-6 lg:pb-8">
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start gap-4 md:gap-5 mb-4">
          {/* FLOATING BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-400/50 text-xs font-bold text-amber-300 tracking-wide shadow-lg shadow-amber-500/10">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>Soraya Tour — Travel Haji & Umroh VIP Bintang 5</span>
          </div>
          
          {/* MAIN HEADING */}
          <h1 
            id="hero-title" 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans drop-shadow-md"
          >
            Ibadah Khusyu & Perjalanan Suci <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-black drop-shadow-lg">
              Bersama Soraya Tour.
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-lg font-light drop-shadow-sm">
            Wujudkan impian ibadah Umroh & Haji Anda dengan bimbingan ustaz mutawwif berpengalaman, hotel bintang 5 terdekat Masjidil Haram & Nabawi, serta kepastian keberangkatan resmi.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Konsultasi Paket Umroh</span>
              <ArrowRight className="h-4 w-4 text-stone-950" />
            </Link>

            <Link
              href="/paket"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-semibold text-sm border border-amber-400/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Lihat Jadwal & Paket</span>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM HIGHLIGHT STRIP */}
      <div className="relative z-20 border-t border-amber-500/20 bg-black/60 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-nunito">100% Resmi</span>
            <span className="text-xs text-stone-300 font-light">Izin PPIU Kemenag RI</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-nunito">Bintang 5</span>
            <span className="text-xs text-stone-300 font-light">Hotel Depan Masjidil Haram</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-nunito">Pembimbing VIP</span>
            <span className="text-xs text-stone-300 font-light">Ustaz Mutawwif Sesuai Sunnah</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-nunito">Garansi Berangkat</span>
            <span className="text-xs text-stone-300 font-light">Tiket & Visa Terkonfirmasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
