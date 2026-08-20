import React from 'react';
import { Heart, Sparkles, LayoutGrid, MapPin, Shield } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  tableCount: number;
  onOpenAdmin?: () => void;
  isAdminParam?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  tableCount,
  onOpenAdmin,
  isAdminParam = false,
}) => {
  return (
    <header id="wedding-header" className="text-center pt-6 pb-2 px-4 max-w-4xl mx-auto">
      {/* Decorative top badge */}
      <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FAF3E0] via-[#FFF8EA] to-[#FAF3E0] border border-[#D4AF37]/35 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8B6508]">
            Herzlich Willkommen zur Hochzeitsfeier
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
        </div>
      </div>

      {/* Main Wedding Title */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2623] tracking-tight">
        Anja <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#B8860B] font-normal mx-1">&</span> Dino
      </h1>

      {/* Subtitle / Description */}
      <p className="font-serif italic text-base sm:text-lg text-[#6E5D4F] mt-1.5 flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
        <span>Tischordnung & Interaktiver Saalplan</span>
        <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
      </p>

      {/* View Switcher Bar (Saalplan, Tischkarten) - Gästeliste ist nur noch in der Admin-Konsole */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="inline-flex p-1 rounded-xl bg-[#FAF0D7]/60 border border-[#E8DFC9] shadow-inner text-xs gap-1">
          <button
            id="view-mode-map-btn"
            onClick={() => onToggleViewMode('map')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white text-[#8B6508] shadow-sm font-semibold'
                : 'text-[#7A6A5C] hover:text-[#2C2623]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Saalplan</span>
          </button>

          <button
            id="view-mode-plan-btn"
            onClick={() => onToggleViewMode('plan')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'plan'
                ? 'bg-white text-[#8B6508] shadow-sm font-semibold'
                : 'text-[#7A6A5C] hover:text-[#2C2623]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tischkarten ({tableCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
