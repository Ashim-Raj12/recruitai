import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

export const extractTextFromPDF = async (buffer, filename = '') => {
  try {
    const ext = filename.split('.').pop().toLowerCase();
    
    if (ext === 'docx' || ext === 'doc') {
      const result = await mammoth.extractRawText({ buffer: buffer });
      return result.value;
    } else {
      // Default to PDF
      const data = await pdfParse(buffer);
      return data.text;
    }
  } catch (error) {
    console.error('Error parsing document:', error);
    
    // Check if it's a known pdf-parse failure
    if (error.message && error.message.includes('Invalid PDF structure')) {
      throw new Error('The uploaded file is not a valid PDF or is corrupted. Please try saving it as a PDF again or upload a DOCX file.');
    }
    
    throw new Error('Failed to extract text from document. Please ensure it is a valid PDF or DOCX file.');
  }
};
