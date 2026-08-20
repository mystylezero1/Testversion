import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Car, ChevronUp, ChevronDown } from 'lucide-react';
import { TaxiService } from '../types';

interface TaxiRollupProps {
  isOpen: boolean;
  onToggle: () => void;
  services: TaxiService[];
}

export const TaxiRollup: React.FC<TaxiRollupProps> = ({
  isOpen,
  onToggle,
  services,
}) => {
  return (
    <div id="taxi-rollup-container" className="w-full max-w-4xl mx-auto my-4 transition-all duration-300">
      {/* Rollup Trigger Bar */}
      <button
        id="taxi-rollup-toggle-btn"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all duration-200 text-left shadow-sm ${
          isOpen
            ? 'bg-gradient-to-r from-[#FAF3E0] via-[#FFFDF9] to-[#F5EAD4] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/20'
            : 'bg-[#FFFCF8] hover:bg-[#FAF5EA] border-[#D4AF37]/30 hover:border-[#D4AF37]'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-lg font-semibold text-[#2C2623] block">
              Taxi & Heimfahrt-Service
            </span>
            <p className="text-xs text-[#7A6A5C]">
              {isOpen ? 'Tippe zum Einklappen der Taxi-Rufnummern' : 'Taxi-Rufnummern für die Heimfahrt'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#8B6508] font-medium text-xs sm:text-sm">
          <span className="hidden sm:inline">{isOpen ? 'Schließen' : 'Nummern anzeigen'}</span>
          <div className="p-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expandable Rollup Body matching taxi.jpg */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="taxi-rollup-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 sm:p-6 rounded-2xl bg-[#FFFCF8] border border-[#D4AF37]/25 shadow-md space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {services.map((taxi) => {
                  const phoneList = taxi.numbers && taxi.numbers.length > 0
                    ? taxi.numbers
                    : [{ phone: taxi.phone || '', displayPhone: taxi.displayPhone || taxi.phone || '' }];

                  return (
                    <div
                      key={taxi.id}
                      id={`taxi-card-${taxi.id}`}
                      className="flex flex-col items-center text-center space-y-1.5"
                    >
                      {/* Taxi Name Header */}
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#8B6508]">
                        {taxi.name}
                      </h4>

                      {/* Phone Call Button(s) styled as golden taxi cards */}
                      <div className="w-full space-y-2">
                        {phoneList.map((item, idx) => (
                          <a
                            key={idx}
                            id={`taxi-call-${taxi.id}-${idx}`}
                            href={`tel:${item.phone}`}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C89D2B] to-[#B8860B] hover:from-[#C89D2B] hover:to-[#A37408] text-[#2C2623] font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-98 border border-[#E5C358]"
                          >
                            <span className="text-xl">🚕</span>
                            <span className="text-[#2C2623] drop-shadow-xs font-semibold">{item.displayPhone}</span>
                            <Phone className="w-4 h-4 text-[#2C2623] ml-auto opacity-80" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simple Close Link */}
              <div className="pt-2 text-center">
                <button
                  onClick={onToggle}
                  className="text-xs font-semibold text-[#8B6508] hover:underline cursor-pointer"
                >
                  ▲ Bereich zuklappen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
