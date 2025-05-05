import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import AddExpense from './AddExpense/AddExpense';

const ExpenseComponent = () => {
  const [ocrResult, setOcrResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        const worker = await createWorker('eng');
        const { data } = await worker.recognize(reader.result);
        setOcrResult(data.text);
        setLoading(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', gap: '1rem', padding: '1rem' }}>
      {/* Left: Bill Upload */}
      <div style={{ flex: 2, border: '1px solid #ccc', padding: '1rem' }}>
        <h2>Upload Bill</h2>
        <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
        {loading && <p>Processing...</p>}
        {ocrResult && (
          <>
            <h3>Extracted Text:</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{ocrResult}</pre>
          </>
        )}
      </div>

      {/* Right: Expense Form */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem' }}>
        <AddExpense />
      </div>
    </div>
  );
};

export default ExpenseComponent;
