# Polsek Chatbot Application

Aplikasi chatbot cerdas untuk kepolisian sektor dengan fitur deteksi objek berbasis AI.

## Fitur Utama
- Antarmuka chat interaktif
- Deteksi objek real-time menggunakan model YOLOv8
- Integrasi ONNX Runtime untuk inferensi AI
- Komponen UI modern dengan shadcn/ui

## Struktur Direktori
```
├── app/               # Halaman Next.js
│   ├── api/chat/      # Endpoint API untuk fitur chat
│   ├── layout.tsx     # Layout utama
│   └── page.tsx       # Halaman utama
├── components/        # Komponen UI
│   ├── chat-*         # Komponen chat
│   ├── object-detection.tsx # Deteksi objek
│   └── ui/            # Komponen shadcn/ui
├── lib/               # Utilities
├── public/            # Aset statis
│   ├── models/        # Model AI (YOLO, ONNX)
│   └── *.svg          # Ikon dan gambar
```

## Prasyarat
- Node.js v18+
- npm v9+

## Instalasi
1. Clone repositori
2. Install dependencies:
```bash
npm install
```

## Menjalankan Aplikasi
```bash
npm run dev
```
Buka http://localhost:3000 di browser

## Model AI
Aplikasi menggunakan:
- YOLOv8n (yolov8n.pt) untuk deteksi objek
- ONNX Runtime untuk inferensi di browser

## Konfigurasi
File konfigurasi penting:
- `next.config.ts` - Konfigurasi Next.js
- `postcss.config.mjs` - Konfigurasi PostCSS
- `tsconfig.json` - Konfigurasi TypeScript
