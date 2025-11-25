import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Menu, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string; // base64 image data
}

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (image?: string, quickMessage?: string) => void;
  isLoading?: boolean;
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
}

// Quick Actions Component
interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    { label: '👮 Layanan Polisi', message: 'Saya ingin mengetahui layanan polisi yang tersedia' },
    { label: '📝 Lapor Kejadian', message: 'Saya ingin melaporkan kejadian' },
    { label: '📞 Hubungi Petugas', message: 'Saya ingin menghubungi petugas' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-3">
      {actions.map((action, index) => (
        <button
          key={index}
          className="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 hover:shadow-sm"
          style={{ 
            backgroundColor: '#FFFFFF', 
            color: '#374151', 
            borderColor: '#E5E7EB' 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
          onClick={() => onActionClick(action.message)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export function ChatInterface({ messages, input, setInput, onSendMessage, isLoading, onToggleSidebar, isSidebarOpen }: ChatInterfaceProps) {
  const [isListening, setIsListening] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);


  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setInput]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition tidak didukung di browser ini. Gunakan Chrome atau Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;
    onSendMessage(selectedImage || undefined);
    removeImage();
  };

  const handleQuickAction = (message: string) => {
    onSendMessage(undefined, message);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden relative" style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
      {/* Fixed Menu Button */}
      {messages.length > 0 && !isSidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-2 left-2 h-10 w-10 z-50 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
          onClick={onToggleSidebar}
        >
          <Menu className="w-5 h-5" style={{ color: '#374151' }} />
        </Button>
      )}
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-6 p-2 sm:p-6 py-3 sm:py-8">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-20 px-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden absolute top-2 left-2 h-9 w-9 z-10 hover:bg-gray-100"
                onClick={onToggleSidebar}
              >
                <Menu className="w-5 h-5" style={{ color: '#374151' }} />
              </Button>
              
              <img 
                src="/Untitled-design.png" 
                alt="Polsek Rembang Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto mb-4 sm:mb-6 shadow-lg"
              />
              
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3" style={{ color: '#374151' }}>Selamat Datang</h3>
              <p className="max-w-md mx-auto text-sm sm:text-base leading-relaxed" style={{ color: '#6B7280' }}>
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
                  className="h-7 w-7 sm:h-9 sm:w-9 mt-1 rounded-full object-cover shadow-sm transition-transform group-hover:scale-105 shrink-0"
                />
              ) : (
                <Avatar className="h-7 w-7 sm:h-9 sm:w-9 mt-1 shadow-sm transition-transform group-hover:scale-105 shrink-0" style={{ borderColor: '#E5E7EB', borderWidth: '2px' }}>
                  <AvatarFallback className="text-xs font-bold" style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn(
                "rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3.5 text-sm relative border",
                message.role === 'user' ? "rounded-tr-sm" : "rounded-tl-sm"
              )}
                style={{ backgroundColor: '#FFFFFF', color: '#374151', borderColor: '#E5E7EB' }}
              >
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="Uploaded" 
                    className="max-w-[200px] sm:max-w-[300px] rounded-lg mb-2"
                  />
                )}
                <p className="leading-6 sm:leading-7 whitespace-pre-wrap text-[13px] sm:text-sm">{message.content}</p>
                <span className="text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 block font-medium" style={{ color: '#9CA3AF' }}>
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
                className="h-7 w-7 sm:h-9 sm:w-9 mt-1 rounded-full object-cover shadow-sm shrink-0"
              />
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 sm:px-6 sm:py-5 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0f4c92', animationDelay: '-0.3s' }}></span>
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0f4c92', animationDelay: '-0.15s' }}></span>
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0f4c92' }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 sm:p-4 md:p-5 shrink-0" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-4xl mx-auto">
          {/* Input Container with Image Preview */}
          <div 
            className={cn(
              "relative border transition-all duration-200",
              imagePreview ? "rounded-2xl" : "rounded-full"
            )}
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {/* Image Preview - Inside container, expands upward */}
            {imagePreview && (
              <div className="p-3 pb-0">
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-24 sm:h-32 rounded-lg border object-cover" style={{ borderColor: '#E5E7EB' }} />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Input Row */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Image upload button */}
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-gray-100 shrink-0"
              title="Upload gambar"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#9CA3AF' }} />
            </Button>

            {/* Input field */}
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              className="flex-1 border-0 shadow-none focus-visible:ring-0 text-[16px] sm:text-base bg-transparent px-2"
              style={{ color: '#374151' }}
            />

            {/* Right buttons */}
            <div className="flex gap-1.5 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "rounded-full h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200",
                  isListening 
                    ? "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse" 
                    : "hover:bg-gray-100"
                )}
                style={!isListening ? { color: '#9CA3AF' } : {}}
                onClick={toggleListening}
                disabled={isLoading}
                title={isListening ? "Stop Recording" : "Voice Input"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </Button>
              <button
                type="button"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 border-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: (input.trim() || selectedImage) ? '#0f4c92' : '#E5E7EB',
                  color: (input.trim() || selectedImage) ? '#FFFFFF' : '#9CA3AF'
                }}
                onClick={handleSend}
                disabled={(!input.trim() && !selectedImage) || isLoading}
                title="Send Message"
              >
                <Send className="h-4 w-4 sm:h-4 sm:w-4" />
              </button>
            </div>
            </div>
          </div>

          {messages.length === 0 && <QuickActions onActionClick={handleQuickAction} />}
        </div>
      </div>
    </div>
  );
}
