import { parentPort } from 'worker_threads';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import path from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

parentPort.on('message', ({ inputFile, outputFile, uploadDir, convertedDir }) => {
  try {
    const inputPath = path.join(uploadDir, inputFile);
    const outputPath = path.join(convertedDir, outputFile);

    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => {
        parentPort.postMessage({ inputFile, outputFile });
        process.exit(0);
      })
      .on('error', (err) => {
        parentPort.postMessage({ inputFile, error: err.message });
        process.exit(1);
      })
      .run();
  } catch (error) {
    parentPort.postMessage({ inputFile, outputFile, error: error.message });
    process.exit(1);
  }
});
