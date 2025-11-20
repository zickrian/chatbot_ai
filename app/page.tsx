"use client";

import React, { useState } from 'react';
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatInterface, Message } from "@/components/chat-interface";
import { jsPDF } from "jspdf";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Terima kasih atas laporannya. Bisa dijelaskan lebih detail mengenai kejadian tersebut?",
        "Baik, saya mengerti. Apakah ada saksi mata di lokasi kejadian?",
        "Untuk layanan SKCK, Anda bisa datang langsung ke Polsek pada jam kerja dengan membawa dokumen persyaratan.",
        "Mohon tunggu sebentar, saya sedang memproses informasi Anda.",
        "Siap, laporan Anda telah kami catat. Petugas kami akan segera menindaklanjuti."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleDownloadTranscript = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(15, 76, 146); // #0f4c92
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("POLSEK REMBANG", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Transkrip Chat Layanan Masyarakat", 20, 30);

    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);

    let y = 50;
    const pageHeight = doc.internal.pageSize.height;

    messages.forEach((msg) => {
      const role = msg.role === 'user' ? "PELAPOR" : "POLSEK REMBANG";
      const time = msg.timestamp.toLocaleTimeString();
      const header = `${role} [${time}]`;

      // Role Header
      doc.setFont("helvetica", "bold");
      if (msg.role === 'assistant') {
        doc.setTextColor(15, 76, 146); // #0f4c92
      } else {
        doc.setTextColor(100, 100, 100); // Gray
      }

      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.text(header, 20, y);
      y += 5;

      // Message Body
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      const splitText = doc.splitTextToSize(msg.content, 170);

      if (y + splitText.length * 5 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.text(splitText, 20, y);
      y += splitText.length * 5 + 10; // Spacing between messages
    });

    // Footer
    const date = new Date().toLocaleDateString();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Dicetak pada: ${date}`, 20, pageHeight - 10);

    doc.save(`transkrip-polsek-rembang-${Date.now()}.pdf`);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ChatSidebar
        onNewChat={handleNewChat}
        onDownload={handleDownloadTranscript}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4" style={{ backgroundColor: '#334155' }}>
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <ChatInterface
            messages={messages}
            input={input}
            setInput={setInput}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>
    </div>
  );
}
