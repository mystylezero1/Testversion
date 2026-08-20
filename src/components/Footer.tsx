import React from 'react';
import { ShieldCheck, Mail, Heart, Shield } from 'lucide-react';
import { LegalTab } from '../types';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenAdmin?: () => void;
  isAdminParam?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenAdmin,
  isAdminParam = false,
}) => {
  return (
    <footer id="wedding-footer" className="mt-12 border-t border-[#E8DFC9] bg-[#FAF6EE]/80 py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-[#7A6A5C]">
        {/* Left: Quick Email Contact */}
        <div className="flex items-center gap-1.5 text-[#7A6A5C]">
          <Mail className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Kontakt:</span>
          <a
            href="mailto:weimar@gmx.de"
            className="text-[#8B6508] hover:underline font-medium"
          >
            weimar@gmx.de
          </a>
          <span className="text-[#A89887] text-[11px]">(Sven Weimar-Schmidt)</span>
        </div>

        {/* Right: Impressum & DSGVO */}
        <div id="footer-legal-links" className="flex items-center gap-3">
          <button
            id="footer-link-impressum"
            onClick={() => onOpenLegal('impressum')}
            className="hover:text-[#8B6508] transition-colors underline-offset-2 hover:underline cursor-pointer font-medium"
          >
            Impressum
          </button>
          <span>•</span>
          <button
            id="footer-link-datenschutz"
            onClick={() => onOpenLegal('datenschutz')}
            className="hover:text-[#8B6508] transition-colors underline-offset-2 hover:underline cursor-pointer font-medium flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B6508]" />
            <span>Datenschutz & DSGVO</span>
          </button>
          {onOpenAdmin && (
            <>
              <span className={isAdminParam ? 'inline' : 'hidden md:inline'}>•</span>
              <button
                id="footer-link-admin"
                onClick={onOpenAdmin}
                className={`text-[#8B6508] hover:text-[#2C2623] transition-colors underline-offset-2 hover:underline cursor-pointer font-bold items-center gap-1 ${
                  isAdminParam ? 'inline-flex' : 'hidden md:inline-flex'
                }`}
              >
                <Shield className="w-3 h-3 text-[#B8860B]" />
                <span>Admin</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subtle Transparency & Responsibility Note */}
      <div className="max-w-2xl mx-auto mt-4 pt-3 border-t border-[#EEDCBA]/40 text-[11px] text-[#9E8E7F] leading-normal space-y-1">
        <p>
          <strong>DSGVO-Hinweis:</strong> Alle Gastnamen werden zur Orientierung am Sitzplan ausschließlich abgekürzt dargestellt (Vorname + max. 1 Buchstabe des Nachnamens bei gleichen Vornamen).
        </p>
        <p>
          <strong>Haftungshinweis:</strong> Die Nutzung externer Verlinkungen (Spotify & Hochzeitsfoto-App) erfolgt auf eigene Verantwortung.
        </p>
      </div>

      {/* Floating Bottom-Right Admin Badge (visible on desktop or if ?admin=true) */}
      <div className="fixed bottom-3 right-3 z-30 flex items-center gap-2">
        {onOpenAdmin && (
          <button
            id="floating-admin-btn"
            onClick={onOpenAdmin}
            className={`items-center gap-1 px-3 py-1.5 rounded-full bg-[#2C2623]/90 hover:bg-[#2C2623] border border-[#D4AF37]/50 shadow-md text-[11px] font-bold text-[#FAF0D7] transition-all cursor-pointer backdrop-blur-xs ${
              isAdminParam ? 'inline-flex' : 'hidden md:inline-flex'
            }`}
            title="Admin Konsole öffnen"
          >
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Admin</span>
          </button>
        )}

        <button
          id="floating-legal-btn"
          onClick={() => onOpenLegal('datenschutz')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFCF8]/95 hover:bg-[#FAF0D7] border border-[#D4AF37]/50 shadow-md text-[11px] font-semibold text-[#8B6508] hover:text-[#5C4A3A] transition-all cursor-pointer backdrop-blur-xs"
          title="Impressum & DSGVO anzeigen"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Impressum & DSGVO</span>
        </button>
      </div>
    </footer>
  );
};
