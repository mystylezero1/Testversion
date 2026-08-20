import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Info, ExternalLink, UserCheck, AlertCircle } from 'lucide-react';
import { LegalTab } from '../types';

interface LegalModalProps {
  activeTab: LegalTab;
  onClose: () => void;
  onSelectTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  activeTab,
  onClose,
  onSelectTab,
}) => {
  const isOpen = activeTab !== 'none';

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="legal-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2C2623]/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#FFFCF7] border border-[#D4AF37]/35 shadow-2xl z-10 overflow-hidden"
            id="legal-modal-card"
          >
            {/* Header with Navigation Tabs */}
            <div className="p-4 sm:p-5 border-b border-[#EEDCBA] bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E0] to-[#FFFDF9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] border border-[#D4AF37]/30 flex items-center justify-center text-[#8B6508]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2623]">
                    Rechtliche Hinweise & Datenschutz
                  </h3>
                  <p className="text-[11px] text-[#7A6A5C]">
                    Transparenz & Schutz für alle Hochzeitsgäste
                  </p>
                </div>
              </div>

              <button
                id="legal-modal-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#2C2623] hover:bg-[#F2EADB] transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switchers */}
            <div className="flex border-b border-[#EEDCBA]/70 bg-[#FAF7F0] px-4 pt-2 gap-2">
              <button
                id="tab-impressum-btn"
                onClick={() => onSelectTab('impressum')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all border-t border-x ${
                  activeTab === 'impressum'
                    ? 'bg-[#FFFCF7] border-[#D4AF37]/40 text-[#8B6508] -mb-[1px] border-b-[#FFFCF7]'
                    : 'border-transparent text-[#7A6A5C] hover:text-[#2C2623]'
                }`}
              >
                Impressum & Kontakt
              </button>
              <button
                id="tab-datenschutz-btn"
                onClick={() => onSelectTab('datenschutz')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all border-t border-x ${
                  activeTab === 'datenschutz'
                    ? 'bg-[#FFFCF7] border-[#D4AF37]/40 text-[#8B6508] -mb-[1px] border-b-[#FFFCF7]'
                    : 'border-transparent text-[#7A6A5C] hover:text-[#2C2623]'
                }`}
              >
                Datenschutz (DSGVO) & Haftung
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#3E342B] leading-relaxed">
              {activeTab === 'impressum' ? (
                <div className="space-y-4" id="legal-impressum-content">
                  <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9]">
                    <h4 className="font-serif text-base font-bold text-[#2C2623] mb-1.5 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#B8860B]" />
                      Angaben gemäß § 5 TMG / Information
                    </h4>
                    <p className="text-xs text-[#6E5D4F]">
                      Dies ist eine <strong>rein private, nicht-kommerzielle Hochzeits-Informationswebsite</strong> ausschließlich zur Orientierung der geladenen Gäste des Brautpaares.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white border border-[#E8DFC9]">
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-bold block mb-1">
                        Verantwortlich für den Inhalt
                      </span>
                      <p className="font-medium text-[#2C2623]">Sven Weimar-Schmidt</p>
                      <p className="text-xs text-[#7A6A5C]">Private Hochzeitsorganisation & Festgemeinschaft</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#E8DFC9]">
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-bold block mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#B8860B]" />
                        Kontakt per E-Mail
                      </span>
                      <a
                        href="mailto:weimar@gmx.de"
                        className="font-medium text-[#8B6508] hover:underline break-all"
                      >
                        weimar@gmx.de
                      </a>
                      <p className="text-[11px] text-[#7A6A5C] mt-0.5">
                        Für Rückfragen zur Feier & Sitzordnung
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF9ED] border border-[#E2CA92]/60 text-xs text-[#6E572E]">
                    <strong>Hinweis:</strong> Diese Seite verfolgt keinerlei geschäftliche Zwecke und enthält keine Werbung oder Tracking-Cookies Dritter.
                  </div>
                </div>
              ) : (
                <div className="space-y-4" id="legal-datenschutz-content">
                  {/* DSGVO Guest Names Notice */}
                  <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#D4AF37]/40 space-y-2">
                    <div className="flex items-center gap-2 text-[#8B6508]">
                      <UserCheck className="w-5 h-5 flex-shrink-0" />
                      <h4 className="font-serif text-base font-bold text-[#2C2623]">
                        Gästeliste & DSGVO-Hinweis (Pseudonymisierung)
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E4135]">
                      Auf dieser Webseite existieren <strong>keine vollständigen Klarnamen</strong> (keine Kombination aus vollem Vor- und Nachnamen). 
                      Zur Platzfindung und Orientierung der Hochzeitsgäste werden ausschließlich <strong>Vornamen und maximal ein einzelner Buchstabe des Nachnamens</strong> (z.&nbsp;B. <em>Anna S.</em>, <em>Markus B.</em>) verwendet.
                    </p>
                    <p className="text-xs text-[#7A6A5C]">
                      Es werden keine Adressen, Telefonnummern, Geburtsdaten oder sonstigen sensiblen personenbezogenen Daten gespeichert oder verarbeitet.
                    </p>
                  </div>

                  {/* Deactivation Notice after Wedding */}
                  <div className="p-4 rounded-xl bg-[#FFF9ED] border border-[#E2CA92] space-y-1.5">
                    <div className="flex items-center gap-2 text-[#8B6508]">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                      <h4 className="font-serif text-base font-bold text-[#2C2623]">
                        Löschung & Deaktivierung nach der Hochzeit
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E4135]">
                      Ein paar Tage nach der Hochzeit werden sämtliche Gastdaten und Namen sowie alle Verlinkungen (zur Spotify-Playlist und zur Hochzeitsfoto-App) vollständig von dieser Website entfernt und dauerhaft deaktiviert.
                    </p>
                  </div>

                  {/* External Links Disclaimer: Spotify & Hochzeitsfotoapp */}
                  <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E8DFC9] space-y-2">
                    <div className="flex items-center gap-2 text-[#2C2623]">
                      <ExternalLink className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                      <h4 className="font-serif text-base font-bold text-[#2C2623]">
                        Verlinkungen zu Spotify & Hochzeitsfoto-App
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E4135]">
                      Die Verwendung und der Aufruf der externen Verlinkungen (wie beispielsweise zu <strong>Spotify</strong> für Musikwünsche oder der <strong>Hochzeitsfoto-App</strong> zum Teilen und Betrachten von Fotos) geschieht auf <strong>eigene Verantwortung</strong> der Nutzer.
                    </p>
                    <p className="text-xs text-[#7A6A5C]">
                      Beim Anklicken dieser externen Links verlassen Sie diese private Seite. Für die dortige Datenverarbeitung, Nutzungsbedingungen und Datenschutzrichtlinien sind ausschließlich die jeweiligen Anbieter der externen Dienste verantwortlich.
                    </p>
                  </div>

                  {/* Server logs & Local Storage */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8DFC9] text-xs text-[#6E5D4F] space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-[#2C2623]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Keine Cookies oder Tracking-Tools</span>
                    </div>
                    <p>
                      Diese Website verwendet keine Analyse-Tools (wie Google Analytics) und setzt keine Marketing-Cookies. Alle Darstellungen erfolgen clientseitig im Webbrowser.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#EEDCBA] bg-[#FAF7F0] flex justify-end">
              <button
                id="legal-modal-ok-btn"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-medium text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
              >
                Verstanden & Schließen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
