"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Paket Wisata", href: "/paket" },
    { name: "Armada", href: "/armada" },
    { name: "Booking", href: "/booking" },
    { name: "Kontak", href: "/lokasi" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-brand-dark/98 border-b border-white/10 shadow-md py-3"
            : isHome
              ? "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4 border-b border-white/5"
              : "bg-brand-dark py-4 border-b border-white/10"
        }`}
      >


        <div className="mx-auto flex items-center justify-between max-w-7xl px-4 md:px-8">
          
          {/* Left: Logo Transparan */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Soraya Tour - Kembali ke Beranda"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Asset/LOGO.png"
                alt="Soraya Tour Logo"
                className="h-full w-full object-contain filter drop-shadow-sm bg-transparent group-hover:rotate-6 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-nunito font-extrabold text-lg tracking-tight text-white leading-none">
                Soraya <span className="text-amber-400">Tour</span>
              </span>
              <span className="text-[10px] text-amber-300/80 font-medium tracking-wider uppercase mt-0.5">
                Haji & Umroh Premium
              </span>
            </div>
          </Link>

          {/* Center: Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1.5 px-1 ${
                    active 
                      ? "text-white" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop CTA */}
          <div className="hidden md:flex items-center">
            <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all duration-300 bg-brand-orange text-white hover:bg-brand-orange-light shadow-md shadow-brand-orange/25"
              >
                <span>Booking Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile: Hamburger / X toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center p-2 md:hidden text-white relative w-10 h-10 focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span 
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                }`} 
              />
              <span 
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`} 
              />
              <span 
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`} 
              />
            </div>
          </button>
        </div>
      </header>

      {/* === MOBILE FULLSCREEN POPUP MENU (HARDWARE ACCELERATED) === */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "linear" }}
              className="fixed inset-0 bg-brand-dark/80 z-[998] md:hidden transform-gpu"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />


            <nav
              id="mobile-menu"
              className="fixed inset-0 z-[999] flex items-center justify-center md:hidden p-4 pointer-events-none"
              aria-label="Mobile Navigation"
            >
              <motion.div 
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-cream rounded-3xl shadow-xl w-full max-w-xs p-7 flex flex-col items-center gap-5 border border-white/40 pointer-events-auto transform-gpu gpu-layer"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Asset/LOGO.png"
                      alt="Soraya Tour Logo"
                      className="h-full w-full object-contain bg-transparent"
                    />
                  </div>
                  <span className="font-nunito font-bold text-lg text-brand-dark tracking-tight">
                    Soraya <span className="text-amber-600 font-extrabold">Tour</span>
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-brand-orange/20 rounded-full" />

                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-semibold tracking-wide transition-all duration-200 py-1 ${
                        active ? "text-brand-orange font-extrabold" : "text-brand-dark/70 hover:text-brand-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="w-12 h-0.5 bg-brand-orange/20 rounded-full" />

                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-brand-orange py-3.5 text-sm font-bold text-white hover:bg-brand-orange-light transition-colors duration-200 shadow-md shadow-brand-orange/20"
                >
                  <span>Booking Sekarang</span>
                </Link>
              </motion.div>
            </nav>
          </>
        )}
      </AnimatePresence>

    </>
  );
}

