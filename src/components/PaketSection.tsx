"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Compass, Check, ArrowRight, BadgeCheck } from "lucide-react";
import { useAdminContent } from "@/context/AdminContentContext";

export default function PaketSection() {
  const { content } = useAdminContent();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPaket = useMemo(() => {
    return content.paketList.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, content.paketList]);

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-bold uppercase tracking-widest text-amber-600 border border-amber-500/20">
            <BadgeCheck className="h-3.5 w-3.5" />
            Layanan Ibadah VIP
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito">Paket Umroh & Haji {content.brandName}</h2>
          <p className="text-stone-600 mt-4 text-base font-light leading-relaxed">
            Pilihan paket ibadah Umroh Reguler, Umroh Plus Turki/Aqsa, dan Haji Khusus dengan pelayanan Bintang 5 terpercaya.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="text-sm font-semibold text-slate-500">
            Menampilkan <span className="text-brand-orange font-bold">{filteredPaket.length}</span> Paket Wisata Pilihan
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all shadow-xs"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Paket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPaket.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              {/* Card Image Header */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={pkg.imagePath}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card Top */}
              <div className="p-6 md:p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-brand-orange bg-brand-cream px-3 py-1.5 rounded-full border border-brand-orange/15 shadow-xs">
                    {pkg.duration}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-xs font-bold text-white bg-brand-orange px-3 py-1.5 rounded-full shadow-xs">
                      Terlaris
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3 font-nunito group-hover:text-brand-orange transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-light">{pkg.description}</p>

                {/* Features List */}
                <div className="space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Check className="h-4 w-4 text-brand-orange shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-5 md:px-8 bg-slate-50 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mulai Dari</span>
                    <span className="text-xl font-extrabold text-brand-dark">
                      Rp {pkg.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <Link
                    href={`/booking?paket=${pkg.id}`}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <span>Pesan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Instant PDF Download Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    import("@/lib/pdfGenerator").then(({ generateItineraryPDF }) => {
                      generateItineraryPDF({
                        title: pkg.name,
                        destination: pkg.name.replace("Paket Wisata ", "").replace("Trip ", ""),
                        duration: pkg.duration,
                        passengerCount: 4,
                        tripStyle: "Family Private Tour",
                        pricePerPerson: pkg.price,
                        totalPrice: pkg.price * 4,
                        downPayment: Math.round(pkg.price * 4 * 0.3),
                        recommendedVehicle: "Toyota Avanza / Innova Reborn",
                        highlights: pkg.features,
                        dayByDay: [
                          {
                            day: "Hari 1",
                            title: `Penjemputan & Penjelajahan Utama ${pkg.name}`,
                            activities: [
                              "07:00 - Penjemputan peserta di Jombang / Surabaya dengan kendaraan AC nyaman.",
                              "12:00 - Makan siang kuliner khas lokal & check-in penginapan.",
                              "15:00 - Menikmati objek wisata unggulan & spot foto terbaik.",
                            ],
                          },
                          {
                            day: "Hari 2",
                            title: "Wisata Souvenir & Kepulangan",
                            activities: [
                              "08:00 - Breakfast hotel & check-out penginapan.",
                              "10:00 - Pusat oleh-oleh khas & cinderamata.",
                              "14:00 - Perjalanan kembali ke Jombang, tour selesai dengan aman & berkesan.",
                            ],
                          },
                        ],
                      });
                    });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-brand-orange text-slate-700 hover:text-brand-orange text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <span>📥 Download PDF Brosur Resmi</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredPaket.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 mt-6">
            <Compass className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Paket wisata "{searchQuery}" tidak ditemukan.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs text-brand-orange font-bold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
