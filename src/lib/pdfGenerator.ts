import jsPDF from "jspdf";

export interface PDFItineraryData {
  title: string;
  destination: string;
  duration: string;
  passengerCount: number;
  tripStyle: string;
  pricePerPerson: number;
  totalPrice: number;
  downPayment: number;
  recommendedVehicle: string;
  highlights: string[];
  dayByDay: { day: string; title: string; activities: string[] }[];
}

/**
 * Generates an ultra-crisp, corporate-grade PDF brochure & itinerary for Mustika Travel
 */
export function generateItineraryPDF(data: PDFItineraryData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // COLOR PALETTE
  const primaryNavy = [30, 41, 59];     // #1E293B
  const brandBlue = [64, 115, 167];     // #4073A7
  const accentOrange = [249, 115, 22];  // #F97316
  const bgLight = [248, 250, 252];      // #F8FAFC
  const borderSlate = [226, 232, 240];  // #E2E8F0
  const textDark = [15, 23, 42];        // #0F172A
  const textMuted = [100, 116, 139];   // #64748B
  const emeraldGreen = [5, 150, 105];   // #059669

  // ==========================================
  // 1. BRANDED HEADER BANNER
  // ==========================================
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 32, "F");

  // Accent Orange Strip at top
  doc.setFillColor(accentOrange[0], accentOrange[1], accentOrange[2]);
  doc.rect(0, 0, pageWidth, 3, "F");

  // Header Brand
  doc.setTextColor(212, 175, 55); // Gold
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SORAYA TOUR", margin, 16);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(140, 120, 80);
  doc.text("BIRO PERJALANAN IBADAH HAJI & UMROH BINTANG 5", margin, 21);

  // Document Badge Right Side
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("BROSUR & ITINERARY RESMI", pageWidth - margin, 15, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  const docRef = `REF: MT-${Date.now().toString().slice(-6)}`;
  doc.text(docRef, pageWidth - margin, 21, { align: "right" });
  doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, pageWidth - margin, 26, { align: "right" });

  let y = 38;

  // ==========================================
  // 2. PACKAGE TITLE BANNER
  // ==========================================
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderSlate[0], borderSlate[1], borderSlate[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, "FD");

  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(data.title.toUpperCase(), margin + 5, y + 10.5);

  y += 22;

  // ==========================================
  // 3. OVERVIEW & FINANCIAL CARDS (2-COLUMN GRID)
  // ==========================================
  const colWidth = (contentWidth - 6) / 2;

  // Left Card: Trip Overview
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderSlate[0], borderSlate[1], borderSlate[2]);
  doc.roundedRect(margin, y, colWidth, 42, 2, 2, "FD");

  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.rect(margin, y, colWidth, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("INFORMASI PERJALANAN", margin + 4, y + 4.8);

  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  const leftItems = [
    { label: "Destinasi Tour", val: data.destination },
    { label: "Durasi Trip", val: data.duration },
    { label: "Gaya / Kelas", val: data.tripStyle },
    { label: "Jumlah Peserta", val: `${data.passengerCount} Orang` },
    { label: "Rekomendasi Armada", val: data.recommendedVehicle },
  ];

  let leftY = y + 13;
  leftItems.forEach((item) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`${item.label}:`, margin + 4, leftY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(item.val, margin + 40, leftY);
    leftY += 6;
  });

  // Right Card: Financial & DP Summary
  const rightX = margin + colWidth + 6;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.roundedRect(rightX, y, colWidth, 42, 2, 2, "FD");

  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.rect(rightX, y, colWidth, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("RINCIAN BIAYA & PEMBAYARAN", rightX + 4, y + 4.8);

  let rightY = y + 14;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("Estimasi Per Orang:", rightX + 4, rightY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Rp ${data.pricePerPerson.toLocaleString("id-ID")}`, rightX + colWidth - 4, rightY, { align: "right" });

  rightY += 8;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Total (${data.passengerCount} Orang):`, rightX + 4, rightY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.text(`Rp ${data.totalPrice.toLocaleString("id-ID")}`, rightX + colWidth - 4, rightY, { align: "right" });

  // Down Payment Badge Box
  rightY += 6;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(rightX + 3, rightY, colWidth - 6, 10, 1.5, 1.5, "FD");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(185, 28, 28);
  doc.text("DP WAJIB (30%):", rightX + 6, rightY + 6.5);
  doc.setFontSize(10);
  doc.text(`Rp ${data.downPayment.toLocaleString("id-ID")}`, rightX + colWidth - 6, rightY + 6.5, { align: "right" });

  y += 48;

  // ==========================================
  // 4. DAY-BY-DAY RUNDOWN TIMELINE
  // ==========================================
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text("JADWAL PERJALANAN & ITINERARY (RUNDOWN)", margin, y);

  doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, y + 2, margin + 85, y + 2);

  y += 9;

  data.dayByDay.forEach((dayInfo) => {
    // Check if new page is needed
    if (y > pageHeight - 45) {
      doc.addPage();
      y = 20;
    }

    // Day Header Pill Badge
    doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.roundedRect(margin, y, 22, 6, 1, 1, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(dayInfo.day.toUpperCase(), margin + 11, y + 4.2, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(dayInfo.title, margin + 26, y + 4.5);

    y += 9;

    // Activities List
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);

    dayInfo.activities.forEach((act) => {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }

      const splitLines = doc.splitTextToSize(`•  ${act}`, contentWidth - 8);
      splitLines.forEach((line: string) => {
        doc.text(line, margin + 4, y);
        y += 4.8;
      });
    });

    y += 3;
  });

  y += 2;

  // ==========================================
  // 5. INCLUDED FACILITIES (2-COLUMN CHECKLIST)
  // ==========================================
  if (data.highlights && data.highlights.length > 0) {
    if (y > pageHeight - 50) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text("FASILITAS SUDAH TERMASUK (INCLUDE):", margin, y);

    doc.setDrawColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
    doc.setLineWidth(0.6);
    doc.line(margin, y + 2, margin + 70, y + 2);

    y += 8;

    const halfLength = Math.ceil(data.highlights.length / 2);
    const col1 = data.highlights.slice(0, halfLength);
    const col2 = data.highlights.slice(halfLength);

    const startY = y;
    let y1 = startY;
    let y2 = startY;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);

    col1.forEach((h) => {
      doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
      doc.setFont("helvetica", "bold");
      doc.text("[v]", margin + 2, y1);

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont("helvetica", "normal");
      doc.text(h, margin + 8, y1);
      y1 += 5.5;
    });

    col2.forEach((h) => {
      doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
      doc.setFont("helvetica", "bold");
      doc.text("[v]", margin + 95, y2);

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont("helvetica", "normal");
      doc.text(h, margin + 101, y2);
      y2 += 5.5;
    });

    y = Math.max(y1, y2) + 6;
  }

  // ==========================================
  // 6. OFFICIAL VERIFICATION STAMP & TERMS
  // ==========================================
  if (y > pageHeight - 38) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderSlate[0], borderSlate[1], borderSlate[2]);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text("DOKUMEN RESMI TERVERIFIKASI - MUSTIKA TRAVEL JOMBANG", margin + 4, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("Jadwal dan harga bersifat fleksibel & dapat dikustomisasi sesuai permintaan pemesan. Reservasi sah setelah konfirmasi DP 30%.", margin + 4, y + 10);

  // ==========================================
  // 7. FOOTER BANNER
  // ==========================================
  const footerY = pageHeight - 14;
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, footerY, pageWidth, 14, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("SORAYA TOUR", margin, footerY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(140, 120, 80);
  doc.text("Travel Haji & Umroh VIP  |  WA CS: 0812-3456-789  |  info@sorayatour.com", margin, footerY + 10);

  doc.setFont("helvetica", "bold");
  doc.text("www.sorayatour.com", pageWidth - margin, footerY + 8, { align: "right" });

  const filename = `Itinerary_SorayaTour_${data.destination.replace(/\s+/g, "_")}.pdf`;
  doc.save(filename);
}
