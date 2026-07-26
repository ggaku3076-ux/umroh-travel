"use client";

import { useState, useMemo } from "react";
import { 
  Wand2, Users, Calendar, Sparkles, Download, MessageSquare, BadgeCheck, Star, ShieldCheck
} from "lucide-react";
import { generateItineraryPDF } from "@/lib/pdfGenerator";

export default function AITripCustomizer() {
  const [destination, setDestination] = useState<string>("Umroh Reguler Bintang 5");
  const [duration, setDuration] = useState<string>("9Hari");
  const [passengers, setPassengers] = useState<number>(2);
  const [tripStyle, setTripStyle] = useState<"reguler" | "family" | "vip">("vip");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Instant AI Customizer Calculation Engine for Umroh
  const tripCalculation = useMemo(() => {
    let basePricePerPerson = 29500000; // default Umroh Reguler 9 hari

    if (destination.includes("Turki")) {
      basePricePerPerson = 38500000;
    } else if (destination.includes("Aqsa")) {
      basePricePerPerson = 42500000;
    } else if (destination.includes("Haji")) {
      basePricePerPerson = 185000000;
    } else {
      basePricePerPerson = duration === "9Hari" ? 29500000 : duration === "12Hari" ? 34500000 : 45000000;
    }

    let styleMultiplier = tripStyle === "reguler" ? 0.95 : tripStyle === "family" ? 1.0 : 1.25;
    let groupDiscount = passengers >= 10 ? 0.92 : passengers >= 4 ? 0.96 : 1.0;

    const pricePerPerson = Math.round((basePricePerPerson * styleMultiplier * groupDiscount) / 50000) * 50000;
    const totalPrice = pricePerPerson * passengers;
    const downPayment = Math.round(totalPrice * 0.2);

    let hotelRecommendation = "Pullman Zamzam Makkah & Dar Al Taqwa Madinah (Bintang 5)";
    if (tripStyle === "vip") {
      hotelRecommendation = "Raffles Makkah Palace & Oberoi Madinah (VIP 0 Meter)";
    } else if (tripStyle === "reguler") {
      hotelRecommendation = "Anjum Hotel Makkah & Frontel Al Harithia Madinah (Bintang 5)";
    }

    const dayByDay = [
      { day: 1, title: "Keberangkatan & Tiba di Jeddah", desc: "Penerbangan direct flight ke Jeddah, proses imigrasi, dan menuju hotel Madinah." },
      { day: 2, title: "Ziarah Masjid Nabawi & Raudah", desc: "Salat khusyu di Masjid Nabawi, ziarah Makam Rasulullah SAW & Raudah." },
      { day: 3, title: "Ziarah Kota Madinah", desc: "Ziarah Masjid Quba, Jabal Uhud, Masjid Qiblatain, dan Kebun Kurma." },
      { day: 4, title: "Ihraam & Menuju Makkah Al-Mukarramah", desc: "Ambil miqat di Bir Ali, perjalanan dengan Kereta Cepat Haramain menuju Makkah, dilanjutkan pelaksanaan Umroh Utama (Tawaf & Sa'i)." },
      { day: 5, title: "Ibadah Khusyu Makkah", desc: "Memperbanyak salat di depan Ka'bah Masjidil Haram & ikhtikaf." },
      { day: 6, title: "Ziarah Kota Makkah", desc: "Ziarah Jabal Tsur, Jabal Rahmah, Arafah, Muzdalifah, & Mina." },
      { day: 7, title: "Tawaf Wada & Persiapan Kepulangan", desc: "Pelaksanaan Tawaf Wada', check-out hotel Makkah, & perjalanan menuju Bandara Jeddah." },
      { day: 8, title: "Penerbangan Kembali ke Indonesia", desc: "Penerbangan kembali menuju tanah air." },
      { day: 9, title: "Tiba di Indonesia", desc: "Tiba di tanah air dengan selamat dan meraih predikat Umroh Maqbul." }
    ];

    return {
      pricePerPerson,
      totalPrice,
      downPayment,
      hotelRecommendation,
      dayByDay,
    };
  }, [destination, duration, passengers, tripStyle]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateItineraryPDF({
        destination,
        duration,
        passengers,
        vehicle: tripCalculation.hotelRecommendation,
        totalPrice: tripCalculation.totalPrice,
        pricePerPerson: tripCalculation.pricePerPerson,
        downPayment: tripCalculation.downPayment,
        dayByDay: tripCalculation.dayByDay,
      });
    } catch (err) {
      alert("Terjadi masalah saat membuat PDF. Silakan coba lagi.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleBookWhatsApp = () => {
    let msg = `Halo Soraya Tour, saya ingin mendaftar *Paket Umroh Custom AI*:\n\n`;
    msg += `• Paket: ${destination}\n`;
    msg += `• Durasi: ${duration}\n`;
    msg += `• Jumlah Jamaah: ${passengers} Orang\n`;
    msg += `• Kategori: ${tripStyle.toUpperCase()}\n`;
    msg += `• Estimasi Total: Rp ${tripCalculation.totalPrice.toLocaleString("id-ID")}\n\n`;
    msg += `Mohon konfirmasi ketersediaan kuota & jadwal keberangkatan.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/628123456789?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-20 md:py-28 bg-[#0D0C0A] text-white relative overflow-hidden border-t border-amber-500/20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-widest">
            <Wand2 className="h-4 w-4 text-amber-400" />
            Instant AI Customizer
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 font-nunito tracking-tight">
            Hitung Estimasi Paket Umroh <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Secara Instan 3 Detik
            </span>
          </h2>
          <p className="text-stone-300 mt-4 text-sm sm:text-base font-light leading-relaxed">
            Sesuaikan paket ibadah Umroh dan Haji Anda secara fleksibel. Sistem AI Soraya Tour langsung menghitung estimasi biaya dan merekomendasikan hotel Bintang 5 secara otomatis.
          </p>
        </div>

        {/* CUSTOMIZER CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* INPUT FORM PANEL */}
          <div className="lg:col-span-7 bg-[#1A1815] border border-amber-500/20 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* 1. DESTINASI */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                1. Pilih Jenis Paket Ibadah
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Umroh Reguler Bintang 5",
                  "Umroh Plus Turki",
                  "Umroh Plus Al-Aqsa",
                  "Haji Khusus Furoda"
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setDestination(item)}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all text-left border ${
                      destination === item
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border-amber-300 shadow-md"
                        : "bg-white/5 border-white/10 text-stone-300 hover:border-amber-500/40"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. DURASI */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                2. Durasi Perjalanan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "9 Hari (Reguler)", val: "9Hari" },
                  { label: "12 Hari (Plus)", val: "12Hari" },
                  { label: "16 Hari (Ramadan)", val: "16Hari" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setDuration(item.val)}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      duration === item.val
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border-amber-300 shadow-md"
                        : "bg-white/5 border-white/10 text-stone-300 hover:border-amber-500/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. KATEGORI LAYANAN */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                3. Tipe Kategori Akomodasi
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Bintang 5 Standar", val: "reguler" },
                  { label: "Bintang 5 Family", val: "family" },
                  { label: "VIP 0 Meter Haram", val: "vip" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setTripStyle(item.val as any)}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      tripStyle === item.val
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border-amber-300 shadow-md"
                        : "bg-white/5 border-white/10 text-stone-300 hover:border-amber-500/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. JUMLAH JAMAAH */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  4. Jumlah Jamaah (Orang)
                </label>
                <span className="text-sm font-extrabold text-amber-300">{passengers} Jamaah</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* CALCULATION RESULT DISPLAY PANEL */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#24201B] to-[#161411] border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="font-nunito font-bold text-sm text-white">Estimasi Paket Soraya Tour</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
                AI Verified
              </span>
            </div>

            <div>
              <span className="text-xs text-stone-400 block font-light">Estimasi Total Biaya ({passengers} Jamaah)</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 mt-1 font-nunito tracking-tight">
                Rp {tripCalculation.totalPrice.toLocaleString("id-ID")}
              </div>
              <span className="text-xs text-stone-300 mt-1 block">
                (Sekitar Rp {tripCalculation.pricePerPerson.toLocaleString("id-ID")} / jamaah)
              </span>
            </div>

            <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-amber-500/20 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Rekomendasi Hotel:</span>
                <span className="font-semibold text-amber-300 text-right max-w-[200px]">{tripCalculation.hotelRecommendation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Uang Muka (DP 20%):</span>
                <span className="font-bold text-amber-400">Rp {tripCalculation.downPayment.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Penerbangan:</span>
                <span className="font-semibold text-emerald-400">Direct Flight Garuda / Saudia</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBookWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Konsultasi & Booking via WhatsApp</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Download className="h-4 w-4 text-amber-400" />
                <span>{isGeneratingPdf ? "Menyiapkan PDF Brosur..." : "Download PDF Itinerary Brosur"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
