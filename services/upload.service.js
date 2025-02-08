import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'node:os';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import { Worker } from 'worker_threads';
import { config } from '../config/config.js';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);
export class UploadService {
  constructor(uploadDir = config.paths.uploadDir, convertedDir = config.paths.convertedDir) {
    this.UPLOAD_DIR = uploadDir;
    this.CONVERTED_DIR = convertedDir;
    this.MAX_WORKERS = os.cpus().length;
    this.tasksQueue = [];
    this.workers = new Set();
  }

  checkVideoFormat(inputFile) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputFile, (err, metadata) => {
        if (err) {
          return reject(new Error(`Ошибка при анализе видео: ${err}`));
        }

        const format = metadata.format.format_name.split(',');
        const isValidFormat = format.some((f) => config.alowwedInputVideo.format.includes(f));

        if (!isValidFormat) {
          return reject(new Error(`Недопустимый формат видео`));
        }
        resolve();
      });
    });
  }

  async addTask(inputFile) {
    return new Promise((resolve, reject) => {
      const outputName = crypto.randomBytes(10).toString('hex') + '.mp4';
      const task = {
        inputFile,
        outputFile: outputName,
        uploadDir: this.UPLOAD_DIR,
        convertedDir: this.CONVERTED_DIR,
        resolve,
        reject,
      };
      this.tasksQueue.push(task);
      this.processQueue();
    });
  }

  processQueue() {
    while (this.workers.size < this.MAX_WORKERS && this.tasksQueue.length > 0) {
      const task = this.tasksQueue.shift();
      const worker_path = config.paths.workerPath;
      const worker = new Worker(worker_path);
      this.workers.add(worker);

      worker.postMessage({
        inputFile: task.inputFile,
        outputFile: task.outputFile,
        uploadDir: task.uploadDir,
        convertedDir: task.convertedDir,
      });

      worker.on('message', ({ inputFile, outputFile, error }) => {
        this.workers.delete(worker);

        if (error) {
          fs.unlink(path.join(this.UPLOAD_DIR, inputFile), () => {});
          task.reject(new Error(`Ошибка обработки файла: ${error}`));
        } else {
          fs.unlink(path.join(this.UPLOAD_DIR, inputFile), () => {});
          task.resolve(outputFile);
        }
        if (this.tasksQueue.length > 0) {
          this.processQueue();
        }
      });

      worker.on('error', (err) => {
        this.workers.delete(worker);
        console.error(`Ошибка воркера: ${err.message}`);
        task.reject(new Error(`Ошибка обработки файла: ${err.message}`));
      });
    }
  }
}
