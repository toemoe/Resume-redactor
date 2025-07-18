import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import pdfPic from '../assets/pdf-pic.svg';

interface DownloadPdfProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName: string;
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({ targetRef, fileName }) => {
  const handleDownloadPdf = async () => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      alert('Error generating PDF');
    }
  };

  return (
    <button onClick={handleDownloadPdf} title="Скачать PDF" className='download-pdf'>
      <img src={pdfPic} alt="Download PDF" />
    </button>
  );
};

export default DownloadPdf;
