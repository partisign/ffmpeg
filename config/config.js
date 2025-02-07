import path from 'path';

export const config = {
  paths: {
    uploadDir: path.resolve('./upload'),
    convertedDir: path.resolve('./converted'),
    workerPath: path.resolve('./workers/convert.worker.js'),
  },
  multer: {
    fileSizeLimit: 2000 * 1024 * 1024,
  },
  AllowFileExtentions: ['mov'],
};
