/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { GuestSearch } from './components/GuestSearch';
import { SelectedGuestBanner } from './components/SelectedGuestBanner';
import { ActionButtons } from './components/ActionButtons';
import { TaxiRollup } from './components/TaxiRollup';
import { QuoteModal } from './components/QuoteModal';
import { LegalModal } from './components/LegalModal';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { WcPlanModal } from './components/WcPlanModal';
import { SeatingPlan } from './components/SeatingPlan';
import { Footer } from './components/Footer';
import { INITIAL_TABLES, INITIAL_GUESTS, WEDDING_QUOTES, TAXI_SERVICES, APP_LINKS as DEFAULT_APP_LINKS } from './data/mockData';
import { Guest, Table, ViewMode, LegalTab } from './types';
import { AppLinksConfig } from './utils/githubExportHelper';
import { soundEffects } from './utils/soundHelper';

const STORAGE_KEY_GUESTS = 'wedding_app_guests_anja_dino_pdf_154_v2';
const STORAGE_KEY_LINKS = 'wedding_app_links_v2';

export default function App() {
  const [tables] = useState<Table[]>(INITIAL_TABLES);

  // Initialize guests from localStorage or fallback to INITIAL_GUESTS (154 guests across 20 tables for Anja & Dino)
  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GUESTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          return parsed.map((g: Guest) => {
            const tableNumMatch = g.tableName ? g.tableName.match(/\d+/) : null;
            if (tableNumMatch) {
              return { ...g, tableName: `Tisch ${tableNumMatch[0]}` };
            }
            return g;
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GUESTS;
  });

  // App Links state (Spotify & Foto-App)
  const [appLinks, setAppLinks] = useState<AppLinksConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LINKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.spotifyPlaylist || parsed.photoApp) {
          return {
            spotifyPlaylist: parsed.spotifyPlaylist || DEFAULT_APP_LINKS.spotifyPlaylist,
            photoApp: parsed.photoApp || DEFAULT_APP_LINKS.photoApp,
          };
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_APP_LINKS;
  });

  const [quotes] = useState(WEDDING_QUOTES);
  const [taxiServices] = useState(TAXI_SERVICES);

  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [currentWelcomeSpeech, setCurrentWelcomeSpeech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [isTaxiOpen, setIsTaxiOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isWcOpen, setIsWcOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [legalTab, setLegalTab] = useState<LegalTab>('none');
  const [isAdminParam, setIsAdminParam] = useState(false);

  // Check URL parameters for ?admin=true or #admin
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hasAdminQuery = searchParams.get('admin') === 'true';
      const hasAdminHash = window.location.hash.toLowerCase().includes('admin');
      if (hasAdminQuery || hasAdminHash) {
        setIsAdminParam(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  // Persist guest list updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GUESTS, JSON.stringify(guests));
    } catch {
      // ignore
    }
  }, [guests]);

  // Persist app links updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(appLinks));
    } catch {
      // ignore
    }
  }, [appLinks]);

  const handleSelectGuest = (guest: Guest | null) => {
    setSelectedGuest(guest);
    if (guest) {
      soundEffects.playSuccessChime();
      const spokenText = soundEffects.speakWelcomeMessage(
        guest.name,
        guest.tableName
      );
      setCurrentWelcomeSpeech(spokenText);
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.3 },
          colors: ['#D4AF37', '#E6CA92', '#FFF8DC'],
        });
      } catch {
        // safe fallback
      }
    } else {
      soundEffects.stopSpeech();
      setCurrentWelcomeSpeech(null);
    }
  };

  const handleReplaySpeech = () => {
    if (selectedGuest) {
      soundEffects.playSuccessChime();
      const spokenText = soundEffects.speakWelcomeMessage(
        selectedGuest.name,
        selectedGuest.tableName
      );
      setCurrentWelcomeSpeech(spokenText);
    }
  };

  // --- Admin Console Operations ---
  const handleAddGuest = (newGuestData: Omit<Guest, 'id'>, insertIndex?: number) => {
    const tableId = newGuestData.tableId;
    const tableGuests = guests.filter((g) => g.tableId === tableId);
    const newGuestId = `g-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newGuest: Guest = {
      ...newGuestData,
      id: newGuestId,
    };

    let updatedTableGuests: Guest[];
    if (typeof insertIndex === 'number' && insertIndex >= 0 && insertIndex <= tableGuests.length) {
      updatedTableGuests = [...tableGuests];
      updatedTableGuests.splice(insertIndex, 0, newGuest);
    } else {
      updatedTableGuests = [...tableGuests, newGuest];
    }

    // Reassign seats 1..N for this table
    const renumberedTableGuests = updatedTableGuests.map((g, idx) => ({
      ...g,
      seat: idx + 1,
    }));

    // Merge with other tables
    const otherGuests = guests.filter((g) => g.tableId !== tableId);
    setGuests([...otherGuests, ...renumberedTableGuests]);
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === updatedGuest.id ? updatedGuest : g))
    );
  };

  const handleDeleteGuest = (guestId: string) => {
    const targetGuest = guests.find((g) => g.id === guestId);
    if (!targetGuest) return;

    const remainingTableGuests = guests
      .filter((g) => g.tableId === targetGuest.tableId && g.id !== guestId)
      .map((g, idx) => ({ ...g, seat: idx + 1 }));

    const otherGuests = guests.filter((g) => g.tableId !== targetGuest.tableId);
    setGuests([...otherGuests, ...remainingTableGuests]);

    if (selectedGuest?.id === guestId) {
      setSelectedGuest(null);
    }
  };

  const handleReorderGuest = (tableId: string, fromIndex: number, toIndex: number) => {
    const tableGuests = guests.filter((g) => g.tableId === tableId);
    if (fromIndex < 0 || fromIndex >= tableGuests.length || toIndex < 0 || toIndex >= tableGuests.length) {
      return;
    }

    const reordered = [...tableGuests];
    const [movedGuest] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, movedGuest);

    const renumbered = reordered.map((g, idx) => ({
      ...g,
      seat: idx + 1,
    }));

    const otherGuests = guests.filter((g) => g.tableId !== tableId);
    setGuests([...otherGuests, ...renumbered]);
  };

  const handleImportGuests = (importedGuests: Guest[], replaceExisting: boolean) => {
    if (replaceExisting) {
      setGuests(importedGuests);
    } else {
      setGuests((prev) => [...prev, ...importedGuests]);
    }
  };

  const handleResetToDefaults = () => {
    setGuests(INITIAL_GUESTS);
    setAppLinks(DEFAULT_APP_LINKS);
    localStorage.removeItem(STORAGE_KEY_GUESTS);
    localStorage.removeItem(STORAGE_KEY_LINKS);
  };

  const handleOpenQuoteModal = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    setIsQuoteOpen(true);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#E6CA92', '#FAF0D7'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleToggleTaxi = () => {
    setIsTaxiOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2623]">
      {/* Top decorative gold bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#B8860B] via-[#E6CA92] to-[#B8860B]" />

      <main className="flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-4">
        {/* Header Section with View Switcher (Saalplan, Tischkarten) & Admin Trigger */}
        <Header
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          tableCount={tables.length}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isAdminParam={isAdminParam}
        />

        {/* Guest Search Bar */}
        <GuestSearch
          guests={guests}
          selectedGuest={selectedGuest}
          onSelectGuest={handleSelectGuest}
        />

        {/* Selected Guest Highlight Info */}
        <SelectedGuestBanner
          selectedGuest={selectedGuest}
          allGuests={guests}
          welcomeSpeech={currentWelcomeSpeech}
          onReplaySpeech={handleReplaySpeech}
          onClear={() => setSelectedGuest(null)}
        />

        {/* Action Buttons: Spruch, Taxi, WC-Plan, Spotify, Foto-App */}
        <ActionButtons
          onOpenQuoteModal={handleOpenQuoteModal}
          isTaxiOpen={isTaxiOpen}
          onToggleTaxi={handleToggleTaxi}
          onOpenWcModal={() => setIsWcOpen(true)}
          appLinks={appLinks}
        />

        {/* Taxi Rollup */}
        <TaxiRollup
          isOpen={isTaxiOpen}
          onToggle={handleToggleTaxi}
          services={taxiServices}
        />

        {/* Interactive Seating Plan (Saalplan, Tischkarten) */}
        <SeatingPlan
          tables={tables}
          guests={guests}
          selectedGuest={selectedGuest}
          onSelectGuest={handleSelectGuest}
          viewMode={viewMode}
          onOpenWcModal={() => setIsWcOpen(true)}
        />
      </main>

      {/* Footer with Impressum, DSGVO & Admin Link */}
      <Footer
        onOpenLegal={(tab) => setLegalTab(tab)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminParam={isAdminParam}
      />

      {/* Spruch Custom Golden Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        quotes={quotes}
        currentIndex={currentQuoteIndex}
        onNextQuote={handleNextQuote}
      />

      {/* WC Floor Plan Modal */}
      <WcPlanModal
        isOpen={isWcOpen}
        onClose={() => setIsWcOpen(false)}
      />

      {/* Legal & Privacy Modal */}
      <LegalModal
        activeTab={legalTab}
        onClose={() => setLegalTab('none')}
        onSelectTab={(tab) => setLegalTab(tab)}
      />

      {/* Admin Console Modal (Sitzplatzverwaltung, Excel Import/Export, GitHub-Sicherung & App-Links) */}
      <AdminConsoleModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tables={tables}
        guests={guests}
        onAddGuest={handleAddGuest}
        onUpdateGuest={handleUpdateGuest}
        onDeleteGuest={handleDeleteGuest}
        onReorderGuest={handleReorderGuest}
        onImportGuests={handleImportGuests}
        onResetToDefaults={handleResetToDefaults}
        appLinks={appLinks}
        onUpdateAppLinks={setAppLinks}
        quotes={quotes}
        taxiServices={taxiServices}
      />
    </div>
  );
}
