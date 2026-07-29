"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Lock, KeyRound, Save, RefreshCw, Eye, Plus, Trash2, Edit3, 
  Sparkles, CheckCircle2, ShieldCheck, Layers, Image as ImageIcon,
  DollarSign, Clock, ArrowLeft, LogOut, FileText
} from "lucide-react";
import { useAdminContent, PaketItem } from "@/context/AdminContentContext";

export default function AdminDashboardPage() {
  const { content, updateContent, updatePaketItem, addPaketItem, deletePaketItem, resetToDefault } = useAdminContent();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"brand" | "paket" | "preview">("brand");
  const [successToast, setSuccessToast] = useState("");

  // New Paket Form State
  const [editingPaketId, setEditingPaketId] = useState<string | null>(null);
  const [newPaket, setNewPaket] = useState<Omit<PaketItem, "id">>({
    name: "",
    category: "umroh",
    price: 30000000,
    duration: "9 Hari",
    description: "",
    imagePath: "/Asset/UMROH_REGULER.webp",
    features: ["Hotel Bintang 5", "Penerbangan Direct", "Pembimbing Ustaz"],
    isPopular: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "soraya2026" || password === "admin") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Password salah! (Gunakan: admin123)");
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran foto maksimal 5MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSuccess(result);
        showSuccess("Foto dari galeri HP/PC berhasil di-upload!");
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0C0A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-stone-900/90 border border-amber-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4 text-amber-400">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-nunito">Mode Admin CMS</h1>
            <p className="text-xs text-stone-400 mt-2">Masukan password untuk mengedit teks & foto website</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">Password Admin</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  className="w-full px-4 py-3 pl-10 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              </div>
              {loginError && <p className="text-xs text-rose-400 mt-1">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Masuk Dashboard Admin
            </button>
          </form>

          <p className="text-[11px] text-center text-stone-500 mt-6">
            Password Default: <code className="text-amber-400 font-mono">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0C0A] text-white pb-20 pt-28">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-amber-500 text-stone-950 px-5 py-3 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-5 w-5" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" /> Live Content Management System
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-nunito">Dashboard Admin CMS</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all border border-stone-700"
            >
              <Eye className="h-4 w-4 text-amber-400" /> Lihat Live Web
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-all border border-rose-500/20"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-8 border-b border-stone-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("brand")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "brand"
                ? "bg-amber-500 text-stone-950 shadow-md"
                : "bg-stone-900 text-stone-400 hover:text-white"
            }`}
          >
            <Edit3 className="h-4 w-4" /> Edit Teks Brand & Banner
          </button>
          <button
            onClick={() => setActiveTab("paket")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "paket"
                ? "bg-amber-500 text-stone-950 shadow-md"
                : "bg-stone-900 text-stone-400 hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4" /> Kelola Paket Umroh & Foto ({content.paketList.length})
          </button>
        </div>

        {/* TAB 1: EDIT BRAND & BANNER */}
        {activeTab === "brand" && (
          <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-stone-800 pb-3">
              <FileText className="h-5 w-5" /> Pengaturan Identitas & Banner Utama
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">Nama Brand Travel</label>
                <input
                  type="text"
                  value={content.brandName}
                  onChange={(e) => updateContent({ brandName: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">Tagline Sub-Judul</label>
                <input
                  type="text"
                  value={content.brandTagline}
                  onChange={(e) => updateContent({ brandTagline: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-300 mb-2">Judul Utama Banner Hero</label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => updateContent({ heroTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-300 mb-2">Deskripsi Hero Banner</label>
                <textarea
                  rows={3}
                  value={content.heroSubtitle}
                  onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">Badge Melayang Banner</label>
                <input
                  type="text"
                  value={content.heroBadge}
                  onChange={(e) => updateContent({ heroBadge: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">Nomor WhatsApp CS</label>
                <input
                  type="text"
                  value={content.whatsappNumber}
                  onChange={(e) => updateContent({ whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">Email Kontak</label>
                <input
                  type="text"
                  value={content.contactEmail}
                  onChange={(e) => updateContent({ contactEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-300 mb-2">Foto Banner Banner Utama</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={content.heroBgImage}
                    onChange={(e) => updateContent({ heroBgImage: e.target.value })}
                    placeholder="/Asset/BACKGROUND_MEKKAH_DESKTOP_V2.webp"
                    className="flex-grow px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-amber-300 focus:border-amber-500"
                  />
                  <label htmlFor="hero-bg-file" className="cursor-pointer px-4 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                    <ImageIcon className="h-4 w-4" /> 📁 Pilih Foto dari HP / PC
                  </label>
                  <input
                    id="hero-bg-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, (url) => updateContent({ heroBgImage: url }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-800">
              <button
                onClick={() => {
                  resetToDefault();
                  showSuccess("Semua teks & foto berhasil direset ke awal!");
                }}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 border border-stone-700"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset ke Default
              </button>

              <button
                onClick={() => showSuccess("Perubahan teks brand berhasil disimpan!")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center gap-2"
              >
                <Save className="h-4 w-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA PAKET UMROH & FOTO */}
        {activeTab === "paket" && (
          <div className="space-y-6">
            {/* Package Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.paketList.map((paket) => (
                <div key={paket.id} className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                        {paket.category}
                      </span>
                      <button
                        onClick={() => {
                          deletePaketItem(paket.id);
                          showSuccess(`Paket "${paket.name}" dihapus!`);
                        }}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors"
                        title="Hapus Paket"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Image Preview & URL Editor */}
                    <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4 bg-stone-950 border border-stone-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={paket.imagePath} alt={paket.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-2 left-2 right-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-amber-300 truncate">
                        🖼️ {paket.imagePath}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1 font-semibold">Nama Paket</label>
                        <input
                          type="text"
                          value={paket.name}
                          onChange={(e) => updatePaketItem(paket.id, { name: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs font-bold text-white focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1 font-semibold">Harga (Rp)</label>
                          <input
                            type="number"
                            value={paket.price}
                            onChange={(e) => updatePaketItem(paket.id, { price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs font-semibold text-white focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1 font-semibold">Durasi Hari</label>
                          <input
                            type="text"
                            value={paket.duration}
                            onChange={(e) => updatePaketItem(paket.id, { duration: e.target.value })}
                            className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs font-semibold text-white focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1 font-semibold">Foto Destinasi (URL / Upload Galeri)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={paket.imagePath}
                            onChange={(e) => updatePaketItem(paket.id, { imagePath: e.target.value })}
                            className="flex-grow px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-amber-300 focus:border-amber-500"
                          />
                          <label htmlFor={`file-pkt-${paket.id}`} className="cursor-pointer px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-[11px] font-bold whitespace-nowrap flex items-center gap-1">
                            <ImageIcon className="h-3.5 w-3.5" /> 📁 Pilih Foto
                          </label>
                          <input
                            id={`file-pkt-${paket.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => updatePaketItem(paket.id, { imagePath: url }))}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1 font-semibold">Deskripsi Singkat</label>
                        <textarea
                          rows={2}
                          value={paket.description}
                          onChange={(e) => updatePaketItem(paket.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showSuccess(`Perubahan "${paket.name}" tersimpan!`)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" /> Simpan Paket Ini
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Package Form */}
            <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <Plus className="h-5 w-5" /> Tambah Paket Umroh / Haji Baru
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Nama Paket Baru</label>
                  <input
                    type="text"
                    placeholder="Contoh: Paket Umroh Ramadhan VIP"
                    value={newPaket.name}
                    onChange={(e) => setNewPaket({ ...newPaket, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={newPaket.price}
                    onChange={(e) => setNewPaket({ ...newPaket, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Foto Paket Baru</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPaket.imagePath}
                      onChange={(e) => setNewPaket({ ...newPaket, imagePath: e.target.value })}
                      className="flex-grow px-3 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-amber-300"
                    />
                    <label htmlFor="new-paket-file" className="cursor-pointer px-3 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1">
                      <ImageIcon className="h-3.5 w-3.5" /> 📁 Pilih
                    </label>
                    <input
                      id="new-paket-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setNewPaket({ ...newPaket, imagePath: url }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Deskripsi Paket</label>
                <input
                  type="text"
                  placeholder="Deskripsi fasilitas hotel & durasi..."
                  value={newPaket.description}
                  onChange={(e) => setNewPaket({ ...newPaket, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <button
                onClick={() => {
                  if (!newPaket.name) return alert("Isi nama paket baru terlebih dahulu.");
                  addPaketItem(newPaket);
                  showSuccess(`Paket baru "${newPaket.name}" berhasil ditambahkan!`);
                  setNewPaket({
                    name: "",
                    category: "umroh",
                    price: 30000000,
                    duration: "9 Hari",
                    description: "",
                    imagePath: "/Asset/UMROH_REGULER.webp",
                    features: ["Hotel Bintang 5", "Penerbangan Direct", "Pembimbing Ustaz"],
                    isPopular: false,
                  });
                }}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" /> Tambah Paket Ke Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
