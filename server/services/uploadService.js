import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'), false);
    }
  },
});

export const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const base64Data = buffer.toString('base64');
    const dataURI = `data:application/pdf;base64,${base64Data}`;
    
    cloudinary.uploader.upload(dataURI, {
      resource_type: 'image',
      public_id: `resumes/${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`,
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
