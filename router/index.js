import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { UploadController } from '../controllers/upload.controller.js';
import { DownloadController } from '../controllers/download.controller.js';
const router = express.Router();

const uploadController = new UploadController();
const downloadController = new DownloadController();

router.post('/upload', upload.single('video'), uploadController.uploadVideo);
router.get('/download/:filename', downloadController.downloadFile);

export default router;
