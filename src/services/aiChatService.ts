import { ChatMessage } from "@/types/chatbot";

/**
 * Intelligent AI Chat Service for Soraya Tour (Travel Haji & Umroh VIP).
 * Integrates with DeepSeek LLM via /api/chat with local Knowledge Base fallback.
 */
export async function generateAIResponse(
  userQuery: string,
  chatHistory?: ChatMessage[]
): Promise<{ text: string; quickActions?: { label: string; action: string }[] }> {
  const query = userQuery.toLowerCase().trim();

  // Try fetching live AI response from DeepSeek API route first
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userQuery,
        messages: (chatHistory || []).slice(-6),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.text) {
        let actions = [
          { label: "📲 Chat CS WhatsApp", action: "Konsultasi Umroh CS" },
          { label: "🕋 Umroh Reguler", action: "Berapa biaya paket Umroh Bintang 5?" },
          { label: "✈️ Umroh Plus Turki", action: "Info paket Umroh Plus Turki" },
        ];

        if (data.text.toLowerCase().includes("haji") || data.text.toLowerCase().includes("furoda")) {
          actions = [
            { label: "🕋 Konsultasi Haji Khusus", action: "Info pendaftaran Haji Khusus Furoda" },
            { label: "📲 Chat CS WhatsApp", action: "Konsultasi Haji CS" },
          ];
        }

        return {
          text: data.text,
          quickActions: actions,
        };
      }
    }
  } catch (err) {
    console.warn("DeepSeek API call failed, falling back to local Knowledge Base:", err);
  }

  // ==========================================
  // FALLBACK KNOWLEDGE ENGINE (IF OFFLINE)
  // ==========================================
  if (query.includes("biaya") || query.includes("harga") || query.includes("paket") || query.includes("umroh")) {
    return {
      text: `🕋 **Paket Umroh & Haji Soraya Tour (Bintang 5):**\n\n1. **Umroh Reguler 9 Hari (Bintang 5):** Rp 29.500.000 / pax (Pullman Zamzam Makkah & Dar Al Taqwa Madinah)\n2. **Umroh Plus Turki 12 Hari:** Rp 38.500.000 / pax (Umroh + Istanbul & Cappadocia)\n3. **Haji Khusus Furoda (Tanpa Antre):** Konsultasi Langsung CS WhatsApp.\n\nFasilitas Include: Tiket Pesawat PP Direct, Hotel *5 Depan Masjid, Ustaz Mutawwif, Visa, & Perlengkapan Koper Full Set.`,
      quickActions: [
        { label: "📲 Daftar via WA", action: "Saya ingin daftar Paket Umroh" },
        { label: "📋 Syarat Pendaftaran", action: "Apa saja syarat pendaftaran Umroh?" },
      ],
    };
  }

  return {
    text: `Assalamu'alaikum! Saya **Soraya AI Assistant** 🕋.\n\nSoraya Tour adalah Biro Perjalanan Ibadah Umroh & Haji Khusus Resmi Kemenag RI dengan akomodasi Bintang 5 terdekat Masjidil Haram & Nabawi.\n\nAda yang bisa saya bantu terkait jadwal pendaftaran atau rincian fasilitas ibadah?`,
    quickActions: [
      { label: "🕋 Paket Umroh VIP", action: "Berapa biaya paket Umroh Bintang 5?" },
      { label: "📲 CS WhatsApp", action: "Konsultasi CS WhatsApp" },
    ],
  };
}
