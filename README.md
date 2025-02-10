# Voedo converter test task

Решение тестового задания
Сервис принимает видео файл .mov, новертирует его в .mp4 и возвращает ссылку для скачивания на конвертируемый файл.

## Установка

```
npm i
npm run start
```

## Эндпоинты

### POST /upload

принимает файл .mov в поле **_video_**, в случае успешной конвертации возвращает ссылку на скачивание сконевртированного видео

### GET /download/:fileNmae

отдает файл или ошибку, если файл не найден

## Структура проекта

```

ffmpeg/
│
├─ config/
│ └── config.js
│
├─ controllers/
│ ├── download.controller.js
│ └── upload.controller.js
│
├─ middlewares/
│ └── multer.middleware.js
│
├─ router/
│ └── index.js
│
├─ services/
│ ├── download.service.js
│ └── upload.service.js
│
├─ workers/
│ └── convert.worker.js
│
├ .gitignore
├  app.js
├  example.env
├  package-lock.json
├  package.json
└  README.md
```
