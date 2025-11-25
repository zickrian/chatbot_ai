import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC5M18GvHPXj-heJYEjp7EK0rvOJe68njQ" });

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Polsek Rembang yang ramah, profesional, dan informatif. 

Tugas utamamu adalah membantu masyarakat dengan:
1. Memberikan informasi tentang layanan kepolisian
2. Menjelaskan prosedur pelaporan kejahatan atau kehilangan
3. Memberikan informasi kontak dan alamat Polsek Rembang
4. Memberikan edukasi tentang keamanan dan ketertiban masyarakat
5. Menjawab pertanyaan umum terkait hukum dan kepolisian

Panduan komunikasi:
- Gunakan bahasa Indonesia yang baik dan sopan
- Berikan jawaban yang jelas, ringkas, dan mudah dipahami
- Jika ada pertanyaan darurat, sarankan untuk menghubungi 110 atau datang langsung ke kantor polisi
- Untuk laporan kehilangan, jelaskan prosedur pembuatan surat keterangan kehilangan
- Jika pertanyaan di luar kapasitas, arahkan ke unit terkait atau sarankan datang langsung ke Polsek

Informasi Polsek Rembang:
- Alamat: Jl. Raya Rembang, Kecamatan Rembang
- Layanan: 24 jam untuk keadaan darurat
- Nomor darurat: 110

Selalu mulai dengan sapaan yang ramah jika ini adalah pesan pertama dari pengguna. Berikan emoji yang sesuai untuk membuat percakapan lebih ramah.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation history for context
    const chatHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })) || [];

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: 'user',
          parts: [{ text: 'Mulai percakapan dengan konteks ini: ' + SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Baik, saya siap membantu sebagai asisten virtual Polsek Rembang. Saya akan memberikan layanan yang ramah, profesional, dan informatif kepada masyarakat.' }],
        },
        ...chatHistory,
      ],
      config: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });
    const text = response.text;

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Maaf, terjadi kesalahan. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}
