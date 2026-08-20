import React from 'react';
import { Sparkles, Car, Music2, Camera, ExternalLink, Navigation } from 'lucide-react';
import { APP_LINKS as DEFAULT_APP_LINKS } from '../data/mockData';

interface ActionButtonsProps {
  onOpenQuoteModal: () => void;
  isTaxiOpen: boolean;
  onToggleTaxi: () => void;
  onOpenWcModal?: () => void;
  appLinks?: {
    spotifyPlaylist: string;
    photoApp: string;
  };
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onOpenQuoteModal,
  isTaxiOpen,
  onToggleTaxi,
  onOpenWcModal,
  appLinks = DEFAULT_APP_LINKS,
}) => {
  const currentLinks = {
    spotifyPlaylist: appLinks.spotifyPlaylist || DEFAULT_APP_LINKS.spotifyPlaylist,
    photoApp: appLinks.photoApp || DEFAULT_APP_LINKS.photoApp,
  };

  return (
    <div id="wedding-action-buttons-grid" className="w-full max-w-4xl mx-auto my-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
        {/* 1. Spruch Button */}
        <button
          id="btn-wedding-quote"
          onClick={onOpenQuoteModal}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3 sm:px-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF1DF] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[#2C2623] group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FAF0D7] border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-center sm:text-left">
            <span className="font-semibold text-xs sm:text-sm block text-[#2C2623] leading-tight">
              Spruch
            </span>
            <span className="text-[10px] text-[#8C7A6B] block">
              Inspiration
            </span>
          </div>
        </button>

        {/* 2. Taxi Button */}
        <button
          id="btn-wedding-taxi"
          onClick={onToggleTaxi}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3 sm:px-3.5 rounded-2xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
            isTaxiOpen
              ? 'bg-[#FAF0D7] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/20 text-[#8B6508]'
              : 'bg-gradient-to-br from-[#FFFDF9] to-[#FAF1DF] border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#2C2623] hover:shadow-md'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
            isTaxiOpen
              ? 'bg-[#D4AF37] text-white'
              : 'bg-[#FAF0D7] border border-[#D4AF37]/40 text-[#B8860B]'
          }`}>
            <Car className="w-4 h-4" />
          </div>
          <div className="text-center sm:text-left">
            <span className="font-semibold text-xs sm:text-sm block leading-tight">
              Taxi Info
            </span>
            <span className="text-[10px] text-[#8C7A6B] block">
              {isTaxiOpen ? 'Geöffnet' : 'Nummern'}
            </span>
          </div>
        </button>

        {/* 3. WC-Plan Button */}
        {onOpenWcModal && (
          <button
            id="btn-wedding-wc-plan"
            onClick={onOpenWcModal}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3 sm:px-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F1F8F5] border border-[#A7D9B4]/60 hover:border-[#2E7D32] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[#2C2623] group cursor-pointer"
            title="Lageplan der Toiletten & WCs anzeigen"
          >
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors flex-shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="text-center sm:text-left">
              <span className="font-semibold text-xs sm:text-sm block text-[#2C2623] leading-tight">
                WC
              </span>
              <span className="text-[10px] text-[#5C6B5E] block">
                Wegweiser
              </span>
            </div>
          </button>
        )}

        {/* 4. Spotify Playlist */}
        <a
          id="btn-wedding-spotify"
          href={currentLinks.spotifyPlaylist}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3 sm:px-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#EBF6EE] border border-[#A7D9B4]/50 hover:border-[#2E7D32] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[#2C2623] group"
          title="Spotify Playlist öffnen"
        >
          <div className="w-8 h-8 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-[#1E7E34] group-hover:bg-[#1E7E34] group-hover:text-white transition-colors flex-shrink-0">
            <Music2 className="w-4 h-4" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              <span className="font-semibold text-xs sm:text-sm text-[#2C2623] leading-tight">
                Spotify
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-[#7A6A5C]" />
            </div>
            <span className="text-[10px] text-[#5C6B5E] block">
              Musikwünsche
            </span>
          </div>
        </a>

        {/* 5. Hochzeitsfoto-App */}
        <a
          id="btn-wedding-photoapp"
          href={currentLinks.photoApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3 sm:px-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F7EEFB] border border-[#D5B8E8]/50 hover:border-[#8E24AA] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[#2C2623] group col-span-2 sm:col-span-1"
          title="Hochzeitsfoto-App öffnen"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] border border-[#E1BEE7] flex items-center justify-center text-[#8E24AA] group-hover:bg-[#8E24AA] group-hover:text-white transition-colors flex-shrink-0">
            <Camera className="w-4 h-4" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              <span className="font-semibold text-xs sm:text-sm text-[#2C2623] leading-tight">
                Foto-App
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-[#7A6A5C]" />
            </div>
            <span className="text-[10px] text-[#7B5B84] block">
              Bilder teilen
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
