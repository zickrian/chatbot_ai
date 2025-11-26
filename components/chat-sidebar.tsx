import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, ScanEye, X } from "lucide-react";

interface ChatSidebarProps {
  onNewChat: () => void;
  onDownload: () => void;
  onObjectDetection: () => void;
  isOpen: boolean;
  onClose: () => void;
  currentMode: 'chat' | 'object-detection';
}

export function ChatSidebar({ onNewChat, onDownload, onObjectDetection, isOpen, onClose, currentMode }: ChatSidebarProps) {
  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:relative
          w-64 sm:w-72 
          flex flex-col h-screen
          z-40
          border-r transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}
      >

        <div className="p-4 sm:p-5 flex items-center gap-3 relative z-10 flex-shrink-0 border-b" style={{ borderColor: '#E5E7EB' }}>
          <img
            src="/Untitled-design.png"
            alt="Polsek Rembang Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base sm:text-lg leading-tight tracking-tight truncate" style={{ color: '#374151' }}>Polsek Rembang</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider" style={{ color: '#9CA3AF' }}>Virtual Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 flex-shrink-0 hover:bg-gray-100"
            style={{ color: '#374151' }}
            onClick={onClose}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <div className="p-3 sm:p-4 relative z-10 flex-shrink-0">
          <Button
            onClick={onNewChat}
            className={`w-full justify-start gap-2 sm:gap-3 transition-all duration-200 font-medium py-5 sm:py-6 text-sm sm:text-base rounded-xl border ${
              currentMode === 'chat' 
                ? 'shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
            style={currentMode === 'chat' 
              ? { backgroundColor: '#F3F4F6', color: '#374151', borderColor: '#E5E7EB' } 
              : { backgroundColor: 'transparent', color: '#6B7280', borderColor: '#E5E7EB' }
            }
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: currentMode === 'chat' ? '#0f4c92' : '#E5E7EB' }}>
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: currentMode === 'chat' ? '#FFFFFF' : '#6B7280' }} />
            </div>
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-3 sm:px-4">
          <div className="space-y-6 sm:space-y-8 py-2 pb-4">

            {/* Actions Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest px-2 sm:px-3 flex items-center gap-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
                Actions
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 sm:gap-3 transition-colors h-9 sm:h-10 text-xs sm:text-sm rounded-lg hover:bg-gray-100"
                  style={{ color: '#374151' }}
                  onClick={onDownload}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#6B7280' }} />
                  <span className="truncate font-medium">Download Transcript</span>
                </Button>
              </div>
            </div>

            {/* YOLO Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest px-2 sm:px-3 flex items-center gap-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
                Experiment
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 sm:gap-3 transition-all h-9 sm:h-10 text-xs sm:text-sm rounded-lg ${
                    currentMode === 'object-detection'
                      ? 'font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                  style={currentMode === 'object-detection' 
                    ? { backgroundColor: '#EFF6FF', color: '#0f4c92' } 
                    : { color: '#374151' }
                  }
                  onClick={onObjectDetection}
                >
                  <ScanEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: currentMode === 'object-detection' ? '#0f4c92' : '#6B7280' }} />
                  <span className="truncate font-medium">Object Detection</span>
                </Button>
              </div>
            </div>



          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 text-[9px] sm:text-[10px] text-center mt-auto flex-shrink-0 border-t" style={{ color: '#9CA3AF', borderColor: '#E5E7EB' }}>
          <p>&copy; 2025 Polsek Rembang. All rights reserved.</p>
        </div>
      </aside>
    </>
  );
}
