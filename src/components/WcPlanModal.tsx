import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Navigation, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import saalplanToilettenImg from '../assets/images/saalplan_toiletten.png';

interface WcPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WcPlanModal: React.FC<WcPlanModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(saalplanToilettenImg);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full ${
            isFullscreen ? 'max-w-6xl h-[95vh]' : 'max-w-3xl max-h-[92vh]'
          } rounded-3xl bg-[#FFFDF9] border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300`}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2C2623] via-[#3D352F] to-[#2C2623] text-white flex items-center justify-between border-b border-[#D4AF37]/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37] text-white flex items-center justify-center font-bold text-sm shadow-md">
                WC
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF0D7]">
                  Wegweiser zu den Toiletten & WCs
                </h3>
                <p className="text-xs text-[#E6CA92]">
                  Lageplan der Sanitärräume & Foyer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden sm:inline-flex p-2 rounded-full text-[#FAF0D7]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isFullscreen ? 'Verkleinern' : 'Vollbild'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                id="wc-modal-close-btn"
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-[#FAF0D7]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-header Banner with Wegweiser Note & Zoom controls */}
          <div className="px-3 sm:px-4 py-2 bg-[#FAF3E6] border-b border-[#E8DFC9] flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 text-[#5C4A3A]">
              <div className="w-6 h-6 rounded-lg bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm text-[#2C2623]">
                Den Wegweisern bitte folgen.
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg bg-white border border-[#E8DFC9] hover:bg-[#FAF0D7] text-[#5C4A3A] text-xs transition-colors cursor-pointer"
                title="Verkleinern"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E8DFC9] hover:bg-[#FAF0D7] text-[#5C4A3A] font-semibold text-xs transition-colors cursor-pointer"
                title="Zoom zurücksetzen"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg bg-white border border-[#E8DFC9] hover:bg-[#FAF0D7] text-[#5C4A3A] text-xs transition-colors cursor-pointer"
                title="Vergrößern"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Direct image display with zoom */}
          <div className="p-3 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-[#F7F2EB]/60">
            <div className="relative rounded-2xl bg-white border border-[#E8DFC9] p-2 sm:p-3 shadow-md overflow-hidden flex items-center justify-center transition-transform duration-200">
              <img
                src={imgSrc}
                alt="Saalplan Toiletten & WCs - Anja und Dino"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imgSrc !== '/saalplan_toiletten.png') {
                    setImgSrc('/saalplan_toiletten.png');
                  }
                }}
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl transition-transform duration-200 select-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-3 bg-[#FAF6EE] border-t border-[#E8DFC9] flex items-center justify-between flex-shrink-0">
            <div className="text-[11px] text-[#8C7A6B] hidden sm:block">
              Wegweiser zu den Toiletten (oben rechts).
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-xs shadow hover:shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Plan schließen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
