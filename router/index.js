import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/upload', upload.single('video'), (req, res) => {
  res.json('upload');
});
router.get('/download/:filename', (req, res) => {
  res.json(req.params);
});

export default router;
