import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config/config.js';

const uploadDirFunc = () => {
  if (!fs.existsSync(config.paths.uploadDir)) fs.mkdirSync(config.paths.uploadDir);
  if (!fs.existsSync(config.paths.convertedDir)) fs.mkdirSync(config.paths.convertedDir);
  return config.paths.uploadDir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirFunc()),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomBytes(10).toString('hex') + ext;
    cb(null, randomName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!config.AllowFileExtentions.includes(ext)) {
    return cb(new Error(`Недопустимый формат файла: ${ext}`), false);
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: config.multer.fileSizeLimit },
  fileFilter,
});
