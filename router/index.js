import express from 'express';
const router = express.Router();

router.post('/upload', (req, res) => {
  res.json('upload');
});
router.get('/download/:filename', (req, res) => {
  res.json(req.params);
});

export default router;
