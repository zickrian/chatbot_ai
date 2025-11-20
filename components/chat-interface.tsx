import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
  isLoading?: boolean;
  onToggleSidebar: () => void;
}

export function ChatInterface({ messages, input, setInput, onSendMessage, isLoading, onToggleSidebar }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden" style={{ backgroundColor: '#f5f6f8' }}>
      {/* Header */}
      <header className="h-14 sm:h-16 flex items-center px-3 sm:px-6 bg-white/80 backdrop-blur-md z-10 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-1 sm:mr-2 h-8 w-8 sm:h-10 sm:w-10"
          onClick={onToggleSidebar}
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-3 sm:p-6 py-4 sm:py-8">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 py-12 sm:py-20 px-4">
              <img 
                src="/Untitled-design.png" 
                alt="Polsek Rembang Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto mb-4 sm:mb-6 shadow-lg"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">Selamat Datang</h3>
              <p className="max-w-md mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
                Saya adalah asisten virtual Polsek Rembang. Silakan sampaikan pertanyaan Anda terkait layanan kepolisian.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] group",
                message.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              {message.role === 'assistant' ? (
                <img 
                  src="/Untitled-design.png" 
                  alt="Logo" 
                  className="h-7 w-7 sm:h-9 sm:w-9 mt-1 rounded-full object-cover shadow-sm transition-transform group-hover:scale-105 flex-shrink-0"
                />
              ) : (
                <Avatar className="h-7 w-7 sm:h-9 sm:w-9 mt-1 border-2 shadow-sm transition-transform group-hover:scale-105 flex-shrink-0 border-slate-200">
                  <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-600">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn(
                "rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3.5 text-sm shadow-sm relative",
                message.role === 'user'
                  ? "rounded-tr-sm"
                  : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-slate-200/50"
              )}
                style={message.role === 'user' ? { backgroundColor: '#fef3e8', color: '#1a1f2e' } : {}}
              >
                <p className="leading-6 sm:leading-7 whitespace-pre-wrap text-[13px] sm:text-sm">{message.content}</p>
                <span className={cn(
                  "text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 block font-medium",
                  message.role === 'user' ? "opacity-60" : "text-slate-400"
                )}
                  style={message.role === 'user' ? { color: '#1a1f2e' } : {}}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%]">
              <img 
                src="/Untitled-design.png" 
                alt="Logo" 
                className="h-7 w-7 sm:h-9 sm:w-9 mt-1 rounded-full object-cover shadow-sm flex-shrink-0"
              />
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 sm:px-6 sm:py-5 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: '#ff6b4a', opacity: 0.4 }}></span>
                  <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: '#ff6b4a', opacity: 0.4 }}></span>
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#ff6b4a', opacity: 0.4 }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 sm:p-4 md:p-5 bg-white flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 pl-4 pr-4 py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-sm border-slate-300 focus-visible:ring-2 text-sm sm:text-base bg-white"
              style={{ '--tw-ring-color': 'rgba(255, 107, 74, 0.3)', borderColor: '#e5e7eb' } as React.CSSProperties}
            />
            <div className="flex gap-2 flex-shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl h-11 w-11 sm:h-12 sm:w-12 hover:bg-slate-100 text-slate-500 transition-colors"
                title="Voice Input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </Button>
              <Button
                size="icon"
                className="rounded-xl h-11 w-11 sm:h-12 sm:w-12 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-0"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #ff6b4a 0%, #ff8c6b 100%)' : 'rgb(226, 232, 240)',
                  color: input.trim() ? 'white' : 'rgb(148, 163, 184)'
                }}
                onClick={onSendMessage}
                disabled={!input.trim() || isLoading}
                title="Send Message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
