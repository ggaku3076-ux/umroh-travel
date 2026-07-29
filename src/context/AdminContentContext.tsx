"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface PaketItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  imagePath: string;
  features: string[];
  isPopular?: boolean;
}

export interface SiteContent {
  brandName: string;
  brandTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroBgImage: string;
  whatsappNumber: string;
  contactEmail: string;
  officeAddress: string;
  paketList: PaketItem[];
}

export const defaultContent: SiteContent = {
  brandName: "Soraya Tour",
  brandTagline: "Travel Haji & Umroh Premium Bintang 5",
  heroTitle: "Perjalanan Suci Menuju Baitullah",
  heroSubtitle: "Wujudkan ibadah umroh & haji yang khusyu, nyaman, dan sesuai sunnah bersama pembimbing ustaz mutawwif berpengalaman.",
  heroBadge: "Izin Resmi PPIU Kemenag RI Bintang 5",
  heroBgImage: "/Asset/BACKGROUND_MEKKAH_DESKTOP_V2.webp",
  whatsappNumber: "0812-3456-789",
  contactEmail: "info@sorayatour.com",
  officeAddress: "Jakarta & Surabaya, Indonesia",
  paketList: [
    {
      id: "pkg-1",
      name: "Paket Umroh Reguler VIP Bintang 5",
      category: "umroh",
      price: 28500000,
      duration: "9 Hari",
      description: "Perjalanan ibadah khusyu ke Makkah & Madinah dengan hotel bintang 5 persis di depan Masjidil Haram & Masjid Nabawi.",
      imagePath: "/Asset/UMROH_REGULER.webp",
      features: [
        "Hotel Bintang 5 Depan Masjid",
        "Penerbangan Direct Saudia Airlines",
        "Kereta Cepat Haramain Makkah-Madinah",
        "Pembimbing Mutawwif Sesuai Sunnah"
      ],
      isPopular: true,
    },
    {
      id: "pkg-2",
      name: "Paket Haji Khusus Furoda VIP",
      category: "haji",
      price: 165000000,
      duration: "25 Hari",
      description: "Ibadah Haji Khusus Furoda resmi tanpa antre dengan fasilitas tenda VIP Maktab Arafah-Mina dan hotel bintang 5.",
      imagePath: "/Asset/HAJI_FURODA.webp",
      features: [
        "Visa Haji Furoda Resmi Tanpa Antre",
        "Tenda VIP Maktab Arafah & Mina",
        "Hotel PullMan Zamzam Makkah",
        "Pendampingan Dokter & Ustaz 24 Jam"
      ],
      isPopular: true,
    },
    {
      id: "pkg-3",
      name: "Paket Umroh Plus Turki & Bosphorus",
      category: "umroh",
      price: 36500000,
      duration: "12 Hari",
      description: "Ziarah suci Makkah Madinah dikombinasikan dengan wisata sejarah ke keindahan Hagia Sophia & Selat Bosphorus Istanbul.",
      imagePath: "/Asset/UMROH_PLUS_TURKI.webp",
      features: [
        "City Tour Hagia Sophia & Bosphorus",
        "Hotel Bintang 5 Makkah & Madinah",
        "Perlengkapan Umroh Exclusive",
        "Air Zam-zam 5 Liter & Full Maskapai VIP"
      ],
    },
  ],
};

interface AdminContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updatePaketItem: (id: string, updatedFields: Partial<PaketItem>) => void;
  addPaketItem: (newItem: Omit<PaketItem, "id">) => void;
  deletePaketItem: (id: string) => void;
  resetToDefault: () => void;
}

const AdminContentContext = createContext<AdminContentContextType>({
  content: defaultContent,
  updateContent: () => {},
  updatePaketItem: () => {},
  addPaketItem: () => {},
  deletePaketItem: () => {},
  resetToDefault: () => {},
});

export function AdminContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem("soraya_admin_content_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.warn("Failed to parse saved admin content:", err);
      }
    }
  }, []);

  const saveToLocalStorage = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem("soraya_admin_content_v1", JSON.stringify(newContent));
  };

  const updateContent = (newFields: Partial<SiteContent>) => {
    const updated = { ...content, ...newFields };
    saveToLocalStorage(updated);
  };

  const updatePaketItem = (id: string, updatedFields: Partial<PaketItem>) => {
    const updatedPaketList = content.paketList.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    );
    saveToLocalStorage({ ...content, paketList: updatedPaketList });
  };

  const addPaketItem = (newItem: Omit<PaketItem, "id">) => {
    const id = `pkg-${Date.now()}`;
    const updatedPaketList = [...content.paketList, { ...newItem, id }];
    saveToLocalStorage({ ...content, paketList: updatedPaketList });
  };

  const deletePaketItem = (id: string) => {
    const updatedPaketList = content.paketList.filter((item) => item.id !== id);
    saveToLocalStorage({ ...content, paketList: updatedPaketList });
  };

  const resetToDefault = () => {
    saveToLocalStorage(defaultContent);
  };

  return (
    <AdminContentContext.Provider
      value={{
        content,
        updateContent,
        updatePaketItem,
        addPaketItem,
        deletePaketItem,
        resetToDefault,
      }}
    >
      {children}
    </AdminContentContext.Provider>
  );
}

export function useAdminContent() {
  return useContext(AdminContentContext);
}
