import path from 'path';

export const config = {
  paths: {
    uploadDir: path.resolve('./upload'),
    convertedDir: path.resolve('./converted'),
  },
  multer: {
    fileSizeLimit: 2000 * 1024 * 1024,
  },
  AllowFileExtentions: ['mov'],
};
