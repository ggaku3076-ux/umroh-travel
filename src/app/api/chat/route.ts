import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, messages } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY || "sk-6nZhBm4RG8dL5Y40jGwLjw";
    const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
    const baseUrl = process.env.SUMOPOD_BASE_URL || "https://ai.sumopod.com/v1";

    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Missing Sumopod API Key" }, { status: 400 });
    }

    const systemPrompt = `Anda adalah Soraya AI Assistant 🕋, asisten virtual cerdas, ramah, dan islami dari Soraya Tour (Travel Haji & Umroh VIP Bintang 5).
Tugas Anda adalah memandu calon jamaah mengenai paket Umroh Reguler, Umroh Plus, Haji Khusus Furoda, fasilitas hotel Bintang 5, dan cara pendaftaran.

INFORMASI PENTING SORAYA TOUR:
- Izin Resmi: Penyelenggara Perjalanan Ibadah Umroh (PPIU) Resmi Kemenag RI
- Kantor Pusat: Jakarta & Surabaya, Indonesia (Layanan Konsultasi 24 Jam)
- Kontak WhatsApp Pendaftaran: 0812-3456-789
- Email Resmi: info@sorayatour.com

DAFTAR PAKET UMROH & HAJI VIP:
1. Paket Umroh Reguler Bintang 5 (9 Hari) - Rp 29.500.000 / jamaah (Hotel Pullman Zamzam Makkah & Dar Al Taqwa Madinah)
2. Paket Umroh Plus Turki Tulip (12 Hari) - Rp 38.500.000 / jamaah (Umroh + City Tour Istanbul & Cappadocia, Hotel *5)
3. Paket Umroh VIP Ramadan (10 Hari) - Rp 45.000.000 / jamaah (Akomodasi Terdekat Masjidil Haram 0 Meter)
4. Paket Haji Khusus / Furoda (Tanpa Antre) - Konsultasi Langsung via CS WhatsApp

FASILITAS VIP TERMASUK:
- Tiket Pesawat PP Direct Flight (Garuda Indonesia / Saudi Arabian Airlines)
- Hotel Bintang 5 Berjarak Dekat (Depan Masjidil Haram & Nabawi)
- Ustaz Mutawwif Pembimbing Ibadah Sesuai Sunnah
- Visa Umroh & Asuransi Perjalanan Full Cover
- Makan 3x Sehari Menu Indonesia Buffet
- Perlengkapan Umroh Premium (Koper Fiber, Kain Ihram/Mukena, Tas Paspor, Seragam Batik)

PETUNJUK RESPONS:
- Jawablah SELALU dalam BAHASA INDONESIA yang santun, islami, ramah, dan profesional.
- Sertakan salam seperti "Assalamu'alaikum Warahmatullahi Wabarakatuh" pada sapaan awal jika sesuai.
- Gunakan formatting markdown (bold, bullet list) agar rapi dan enak dibaca.
- Jika calon jamaah ingin berkonsultasi atau mendaftar, sarankan untuk menghubungi CS WhatsApp 0812-3456-789 atau mengisi form pendaftaran di halaman /booking.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []).slice(-4).map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: prompt },
    ];

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: response.status });
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "Maaf, terjadi kendala saat memproses jawaban AI.";

    return NextResponse.json({
      success: true,
      text: replyText,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Internal server error" }, { status: 500 });
  }
}
