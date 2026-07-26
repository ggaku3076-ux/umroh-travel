import Link from "next/link";
import Hero from "@/components/Hero";
import AITripCustomizer from "@/components/AITripCustomizer";
import { Compass, CalendarRange, MapPin, ArrowRight, BadgeCheck, Star, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  const portalCards = [
    {
      icon: Star,
      title: "Paket Umroh Bintang 5",
      description: "Pilihan perjalanan ibadah Umroh Reguler 9 hari & Umroh VIP Ramadan dengan hotel terdekat Masjidil Haram.",
      href: "/paket",
      linkText: "Pilih Paket Umroh",
      badge: "Favorit Jamaah",
    },
    {
      icon: ShieldCheck,
      title: "Haji Khusus Furoda",
      description: "Program ibadah Haji Khusus tanpa antrean lama dengan fasilitas tenda VIP Arafah-Mina dan konsumsi penuh.",
      href: "/paket",
      linkText: "Info Haji Khusus",
      badge: "Garansi Resmi",
    },
    {
      icon: Compass,
      title: "Umroh Plus Turki",
      description: "Kombinasi perjalanan ibadah Umroh suci di Makkah & Madinah dilanjutkan ziarah wisata sejarah di Istanbul & Cappadocia.",
      href: "/paket",
      linkText: "Lihat Rencana Trip",
      badge: "Paket Populer",
    },
    {
      icon: CalendarRange,
      title: "Pendaftaran & Konsultasi",
      description: "Daftar Umroh secara mudah, cepat, dan konsultasikan jadwal keberangkatan bersama tim Ustaz Mutawwif Soraya Tour.",
      href: "/booking",
      linkText: "Mulai Konsultasi",
      badge: "Respon Cepat",
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Home Portal Navigation Grid */}
      <section 
        className="py-16 md:py-24 bg-[#12100E] border-t border-amber-500/20 relative overflow-hidden"
        aria-labelledby="portal-title"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 font-sans text-xs font-bold tracking-widest text-amber-400 uppercase border border-amber-500/30">
              <BadgeCheck className="h-3.5 w-3.5" />
              Layanan Ibadah Soraya Tour
            </span>
            <h2 
              id="portal-title" 
              className="text-3xl font-extrabold text-white sm:text-4xl mt-4 tracking-tight font-nunito"
            >
              Fasilitas & Program Ibadah Bintang 5
            </h2>
            <p className="text-stone-300 mt-4 text-base font-light leading-relaxed">
              Jadikan perjalanan ibadah Anda dan keluarga penuh keberkahan, kenyamanan, dan kepastian bersama Soraya Tour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portalCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-3xl bg-[#1A1815] border border-amber-500/20 p-6 flex flex-col justify-between hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-nunito group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed font-light mb-6">
                      {card.description}
                    </p>
                  </div>

                  <Link 
                    href={card.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI TRIP CUSTOMIZER FOR UMROH */}
      <AITripCustomizer />
    </>
  );
}
