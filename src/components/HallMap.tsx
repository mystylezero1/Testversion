import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Table, Guest } from '../types';
import { formatGuestDisplayName } from '../utils/nameHelper';
import { MapPin, ZoomIn, ZoomOut, Navigation } from 'lucide-react';

interface HallMapProps {
  tables: Table[];
  guests: Guest[];
  selectedGuest: Guest | null;
  onSelectGuest: (guest: Guest) => void;
  onOpenWcModal?: () => void;
}

export const HallMap: React.FC<HallMapProps> = ({
  tables,
  guests,
  selectedGuest,
  onSelectGuest,
  onOpenWcModal,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredSeat, setHoveredSeat] = useState<{
    globalSeat: number;
    guest?: Guest;
    tableName: string;
  } | null>(null);

  // Auto-zoom and smooth-scroll to table when a guest is selected or searched
  React.useEffect(() => {
    if (selectedGuest) {
      setZoomLevel((prev) => (prev < 1.15 ? 1.15 : prev));

      const timer = setTimeout(() => {
        const targetId =
          selectedGuest.tableId === 't-1' || selectedGuest.tableId === 't-2'
            ? 'braut-tisch-container'
            : `hall-table-${selectedGuest.tableId}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [selectedGuest]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  // Map each global seat to its guest
  const seatToGuestMap = React.useMemo(() => {
    const map = new Map<number, Guest>();
    guests.forEach((g) => {
      if (typeof g.globalSeat === 'number') {
        map.set(g.globalSeat, g);
      }
    });
    return map;
  }, [guests]);

  // Render a seat circle matching the blush watercolor dots from the original artwork
  const renderSeatNode = (seatNum: number, table: Table) => {
    const guest = seatToGuestMap.get(seatNum);
    const isSelected =
      selectedGuest?.globalSeat === seatNum ||
      (guest && selectedGuest?.id === guest.id);

    return (
      <button
        key={`seat-${seatNum}`}
        id={`map-seat-btn-${seatNum}`}
        type="button"
        onClick={() => {
          if (guest) {
            onSelectGuest(guest);
          }
        }}
        onMouseEnter={() => {
          setHoveredSeat({
            globalSeat: seatNum,
            guest,
            tableName: table.name,
          });
        }}
        onMouseLeave={() => setHoveredSeat(null)}
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          isSelected
            ? 'w-5 h-5 md:w-6 md:h-6 bg-[#C89D66] text-white ring-2 ring-[#8B6508] ring-offset-1 shadow-md scale-110 z-20'
            : guest
            ? 'w-4 h-4 md:w-5 md:h-5 bg-[#E2BCB4] hover:bg-[#D5A9A0] border border-[#CBA096]/60 text-[#54463D] shadow-2xs hover:scale-105'
            : 'w-3.5 h-3.5 md:w-4.5 md:h-4.5 bg-[#EFE3DE] border border-dashed border-[#CBA096]/40 text-[#9E8B80]'
        }`}
        title={`Sitz #${seatNum}: ${guest ? guest.name : 'Freier Platz'} (${table.name})`}
      >
        {/* On Desktop: subtle seat number for easy navigation */}
        <span
          className={`hidden md:inline text-[9px] font-sans font-semibold leading-none select-none ${
            isSelected ? 'text-white' : 'text-[#5C453C]'
          }`}
        >
          {seatNum}
        </span>

        {/* On Mobile: crisp center dot */}
        <span
          className={`md:hidden rounded-full ${
            isSelected
              ? 'w-2 h-2 bg-white'
              : guest
              ? 'w-1 h-1 bg-[#8F655D]'
              : 'w-0.5 h-0.5 bg-[#BFA39C]'
          }`}
        />
      </button>
    );
  };

  // Helper for rendering rectangular tables matching the original card style
  const renderRectTable = (table: Table) => {
    const isTableSelected = selectedGuest?.tableId === table.id;
    const leftSeats = table.leftSeats || [];
    const rightSeats = table.rightSeats || [];

    return (
      <div
        key={table.id}
        id={`hall-table-${table.id}`}
        className={`relative flex items-center justify-between gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl transition-all duration-300 ${
          isTableSelected
            ? 'bg-[#FAF1EC] border-2 border-[#C89D66] shadow-md ring-2 ring-[#C89D66]/30 scale-[1.02]'
            : 'bg-white/80 border border-[#DFCFC2] hover:border-[#CBA096] shadow-xs'
        }`}
      >
        {/* Left Seats Column */}
        <div className="flex flex-col items-center justify-around gap-1.5 py-1">
          {leftSeats.map((seatNum) => renderSeatNode(seatNum, table))}
        </div>

        {/* Center Table Box with Table Number Circle */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-[28px] sm:min-w-[34px] py-2 sm:py-3 px-1 text-center">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#D9C6B8] bg-[#FAF6F0] flex items-center justify-center shadow-2xs">
            <span className="font-serif text-xs sm:text-sm font-bold text-[#635147]">
              {table.number}
            </span>
          </div>
        </div>

        {/* Right Seats Column */}
        <div className="flex flex-col items-center justify-around gap-1.5 py-1">
          {rightSeats.map((seatNum) => renderSeatNode(seatNum, table))}
        </div>
      </div>
    );
  };

  return (
    <div id="hall-map-component" className="w-full max-w-5xl mx-auto my-4 space-y-3">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#FAF4EF] border border-[#E8DCD1] rounded-2xl text-xs text-[#6B5A4D] shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C89D66] animate-ping" />
          <span className="font-serif font-bold text-[#3D322B] text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#B58A54]" />
            <span>Saalplan (20 Tische • Sitze 1 bis 154)</span>
          </span>
        </div>

        {/* WC button & Zoom Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {onOpenWcModal && (
            <button
              id="map-open-wc-btn"
              onClick={onOpenWcModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6C4] border border-[#D4AF37]/50 text-[#8B6508] font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Wegweiser zu den Toiletten öffnen"
            >
              <Navigation className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>WC</span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <button
              id="map-zoom-out-btn"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-white border border-[#DFCFC2] hover:bg-[#FAF4EF] text-[#5C4A3A] transition-colors cursor-pointer"
              title="Verkleinern"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              id="map-zoom-reset-btn"
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#DFCFC2] hover:bg-[#FAF4EF] text-[#5C4A3A] font-semibold text-xs transition-colors cursor-pointer"
              title="Zoom zurücksetzen"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              id="map-zoom-in-btn"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-white border border-[#DFCFC2] hover:bg-[#FAF4EF] text-[#5C4A3A] transition-colors cursor-pointer"
              title="Vergrößern"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Floor Plan Container matching the original saalplan artwork */}
      <div className="relative overflow-x-auto rounded-3xl bg-[#FAF6F0] border-2 border-[#EADFD5] shadow-lg p-4 sm:p-8">
        {/* Soft elegant watercolor paper texture background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none rounded-3xl"
          style={{
            backgroundImage: `radial-gradient(#E8D3C8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Scalable Container */}
        <div
          className="relative z-10 mx-auto transition-transform duration-200 origin-top min-w-[340px] max-w-[850px] space-y-7"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* ========================================================
              TOP SECTION: BRAUT-TISCH (FLORAL WREATH & SEATS 1..14)
             ======================================================== */}
          <div className="relative flex flex-col items-center">
            {/* Upper Seats Row (1 to 8: von links nach rechts) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((seatNum) => {
                const table = tables.find((t) => t.number === 1) || tables[0];
                return renderSeatNode(seatNum, table);
              })}
            </div>

            {/* Braut-Tisch Floral Wreath Frame */}
            <div
              id="braut-tisch-container"
              className={`relative w-full max-w-lg py-3.5 px-6 rounded-3xl transition-all duration-300 ${
                selectedGuest &&
                (selectedGuest.tableId === 't-1' || selectedGuest.tableId === 't-2')
                  ? 'bg-white shadow-lg ring-4 ring-[#C89D66]/40 scale-[1.02]'
                  : 'bg-white/90 shadow-sm'
              }`}
            >
              {/* Botanical Wreath SVG Frame */}
              <div className="relative flex items-center justify-center border-2 border-[#D9C4B5] rounded-2xl py-2 px-4">
                {/* Decorative leaves left */}
                <svg
                  className="hidden sm:block absolute -left-3.5 top-1/2 -translate-y-1/2 w-8 h-12 text-[#688172] pointer-events-none opacity-80"
                  viewBox="0 0 40 60"
                  fill="currentColor"
                >
                  <path d="M20,30 Q10,15 5,5 Q15,10 20,30 Z M20,30 Q5,35 0,45 Q12,42 20,30 Z M20,30 Q30,20 38,15 Q30,30 20,30 Z" />
                </svg>

                {/* Center Title */}
                <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-[#52443C] px-3">
                  Braut-Tisch
                </h3>

                {/* Decorative leaves right */}
                <svg
                  className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-8 h-12 text-[#688172] pointer-events-none opacity-80 scale-x-[-1]"
                  viewBox="0 0 40 60"
                  fill="currentColor"
                >
                  <path d="M20,30 Q10,15 5,5 Q15,10 20,30 Z M20,30 Q5,35 0,45 Q12,42 20,30 Z M20,30 Q30,20 38,15 Q30,30 20,30 Z" />
                </svg>
              </div>
            </div>

            {/* Lower Seats Row (9 to 14: von links nach rechts) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mt-2.5">
              {[9, 10, 11, 12, 13, 14].map((seatNum) => {
                const table = tables.find((t) => t.number === 2) || tables[1];
                return renderSeatNode(seatNum, table);
              })}
            </div>
          </div>

          {/* ========================================================
              ROW 1: TISCHE 3, 4, 5, 6, 7 (5 Tische in 6-Spalten Grid)
             ======================================================== */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {tables
              .filter((t) => t.number >= 3 && t.number <= 7)
              .map((table) => renderRectTable(table))}
            {/* 6th column spacer for alignment with Row 2 buffet */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>

          {/* ========================================================
              ROW 2: TISCHE 8, 9, 10, 11, 12 + AUSSCHANK & BUFFET (RECHTS NEBEN TISCH 12)
             ======================================================== */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4 items-stretch">
            {tables
              .filter((t) => t.number >= 8 && t.number <= 12)
              .map((table) => renderRectTable(table))}

            {/* Ausschank & Buffet directly placed at position 6 next to Tisch 12 matching the original illustration */}
            <div
              id="hall-buffet-card"
              className="relative flex flex-col items-center justify-between p-2 rounded-2xl bg-white/90 border border-[#DFCFC2] shadow-xs text-center h-full min-h-[80px] sm:min-h-[92px] transition-all hover:scale-[1.02]"
              title="Ausschank & Buffet (Rechts neben Tisch 12)"
            >
              {/* Top Direction Arrow with Wine Glass */}
              <div className="w-full flex items-center justify-center gap-1 py-0.5 border-b border-[#E8DCD1]">
                <span className="text-xs">🍷</span>
                <span className="text-[#8F7265] font-serif font-bold text-xs">➔</span>
              </div>

              {/* Bottom Label with Wine Glass and Cloche Dome Icons */}
              <div className="w-full flex items-center justify-between gap-1 px-1">
                <span className="text-xs">🍷</span>
                <span className="font-serif font-bold text-[10px] sm:text-xs text-[#52443C] leading-tight">
                  Ausschank & Buffet
                </span>
                <span className="text-xs">🍽️</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              ROW 3: TISCHE 13, 14, 15, 16 (4 Tische)
             ======================================================== */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {tables
              .filter((t) => t.number >= 13 && t.number <= 16)
              .map((table) => renderRectTable(table))}
          </div>

          {/* ========================================================
              ROW 4: TISCHE 17, 18, 19, 20 (4 Tische)
             ======================================================== */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {tables
              .filter((t) => t.number >= 17 && t.number <= 20)
              .map((table) => renderRectTable(table))}
          </div>

          {/* ========================================================
              BOTTOM SECTION: EINGANGS-TÜR (LEFT) & DJ UND TANZFLÄCHE
             ======================================================== */}
          <div className="grid grid-cols-12 gap-3 pt-2 items-stretch">
            {/* Eingangs-Tür (Bottom-Left) matching original fine-lined box */}
            <div
              id="hall-entrance-door"
              className="col-span-4 sm:col-span-3 p-3 rounded-2xl bg-white/90 border border-[#DFCFC2] shadow-xs flex flex-col items-center justify-center text-center gap-0.5"
            >
              <span className="font-serif font-bold text-xs sm:text-sm text-[#52443C]">
                Eingangs-
              </span>
              <span className="font-serif font-bold text-xs sm:text-sm text-[#52443C]">
                Tür
              </span>
            </div>

            {/* DJ und Tanzfläche (Bottom-Center/Right) with turntable and dancing couple icons */}
            <div
              id="hall-dancefloor"
              className="col-span-8 sm:col-span-9 p-3 sm:p-4 rounded-2xl bg-[#EFE5DD]/70 border border-[#DFCFC2] shadow-xs flex items-center justify-between px-4 sm:px-6"
            >
              {/* Vinyl Turntable Icon */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/80 border border-[#D9C4B5] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg
                  className="w-6 h-6 text-[#7A665A]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <circle cx="10" cy="12" r="6" />
                  <circle cx="10" cy="12" r="2" />
                  <path d="M19 5l-5 5" />
                </svg>
              </div>

              {/* Title */}
              <div className="font-serif font-bold text-sm sm:text-lg text-[#52443C] text-center tracking-wide px-2">
                DJ und Tanzfläche
              </div>

              {/* Dancing Couple Outline Icon */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0 text-[#7A665A]">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {/* Left partner */}
                  <circle cx="7.5" cy="5" r="2" />
                  <path d="M6 10l-2 4 4 6 2-5-2-5z" />
                  <path d="M8 8l3 3" />
                  {/* Right partner */}
                  <circle cx="16.5" cy="5" r="2" />
                  <path d="M15 10l3 4-2 6-3-5 2-5z" />
                  <path d="M16 8l-4 3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hover / Tooltip Floating Badge */}
        <AnimatePresence>
          {hoveredSeat && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#3D322B]/95 text-white text-xs border border-[#C89D66] shadow-xl pointer-events-none z-30 flex items-center gap-2 backdrop-blur-xs"
            >
              <span className="font-bold text-[#FAF0D7]">
                Sitz #{hoveredSeat.globalSeat}:
              </span>
              <span>
                {hoveredSeat.guest
                  ? formatGuestDisplayName(hoveredSeat.guest, guests)
                  : 'Freier Platz'}
              </span>
              <span className="text-[#E6CA92]">({hoveredSeat.tableName})</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#7A6A5C] px-2 py-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#C89D66] border border-[#8B6508]" />
          <span className="font-medium">Ausgewählter Gast</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#E2BCB4] border border-[#CBA096]" />
          <span>Sitzplatz</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🍷</span>
          <span>Ausschank & Buffet (neben Tisch 12)</span>
        </div>
      </div>
    </div>
  );
};
