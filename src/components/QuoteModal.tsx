import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, RefreshCw, Heart, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingQuote } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: WeddingQuote[];
  currentIndex: number;
  onNextQuote: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  quotes,
  currentIndex,
  onNextQuote,
}) => {
  const currentQuote = quotes[currentIndex] || quotes[0];

  const handleNextWithConfetti = () => {
    onNextQuote();
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E6CA92', '#FFF8DC', '#C59B27'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="quote-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2C2623]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#FFFCF7] border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 text-center z-10"
            id="quote-modal-card"
          >
            {/* Elegant corner ornament lines */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg pointer-events-none" />

            {/* Close Button */}
            <button
              id="quote-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[#8C7A6B] hover:text-[#2C2623] hover:bg-[#F2EADB] transition-colors focus:outline-none"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon Header */}
            <div className="mx-auto w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-[#FAF3E0] to-[#F5E5C9] border border-[#D4AF37]/40 flex items-center justify-center shadow-inner">
              <Sparkles className="w-7 h-7 text-[#B8860B]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30 text-xs font-semibold text-[#8B6508] mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Hochzeitsspruch & Weisheit</span>
            </div>

            {/* Quote content */}
            <div className="my-5 relative px-3 py-2">
              <Quote className="w-8 h-8 text-[#D4AF37]/25 mx-auto mb-2 rotate-180" />
              <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#2C2623]">
                "{currentQuote.text}"
              </blockquote>
              <div className="mt-4 font-sans text-sm font-medium tracking-wide text-[#8C7A6B]">
                — {currentQuote.author}
              </div>
            </div>

            {/* Category tag */}
            <div className="text-xs text-[#A89887] mb-6">
              Kategorie: <span className="text-[#8B6508] font-medium">{currentQuote.category}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="quote-next-btn"
                onClick={handleNextWithConfetti}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C785] to-[#B8860B] text-white font-medium text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Nächster Spruch</span>
              </button>

              <button
                id="quote-close-action-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-[#FAF7F0] text-[#5C4A3A] hover:bg-[#F2EADB] font-medium text-sm transition-colors"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
