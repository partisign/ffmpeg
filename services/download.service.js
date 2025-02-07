import path from 'path';
import fs from 'fs';
import { config } from '../config/config.js';

export class DownloadService {
  constructor(convertedDir = config.paths.convertedDir) {
    this.CONVERTED_DIR = convertedDir;
  }

  downloadFile(filename) {
    const filePath = path.join(this.CONVERTED_DIR, filename);
    if (!fs.existsSync(filePath)) return { error: 'Файл не найден', filePath: null };

    return { filePath };
  }

  deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Ошибка удаления файла: ${err.message}`);
    });
  }
}
