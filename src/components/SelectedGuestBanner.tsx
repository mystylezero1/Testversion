import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, X, ArrowRight, UserCheck, Volume2, Heart } from 'lucide-react';
import { Guest } from '../types';
import { formatGuestDisplayName } from '../utils/nameHelper';

interface SelectedGuestBannerProps {
  selectedGuest: Guest | null;
  allGuests?: Guest[];
  welcomeSpeech?: string | null;
  onReplaySpeech?: () => void;
  onClear: () => void;
}

export const SelectedGuestBanner: React.FC<SelectedGuestBannerProps> = ({
  selectedGuest,
  allGuests = [],
  welcomeSpeech,
  onReplaySpeech,
  onClear,
}) => {
  const displayName = selectedGuest ? formatGuestDisplayName(selectedGuest, allGuests) : '';

  return (
    <div id="target-guest-container" className="w-full max-w-3xl mx-auto my-4 transition-all">
      <AnimatePresence mode="wait">
        {selectedGuest ? (
          <motion.div
            key="guest-found"
            id="target-guest-card"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E6] to-[#FFF8EA] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-xl text-center"
          >
            {/* Background decorative glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Clear selection button */}
            <button
              id="clear-guest-btn"
              type="button"
              onClick={onClear}
              className="absolute top-3.5 right-3.5 p-2 rounded-full text-[#8C7A6B] hover:text-[#2C2623] hover:bg-[#EEDCBA]/60 transition-colors cursor-pointer"
              title="Auswahl aufheben"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEDCBA]/70 border border-[#D4AF37]/40 text-xs font-semibold text-[#7D5B08] mb-2 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Gefundener Platz • Hochzeit Anja & Dino</span>
            </div>

            {/* Target Guest Info: `${guestName} ➔ ${tableName}` */}
            <h3
              id="target-guest-info"
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C2623] flex items-center justify-center flex-wrap gap-2 leading-tight mt-1"
            >
              <span className="text-[#8B6508]">{displayName}</span>
              <ArrowRight className="w-6 h-6 text-[#B8860B] inline-block mx-1 animate-pulse" />
              <span className="text-[#2C2623]">{selectedGuest.tableName}</span>
            </h3>

            {/* Target Seat Info */}
            <div
              id="target-seat-info"
              className="mt-2 text-sm sm:text-base font-semibold text-[#5C4A3A] flex flex-wrap items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span>Herzlich willkommen! Zum Tisch wird jetzt herangezoomt.</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/95 text-xs font-bold text-[#8B6508] border border-[#D4AF37]/60 shadow-2xs ml-1">
                Sitz #{selectedGuest.globalSeat || selectedGuest.seat}
              </span>
            </div>

            {/* Spoken Rotating Welcome Message Bubble */}
            {welcomeSpeech && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3.5 p-3 rounded-2xl bg-white/90 border border-[#D4AF37]/40 text-[#4A3728] text-xs sm:text-sm font-medium shadow-xs max-w-xl mx-auto flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-start gap-2 flex-1">
                  <Heart className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">
                    „{welcomeSpeech}“
                  </p>
                </div>

                {onReplaySpeech && (
                  <button
                    type="button"
                    onClick={onReplaySpeech}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6C4] border border-[#D4AF37]/60 text-[#8B6508] font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
                    title="Willkommensspruch nochmals anhören"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span className="hidden sm:inline">Audio</span>
                  </button>
                )}
              </motion.div>
            )}

            {/* Additional info tags */}
            {selectedGuest.group && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-[11px] text-[#8C7A6B] bg-white/80 px-3 py-1 rounded-full border border-[#E8DFC9] shadow-2xs">
                  Gästegruppe: {selectedGuest.group}
                </span>
                {selectedGuest.notes && (
                  <span className="text-[11px] text-[#8C7A6B] bg-white/80 px-3 py-1 rounded-full border border-[#E8DFC9] shadow-2xs">
                    {selectedGuest.notes}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="guest-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-2"
          >
            <h3 id="target-guest-info" className="font-serif text-xl sm:text-2xl font-bold text-[#2C2623]">
              Saalplan & Tischübersicht
            </h3>
            <div id="target-seat-info" className="text-xs text-[#8C7A6B] mt-1 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Gib oben deinen Namen ein – die App zoomt direkt zu deinem Tisch und begrüßt dich per Audio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
