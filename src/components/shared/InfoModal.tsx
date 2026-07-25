import { useEffect } from 'react';
import { X, Info } from 'lucide-react';

interface InfoModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function InfoModal({ title, message, onClose }: InfoModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#0E1319] border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg border flex items-center justify-center text-amber-400 bg-amber-400/10 border-amber-400/20">
              <Info className="w-4 h-4" />
            </div>
            <h3 id="info-modal-title" className="text-sm font-semibold text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full text-xs font-medium px-3 py-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}