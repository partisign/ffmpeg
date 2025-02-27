import path from 'path';
import { config } from '../config/config.js';
import { UploadService } from '../services/upload.service.js';

export class UploadController {
  constructor(uploadService = new UploadService()) {
    this.uploadService = uploadService;
    this.uploadVideo = this.uploadVideo.bind(this);
  }
  async uploadVideo(req, res) {
    if (!req.file) return res.status(500).json({ error: 'Файл не загружен' });
    const inputPath = path.join(config.paths.uploadDir, req.file.filename);
    try {
      await this.uploadService.checkVideoFormat(inputPath);
      const outputFile = await this.uploadService.addTask(req.file.filename);
      res.status(201).json({ downloadUrl: `/download/${outputFile}` });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
