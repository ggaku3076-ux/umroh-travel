"use client";

import { MapPin, Phone, Mail, Clock, MessageSquare, BadgeCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function LokasiPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
  };

  return (
    <section 
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 font-sans text-xs font-bold tracking-widest text-amber-600 uppercase border border-amber-500/30">
            <BadgeCheck className="h-3.5 w-3.5" />
            HUBUNGI KAMI & ALAMAT
          </span>

          <h1 
            id="contact-title" 
            className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito"
          >
            Kontak Soraya Tour
          </h1>
          <p className="text-base text-brand-dark/70 mt-4 font-light leading-relaxed">
            Tim konsultan ibadah Soraya Tour siap melayani pendaftaran Umroh & Haji Khusus 24 jam. Hubungi kami melalui kontak di bawah ini.
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
          
          {/* Details & Contacts (Left) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-8 text-left"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold text-brand-dark mb-4 font-nunito">Informasi Kontak</h2>
              <div className="flex flex-col gap-5">
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Alamat Lengkap</h3>
                    <p className="text-sm text-brand-dark/70 mt-1 leading-relaxed font-light">
                      Kabupaten Jombang, Jawa Timur
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Nomor Telepon & WhatsApp</h3>
                    <p className="text-sm text-brand-dark/70 mt-1 font-medium">
                      <a href="tel:+628123456789" className="hover:text-brand-orange transition-colors">
                        0812-3456-789
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Email Resmi</h3>
                    <p className="text-sm text-brand-dark/70 mt-1 font-medium">
                      <a href="mailto:info@sorayatour.com" className="hover:text-brand-orange transition-colors">
                        info@sorayatour.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold text-brand-dark mb-4 font-nunito">Jam Operasional</h2>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-sm">Buka Setiap Hari</h3>
                  <p className="text-sm text-brand-dark/70 mt-1 font-light">
                    24 Jam Nonstop (Layanan Reservasi & Perjalanan)
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Wireframe & Directions (Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold text-brand-dark text-left font-nunito">Peta Lokasi</h2>
            
            {/* Visual map wireframe */}
            <div className="relative aspect-[16/10] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10">
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-b border-brand-orange/20" />
              </div>

              {/* Pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-11 w-11 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg shadow-brand-orange/40"
                >
                  <MapPin className="h-6 w-6" />
                </motion.div>
                <span className="bg-brand-dark text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">Mustika Travel Jombang</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <p className="text-xs text-brand-dark/60 leading-relaxed font-light">
                Butuh jemputan mendadak atau ingin mendiskusikan rute perjalanan kustom Anda langsung? Ketuk tombol di bawah untuk konsultasi cepat via WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-orange py-3.5 px-4 text-xs font-bold text-white hover:bg-brand-orange-light transition-all shadow-md shadow-brand-orange/20"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat CS WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

