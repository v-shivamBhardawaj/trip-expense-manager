import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import AddReport from '../AddReport/AddReport';

// Set the workerSrc for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const AddOrUploadReport = () => {
  const [ocrResult, setOcrResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // OCR image (for scanned images only)
  const extractTextFromImage = async (imageDataUrl: string) => {
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(imageDataUrl);
    await worker.terminate();
    return data.text;
  };

  // Extract real text from PDF (no OCR)
  const extractTextFromPDF = async (pdfFile: File) => {
    const pdfData = new Uint8Array(await pdfFile.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    let combinedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => (item as any).str).join(' ');
      combinedText += `\n--- Page ${i} ---\n${pageText}`;
    }

    return combinedText;
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setOcrResult('');

    try {
      let extractedText = '';

      if (selectedFile.type === 'application/pdf') {
        // Use direct PDF text extraction
        extractedText = await extractTextFromPDF(selectedFile);
      } else if (selectedFile.type.startsWith('image/')) {
        // Use OCR for images
        const reader = new FileReader();
        extractedText = await new Promise<string>((resolve) => {
          reader.onload = async () => {
            if (typeof reader.result === 'string') {
              const text = await extractTextFromImage(reader.result);
              resolve(text);
            }
          };
          reader.readAsDataURL(selectedFile);
        });
      } else {
        extractedText = 'Unsupported file type.';
      }

      setOcrResult(extractedText);
    } catch (error) {
      console.error("Error extracting text:", error);
      setOcrResult("Failed to extract text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', gap: '1rem', padding: '1rem' }}>
      {/* Left: File Upload and Extracted Text */}
      <div style={{ flex: 2, border: '1px solid #ccc', padding: '1rem' }}>
        <h2>Upload Report</h2>
        <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
        {loading && <p>Processing...</p>}
        {ocrResult && (
          <>
            <h3>Extracted Text:</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{ocrResult}</pre>
          </>
        )}
      </div>

      {/* Right: Expense Report Form */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem' }}>
        <AddReport />
      </div>
    </div>
  );
};

export default AddOrUploadReport;
