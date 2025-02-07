import { DownloadService } from '../services/download.service.js';

export class DownloadController {
  constructor(downloadService = new DownloadService()) {
    this.downloadService = downloadService;
    this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile(req, res) {
    const { filePath, error } = this.downloadService.downloadFile(req.params.filename);
    if (error) return res.status(404).json({ error });

    res.download(filePath, (err) => {
      if (!err) this.downloadService.deleteFile(filePath);
    });
  }
}
