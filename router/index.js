import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { UploadController } from '../controllers/upload.controller.js';
const router = express.Router();

const uploadController = new UploadController();

router.post('/upload', upload.single('video'), uploadController.uploadVideo);
router.get('/download/:filename', (req, res) => {
  res.json(req.params);
});

export default router;
