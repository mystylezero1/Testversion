import React from 'react';
import { Sparkles, Wine, Disc3, DoorOpen, ArrowUpRight } from 'lucide-react';

export const SaalplanToilettenGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFF8EA] border-2 border-[#D4AF37] p-4 sm:p-6 shadow-xl overflow-hidden select-none">
      {/* Background soft watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-serif font-bold text-[#D4AF37]/5 pointer-events-none">
        &
      </div>

      {/* TOP HEADER BAR: Directional golden banner to WC */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white/90 p-3 sm:p-4 rounded-2xl border border-[#E8DFC9] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B6508]">
              Wegweiser & Orientierung
            </div>
            <div className="text-sm sm:text-base font-serif font-bold text-[#2C2623]">
              Sanitäranlagen befinden sich oben rechts
            </div>
          </div>
        </div>

        {/* Big WC Sign Box */}
        <div className="flex items-center justify-between sm:justify-end gap-3 bg-gradient-to-r from-[#FAF0D7] to-[#F5E6C4] px-4 py-2 rounded-xl border-2 border-[#D4AF37] shadow-sm">
          <div className="text-left sm:text-right">
            <div className="font-serif font-extrabold text-lg text-[#2C2623] leading-none">
              WC
            </div>
            <div className="text-[10px] font-bold text-[#8B6508] tracking-wide">
              TOILETTEN
            </div>
          </div>
          <div className="h-6 w-px bg-[#D4AF37]" />
          <div className="flex items-center gap-1.5 text-lg">
            <span title="Damen">🚺</span>
            <span className="text-[#D4AF37] font-bold">|</span>
            <span title="Herren">🚹</span>
          </div>
        </div>
      </div>

      {/* MAIN HALL AREA */}
      <div className="relative pl-6 sm:pl-10 pr-2">
        {/* Golden Pathway Line from Entrance upward along the left wall */}
        <div className="absolute left-1 sm:left-3 top-2 bottom-6 w-3 sm:w-3.5 bg-gradient-to-t from-[#B8860B] via-[#E6CA92] to-[#D4AF37] rounded-full shadow-inner flex flex-col items-center justify-between py-6">
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white" />
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white" />
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white" />
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white" />
        </div>

        {/* 1. BRAUT-TISCH (Seats 1..14) */}
        <div className="mb-5 bg-white/95 rounded-2xl border-2 border-[#D4AF37] p-3 sm:p-4 shadow-md text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-serif font-extrabold text-sm sm:text-base text-[#2C2623] tracking-wide">
              Braut-Tisch • Anja & Dino
            </h4>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          {/* Top Row Seats: 1 to 8 */}
          <div className="text-[10px] text-[#8C7A6B] font-semibold mb-1">
            Obere Plätze (1 – 8)
          </div>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-2.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF0D7] border border-[#D4AF37] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#5C4A3A] shadow-2xs"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Bottom Row Seats: 9 to 14 */}
          <div className="text-[10px] text-[#8C7A6B] font-semibold mb-1">
            Untere Plätze (9 – 14)
          </div>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
            {[9, 10, 11, 12, 13, 14].map((num) => (
              <div
                key={num}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF0D7] border border-[#D4AF37] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#5C4A3A] shadow-2xs"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* 2. GUEST TABLES GRID (Tische 3 bis 20) */}
        <div className="space-y-3.5 mb-5">
          {/* Row 1: Tisch 3, 4, 5, 6, 7 */}
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6B] mb-1 pl-1">
              Reihe 1
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {[3, 4, 5, 6, 7].map((num) => (
                <div
                  key={num}
                  className="bg-white/95 rounded-xl border border-[#E8DFC9] p-2 sm:p-3 text-center shadow-xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-[10px] sm:text-xs text-[#8C7A6B] font-medium">Tisch</div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#2C2623]">{num}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Tisch 8, 9, 10, 11, 12 + Buffet indicator */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7A6B] mb-1 pl-1">
              <span>Reihe 2</span>
              <span className="text-[#8B6508] font-bold flex items-center gap-1">
                <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                Ausschank & Buffet ➔
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {[8, 9, 10, 11, 12].map((num) => (
                <div
                  key={num}
                  className="bg-white/95 rounded-xl border border-[#E8DFC9] p-2 sm:p-3 text-center shadow-xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-[10px] sm:text-xs text-[#8C7A6B] font-medium">Tisch</div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#2C2623]">{num}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Tisch 13, 14, 15, 16 */}
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6B] mb-1 pl-1">
              Reihe 3
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[13, 14, 15, 16].map((num) => (
                <div
                  key={num}
                  className="bg-white/95 rounded-xl border border-[#E8DFC9] p-2 sm:p-3 text-center shadow-xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-[10px] sm:text-xs text-[#8C7A6B] font-medium">Tisch</div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#2C2623]">{num}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Tisch 17, 18, 19, 20 */}
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6B] mb-1 pl-1">
              Reihe 4
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[17, 18, 19, 20].map((num) => (
                <div
                  key={num}
                  className="bg-white/95 rounded-xl border border-[#E8DFC9] p-2 sm:p-3 text-center shadow-xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-[10px] sm:text-xs text-[#8C7A6B] font-medium">Tisch</div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#2C2623]">{num}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: Entrance on bottom left & DJ / Dancefloor */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-stretch">
          {/* Entrance */}
          <div className="bg-[#FAF3E6] border border-[#D4AF37] rounded-xl p-2.5 flex items-center gap-2 text-left shadow-xs">
            <DoorOpen className="w-5 h-5 text-[#8B6508] flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider">
                Eingang
              </div>
              <div className="text-xs font-serif font-bold text-[#2C2623]">
                Start des Wegweisers
              </div>
            </div>
          </div>

          {/* DJ & Dancefloor */}
          <div className="sm:col-span-2 bg-gradient-to-r from-[#2C2623] via-[#3D352F] to-[#2C2623] text-white rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-md">
            <Disc3 className="w-5 h-5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
            <div className="text-center">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#FAF0D7]">
                DJ-Pult & Tanzfläche
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
