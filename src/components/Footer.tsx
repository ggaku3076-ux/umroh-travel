import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Compass, ExternalLink, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      id="kontak" 
      className="bg-[#0A0908] text-white pt-12 md:pt-16 pb-6 md:pb-8 border-t border-amber-500/20"
      aria-labelledby="footer-title"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        
        {/* === MOBILE FOOTER LAYOUT === */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Asset/SORAYA_LOGO_V2.png"
                  alt="Soraya Tour Logo"
                  className="h-full w-full object-contain bg-transparent"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-nunito font-extrabold text-lg text-white tracking-tight leading-none">
                  Soraya <span className="text-amber-400">Tour</span>
                </span>
                <span className="text-[9px] text-amber-300/80 font-semibold tracking-wider uppercase mt-0.5">
                  Haji & Umroh Premium
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-[280px]">
              Biro Perjalanan Ibadah Umroh & Haji Khusus Resmi Kemenag RI dengan Pelayanan VIP Bintang 5.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-3.5 flex flex-col gap-2">
              <MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <p className="text-[11px] text-stone-200 leading-snug">
                Jakarta & Surabaya, Indonesia
              </p>
            </div>
            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-3.5 flex flex-col gap-2">
              <Clock className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold text-stone-200">Setiap Hari</p>
                <p className="text-[11px] text-amber-300/80">Layanan Konsultasi 24 Jam</p>
              </div>
            </div>
            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-3.5 flex flex-col gap-2">
              <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <a href="tel:+628123456789" className="text-[11px] text-stone-200 leading-snug font-semibold">
                0812-3456-789
              </a>
            </div>
            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-3.5 flex flex-col gap-2">
              <Mail className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <a href="mailto:info@sorayatour.com" className="text-[11px] text-stone-200 leading-snug break-all font-semibold">
                info@sorayatour.com
              </a>
            </div>
          </div>

          <a
            href="https://wa.me/628123456789?text=Halo%20Soraya%20Tour,%20saya%20ingin%20konsultasi%20Paket%20Umroh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-extrabold text-stone-950 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-md mb-6"
          >
            <Star className="h-4 w-4 fill-stone-950 text-stone-950" />
            <span>Konsultasi Umroh CS Soraya</span>
          </a>

          <p className="text-center text-[10px] text-stone-400 mt-3">
            © 2026 Soraya Tour (Travel Haji & Umroh). All rights reserved.
          </p>
        </div>

        {/* === DESKTOP FOOTER LAYOUT === */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Asset/SORAYA_LOGO_V2.png"
                    alt="Soraya Tour Logo"
                    className="h-full w-full object-contain bg-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-nunito font-extrabold text-xl text-white tracking-tight leading-none">
                    Soraya <span className="text-amber-400">Tour</span>
                  </span>
                  <span className="text-[10px] text-amber-300/80 font-medium tracking-wider uppercase mt-1">
                    Travel Haji & Umroh VIP
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Penyelenggara Perjalanan Ibadah Umroh (PPIU) resmi dan Haji Khusus terpercaya. Menghadirkan kekhusyu'an ibadah dengan bimbingan Ustaz Sunnah dan akomodasi hotel bintang 5 depan Masjidil Haram & Nabawi.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-4">Navigasi</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-stone-300">
                <li><Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link></li>
                <li><Link href="/paket" className="hover:text-amber-300 transition-colors">Paket Umroh & Haji</Link></li>
                <li><Link href="/armada" className="hover:text-amber-300 transition-colors">Fasilitas & Bus VIP</Link></li>
                <li><Link href="/booking" className="hover:text-amber-300 transition-colors">Pendaftaran Umroh</Link></li>
                <li><Link href="/lokasi" className="hover:text-amber-300 transition-colors">Alamat & Kontak</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-4">Layanan Ibadah</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-stone-300">
                <li>Paket Umroh Reguler Bintang 5</li>
                <li>Paket Umroh VIP Ramadan</li>
                <li>Umroh Plus Turki / Al-Aqsa</li>
                <li>Perjalanan Haji Khusus Furoda</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-4">Kontak Soraya Tour</h4>
              <ul className="flex flex-col gap-3 text-xs text-stone-300">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>Kantor Pusat: Jakarta & Surabaya, Indonesia</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                  <a href="tel:+628123456789" className="hover:text-amber-300 transition-colors font-semibold">0812-3456-789</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                  <a href="mailto:info@sorayatour.com" className="hover:text-amber-300 transition-colors font-semibold">info@sorayatour.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-amber-500/20 text-xs text-stone-400">
            <p>© 2026 Soraya Tour (Travel Haji & Umroh Bintang 5). All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-amber-300">Syarat & Ketentuan</Link>
              <Link href="#" className="hover:text-amber-300">Kebijakan Privasi</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
