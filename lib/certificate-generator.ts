import { jsPDF } from "jspdf";

interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: Date;
  certificateId: string;
}

export async function generateCertificate(
  data: CertificateData
): Promise<Buffer> {
  // Create PDF in landscape A4
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color
  doc.setFillColor(248, 249, 250);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(147, 197, 253);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Title
  doc.setFontSize(48);
  doc.setTextColor(30, 64, 175);
  doc.text("Certificate of Completion", pageWidth / 2, 50, {
    align: "center",
  });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.text("This is to certify that", pageWidth / 2, 70, { align: "center" });

  // Student name
  doc.setFontSize(32);
  doc.setTextColor(15, 23, 42);
  doc.text(data.studentName, pageWidth / 2, 90, { align: "center" });

  // Course completion text
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "has successfully completed the course",
    pageWidth / 2,
    105,
    { align: "center" }
  );

  // Course name
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text(data.courseName, pageWidth / 2, 125, { align: "center" });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Completed on ${data.completionDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    pageWidth / 2,
    140,
    { align: "center" }
  );

  // Footer - Kingdom Way Academy
  doc.setFontSize(18);
  doc.setTextColor(30, 64, 175);
  doc.text("Kingdom Way Academy", pageWidth / 2, 170, { align: "center" });

  // Certificate ID
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text(`Certificate ID: ${data.certificateId}`, pageWidth / 2, 185, {
    align: "center",
  });

  // Convert to buffer
  const pdfData = doc.output("arraybuffer");
  return Buffer.from(pdfData);
}
