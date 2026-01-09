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
- API Key Google Gemini (dapatkan dari [Google AI Studio](https://aistudio.google.com/apikey))

## Instalasi
1. Clone repositori
2. Install dependencies:
```bash
npm install
```
3. Buat file `.env.local` dan tambahkan API key:
```bash
cp .env.example .env.local
```
4. Edit file `.env.local` dan isi dengan API key Anda:
```
GOOGLE_GENAI_API_KEY=your_actual_api_key_here
```

## Menjalankan Aplikasi
```bash
npm run dev
```
Buka http://localhost:3000 di browser

## Testing Aplikasi
Untuk menguji aplikasi chatbot:

1. **Pastikan API Key sudah dikonfigurasi** di file `.env.local`
2. **Jalankan development server**: `npm run dev`
3. **Buka browser** di http://localhost:3000
4. **Test fitur chat**:
   - Ketik pesan sederhana seperti "Halo"
   - Chatbot seharusnya merespons dengan sapaan
5. **Test dengan pertanyaan spesifik**:
   - "Bagaimana cara membuat SKCK?"
   - "Apa syarat membuat SIM?"
   - "Jam buka Polsek?"

**Troubleshooting:**
- Jika muncul error "API key tidak valid" → Periksa file `.env.local` dan pastikan API key benar
- Jika muncul error "Tidak dapat terhubung" → Periksa koneksi internet
- Jika build gagal → Hapus folder `.next` dan `node_modules`, lalu jalankan `npm install` ulang

## Model AI
Aplikasi menggunakan:
- YOLOv8n (yolov8n.pt) untuk deteksi objek
- ONNX Runtime untuk inferensi di browser

## Konfigurasi
File konfigurasi penting:
- `next.config.ts` - Konfigurasi Next.js
- `postcss.config.mjs` - Konfigurasi PostCSS
- `tsconfig.json` - Konfigurasi TypeScript
