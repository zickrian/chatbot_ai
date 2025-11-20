import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, History, ScanEye, X } from "lucide-react";

interface ChatSidebarProps {
  onNewChat: () => void;
  onDownload: () => void;
  onObjectDetection: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ onNewChat, onDownload, onObjectDetection, isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:relative
          w-64 sm:w-72 text-sidebar-foreground 
          flex flex-col h-screen
          z-40
          border-r-0 shadow-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: '#334155' }}
      >

        <div className="p-4 sm:p-5 flex items-center gap-3 relative z-10 flex-shrink-0">
          <img
            src="https://i.postimg.cc/wxyGpGKG/Untitled-design.png"
            alt="Polsek Rembang Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight truncate">Polsek Rembang</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[9px] sm:text-[10px] font-medium text-sidebar-foreground/80 uppercase tracking-wider">Virtual Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 h-8 w-8 flex-shrink-0"
            onClick={onClose}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <div className="p-3 sm:p-4 relative z-10 flex-shrink-0">
          <Button
            onClick={onNewChat}
            className="w-full justify-start gap-2 sm:gap-3 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-5 sm:py-6 text-sm sm:text-base rounded-xl border-0"
            style={{ background: 'linear-gradient(135deg, #ff6b4a 0%, #ff8c6b 100%)' }}
          >
            <div className="bg-white/20 p-1 rounded-md">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-3 sm:px-4">
          <div className="space-y-6 sm:space-y-8 py-2 pb-4">

            {/* Actions Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] sm:text-xs font-bold text-sidebar-foreground/40 uppercase tracking-widest px-2 sm:px-3 flex items-center gap-2">
                Actions
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 sm:gap-3 text-sidebar-foreground/90 hover:bg-white/10 hover:text-white transition-colors h-9 sm:h-10 text-xs sm:text-sm rounded-lg"
                  onClick={onDownload}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
                  <span className="truncate">Download Transcript</span>
                </Button>
              </div>
            </div>

            {/* YOLO Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] sm:text-xs font-bold text-sidebar-foreground/40 uppercase tracking-widest px-2 sm:px-3 flex items-center gap-2">
                Systems
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 sm:gap-3 text-sidebar-foreground/90 hover:bg-white/10 hover:text-white transition-colors h-9 sm:h-10 text-xs sm:text-sm rounded-lg"
                  onClick={onObjectDetection}
                >
                  <ScanEye className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
                  <span className="truncate">Object Detection</span>
                </Button>
              </div>
            </div>

            {/* History Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] sm:text-xs font-bold text-sidebar-foreground/40 uppercase tracking-widest px-2 sm:px-3 flex items-center gap-2">
                History
              </h3>
              <div className="px-2 sm:px-3 py-6 sm:py-8 text-center">
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/5">
                  <History className="w-6 h-6 sm:w-8 sm:h-8 text-sidebar-foreground/20 mx-auto mb-2" />
                  <p className="text-[10px] sm:text-xs text-sidebar-foreground/40">No chat history available</p>
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 text-[9px] sm:text-[10px] text-center text-sidebar-foreground/30 mt-auto flex-shrink-0">
          <p>&copy; 2025 Polsek Rembang. All rights reserved.</p>
        </div>
      </aside>
    </>
  );
}
