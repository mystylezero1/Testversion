import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Edit2,
  MoveUp,
  MoveDown,
  UserPlus,
  Check,
  AlertCircle,
  Sparkles,
  Search,
  RotateCcw,
  KeyRound,
  ListFilter,
  Layers,
  FileSpreadsheet,
  Download,
  Upload,
  FileCode2,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FolderLock,
  GitBranch,
} from 'lucide-react';
import { Table, Guest, WeddingQuote, TaxiService } from '../types';
import { formatGuestDisplayName } from '../utils/nameHelper';
import { exportGuestsToExcel, downloadExcelTemplate, parseUploadedExcel, ParsedGuestResult } from '../utils/excelHelper';
import {
  AppLinksConfig,
  generateMockDataTsCode,
  downloadMockDataFile,
  downloadFullBackupJson,
  parseBackupJson,
} from '../utils/githubExportHelper';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: Table[];
  guests: Guest[];
  onAddGuest: (newGuest: Omit<Guest, 'id'>, insertIndex?: number) => void;
  onUpdateGuest: (updatedGuest: Guest) => void;
  onDeleteGuest: (guestId: string) => void;
  onReorderGuest: (tableId: string, fromIndex: number, toIndex: number) => void;
  onImportGuests?: (importedGuests: Guest[], replaceExisting: boolean) => void;
  onResetToDefaults?: () => void;
  appLinks: AppLinksConfig;
  onUpdateAppLinks: (newLinks: AppLinksConfig) => void;
  quotes?: WeddingQuote[];
  taxiServices?: TaxiService[];
}

type AdminTab = 'tables' | 'allGuests' | 'excel' | 'github' | 'links';

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({
  isOpen,
  onClose,
  tables,
  guests,
  onAddGuest,
  onUpdateGuest,
  onDeleteGuest,
  onReorderGuest,
  onImportGuests,
  onResetToDefaults,
  appLinks,
  onUpdateAppLinks,
  quotes = [],
  taxiServices = [],
}) => {
  // Simple PIN authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('tables');

  // Selected table in admin view
  const [activeTableId, setActiveTableId] = useState<string>(tables[0]?.id || 't-1');
  const [searchTerm, setSearchTerm] = useState('');

  // Add / Edit form state
  const [isAdding, setIsAdding] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formGroup, setFormGroup] = useState('');
  const [formRole, setFormRole] = useState<Guest['role']>('guest');
  const [formInsertIndex, setFormInsertIndex] = useState<number>(-1);

  // Excel Upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const backupInputRef = useRef<HTMLInputElement | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [isParsingExcel, setIsParsingExcel] = useState(false);
  const [excelPreview, setExcelPreview] = useState<ParsedGuestResult | null>(null);
  const [excelError, setExcelError] = useState<string | null>(null);
  const [replaceOnImport, setReplaceOnImport] = useState(true);

  // App Links state
  const [tempSpotify, setTempSpotify] = useState(appLinks.spotifyPlaylist);
  const [tempPhotoApp, setTempPhotoApp] = useState(appLinks.photoApp);
  const [linksSaveSuccess, setLinksSaveSuccess] = useState(false);

  // GitHub Code Copy state
  const [copiedCode, setCopiedCode] = useState(false);
  const [jsonBackupSuccess, setJsonBackupSuccess] = useState(false);
  const [backupRestoreMessage, setBackupRestoreMessage] = useState<string | null>(null);

  const currentTable = tables.find((t) => t.id === activeTableId) || tables[0];
  const tableGuests = guests.filter((g) => g.tableId === activeTableId);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      pinInput === '2026' ||
      pinInput === '1234' ||
      pinInput === '0000' ||
      pinInput.toLowerCase() === 'sven' ||
      pinInput.toLowerCase() === 'admin'
    ) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormGroup('');
    setFormRole('guest');
    setFormInsertIndex(-1);
    setIsAdding(false);
    setEditingGuestId(null);
  };

  const handleStartAdd = (insertAt?: number) => {
    resetForm();
    if (typeof insertAt === 'number') {
      setFormInsertIndex(insertAt);
    } else {
      setFormInsertIndex(-1);
    }
    setIsAdding(true);
  };

  const handleStartEdit = (guest: Guest) => {
    resetForm();
    setEditingGuestId(guest.id);
    setFormName(guest.name);
    setFormGroup(guest.group || '');
    setFormRole(guest.role || 'guest');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !currentTable) return;

    onAddGuest(
      {
        name: formName.trim(),
        tableId: currentTable.id,
        tableName: currentTable.name,
        seat: tableGuests.length + 1,
        group: formGroup.trim() || undefined,
        role: formRole,
      },
      formInsertIndex >= 0 ? formInsertIndex : undefined
    );

    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuestId || !formName.trim()) return;

    const guestToUpdate = guests.find((g) => g.id === editingGuestId);
    if (!guestToUpdate) return;

    onUpdateGuest({
      ...guestToUpdate,
      name: formName.trim(),
      group: formGroup.trim() || undefined,
      role: formRole,
    });

    resetForm();
  };

  // --- Excel handlers ---
  const handleExcelFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFile(file);
    setExcelError(null);
    setIsParsingExcel(true);

    try {
      const result = await parseUploadedExcel(file, tables);
      setExcelPreview(result);
    } catch (err: any) {
      setExcelError(err.message || 'Fehler beim Lesen der Excel-Datei.');
      setExcelPreview(null);
    } finally {
      setIsParsingExcel(false);
    }
  };

  const handleApplyExcelImport = () => {
    if (!excelPreview || !onImportGuests) return;

    const convertedGuests: Guest[] = excelPreview.guests.map((g, idx) => ({
      ...g,
      id: `g-excel-${Date.now()}-${idx}`,
    }));

    onImportGuests(convertedGuests, replaceOnImport);
    setExcelFile(null);
    setExcelPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert(`Erfolg: ${convertedGuests.length} Gäste wurden erfolgreich in den Sitzplan importiert!`);
  };

  // --- App Links handler ---
  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppLinks({
      spotifyPlaylist: tempSpotify.trim(),
      photoApp: tempPhotoApp.trim(),
    });
    setLinksSaveSuccess(true);
    setTimeout(() => setLinksSaveSuccess(false), 3000);
  };

  // --- GitHub Code copy ---
  const handleCopyGitHubCode = () => {
    const code = generateMockDataTsCode(tables, guests, appLinks, quotes, taxiServices);
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    });
  };

  // --- Backup JSON handler ---
  const handleBackupFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const backupData = await parseBackupJson(file);
      if (onImportGuests && backupData.guests) {
        onImportGuests(backupData.guests, true);
      }
      if (backupData.appLinks) {
        onUpdateAppLinks(backupData.appLinks);
        setTempSpotify(backupData.appLinks.spotifyPlaylist);
        setTempPhotoApp(backupData.appLinks.photoApp);
      }
      setBackupRestoreMessage(`Erfolgreich wiederhergestellt: ${backupData.guests.length} Gäste vom ${new Date(backupData.exportDate).toLocaleDateString('de-DE')}`);
      setTimeout(() => setBackupRestoreMessage(null), 5000);
    } catch (err: any) {
      alert(`Fehler beim Wiederherstellen: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#FFFDF9] border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2C2623] via-[#3D352F] to-[#2C2623] text-white flex items-center justify-between border-b border-[#D4AF37]/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37] text-white flex items-center justify-center font-bold text-sm shadow-md">
                <Shield className="w-5 h-5 text-[#2C2623]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF0D7]">
                    Admin-Konsole: Sitzordnung & Gästeverwaltung
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/30 text-[#FAF0D7] border border-[#D4AF37]/40 font-mono">
                    {tables.length} Tische • {guests.length} Gäste
                  </span>
                </div>
                <p className="text-xs text-[#E6CA92]">
                  Sitzplatznummern, Excel Upload/Download, GitHub-Sicherung & App-Links
                </p>
              </div>
            </div>

            <button
              id="admin-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#FAF0D7]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Admin-Bereich schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#FCFAF6]">
            {!isAuthenticated ? (
              /* PIN Login screen */
              <div className="max-w-sm mx-auto py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF0D7] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#B8860B] shadow-sm">
                  <KeyRound className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2C2623]">
                    Admin-PIN eingeben
                  </h4>
                  <p className="text-xs text-[#8C7A6B] mt-1">
                    Bitte gib den PIN-Code ein, um Tische, Excel und GitHub-Sicherungen zu verwalten. (Standard: <strong>2026</strong> oder <strong>1234</strong>)
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    id="admin-pin-input"
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="PIN eingeben (z. B. 2026)"
                    className="w-full text-center tracking-widest text-lg font-bold py-3 rounded-xl border border-[#D4AF37]/50 bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none"
                  />

                  {pinError && (
                    <div className="text-xs text-red-600 font-medium flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Falscher PIN-Code. Bitte erneut versuchen.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-sm shadow hover:shadow-md transition-all cursor-pointer"
                  >
                    Anmelden
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin Management View */
              <div className="space-y-5">
                {/* Admin Tab Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFC9] pb-3">
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#FAF0D7] border border-[#D4AF37]/40 text-xs gap-1">
                    <button
                      id="tab-btn-tables"
                      onClick={() => setActiveTab('tables')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        activeTab === 'tables'
                          ? 'bg-white text-[#8B6508] shadow-sm'
                          : 'text-[#6B5A4D] hover:text-[#2C2623]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Tische & Sitzplätze</span>
                    </button>

                    <button
                      id="tab-btn-all-guests"
                      onClick={() => setActiveTab('allGuests')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        activeTab === 'allGuests'
                          ? 'bg-white text-[#8B6508] shadow-sm'
                          : 'text-[#6B5A4D] hover:text-[#2C2623]'
                      }`}
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                      <span>Gästeliste ({guests.length})</span>
                    </button>

                    <button
                      id="tab-btn-excel"
                      onClick={() => setActiveTab('excel')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        activeTab === 'excel'
                          ? 'bg-white text-[#8B6508] shadow-sm'
                          : 'text-[#6B5A4D] hover:text-[#2C2623]'
                      }`}
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>Excel Import/Export</span>
                    </button>

                    <button
                      id="tab-btn-github"
                      onClick={() => setActiveTab('github')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        activeTab === 'github'
                          ? 'bg-white text-[#8B6508] shadow-sm'
                          : 'text-[#6B5A4D] hover:text-[#2C2623]'
                      }`}
                    >
                      <GitBranch className="w-3.5 h-3.5 text-[#1976D2]" />
                      <span>GitHub-Sicherung</span>
                    </button>

                    <button
                      id="tab-btn-links"
                      onClick={() => setActiveTab('links')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        activeTab === 'links'
                          ? 'bg-white text-[#8B6508] shadow-sm'
                          : 'text-[#6B5A4D] hover:text-[#2C2623]'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-[#8E24AA]" />
                      <span>App-Links & URLs</span>
                    </button>
                  </div>

                  {onResetToDefaults && (
                    <button
                      onClick={() => {
                        if (window.confirm('Möchtest du wirklich alle Tische und Gäste auf den Ursprungszustand zurücksetzen?')) {
                          onResetToDefaults();
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-medium transition-colors cursor-pointer ml-auto"
                      title="Alle Tische & Gäste auf Standard zurücksetzen"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Zurücksetzen</span>
                    </button>
                  )}
                </div>

                {/* TAB 1: TABLE BY TABLE MANAGEMENT WITH PRECISE SEAT ORDER & INSERTION */}
                {activeTab === 'tables' && (
                  <div className="space-y-4">
                    {/* Table Pills Switcher */}
                    <div>
                      <label className="block text-xs font-bold text-[#6B5A4D] uppercase tracking-wider mb-2">
                        Tisch auswählen ({tables.length} Tische):
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {tables.map((t) => {
                          const count = guests.filter((g) => g.tableId === t.id).length;
                          const isActive = t.id === activeTableId;
                          return (
                            <button
                              key={t.id}
                              onClick={() => {
                                setActiveTableId(t.id);
                                resetForm();
                              }}
                              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                                isActive
                                  ? 'bg-[#2C2623] text-[#FAF0D7] border-[#D4AF37] shadow-sm'
                                  : 'bg-white text-[#5C4A3A] border-[#E8DFC9] hover:bg-[#FAF0D7]'
                              }`}
                            >
                              <div className="font-bold">Tisch {t.number}</div>
                              <div className="text-[10px] opacity-80">{count}/{t.seatsCount} Plätze</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Current Table Header Info */}
                    {currentTable && (
                      <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-[#2C2623]">
                              {currentTable.name}
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-[#FAF0D7] text-[#8B6508] font-medium border border-[#D4AF37]/30">
                              {tableGuests.length} von {currentTable.seatsCount} belegt
                            </span>
                          </div>
                          {currentTable.description && (
                            <p className="text-xs text-[#8C7A6B] mt-0.5">{currentTable.description}</p>
                          )}
                        </div>

                        {!isAdding && !editingGuestId && (
                          <button
                            id="admin-add-guest-btn"
                            onClick={() => handleStartAdd(-1)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bold text-xs shadow transition-all cursor-pointer"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Gast an Tisch {currentTable.number} hinzufügen</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Add / Edit Inline Form */}
                    {(isAdding || editingGuestId) && (
                      <form
                        onSubmit={isAdding ? handleSaveAdd : handleSaveEdit}
                        className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF5E8] border-2 border-[#D4AF37] shadow-md space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>
                              {isAdding
                                ? formInsertIndex >= 0
                                  ? `Gast an Position ${formInsertIndex + 1} einreihen`
                                  : `Neuen Gast am Ende von Tisch ${currentTable?.number} hinzufügen`
                                : 'Gast bearbeiten'}
                            </span>
                          </h5>
                          <button
                            type="button"
                            onClick={resetForm}
                            className="text-xs text-[#8C7A6B] hover:text-[#2C2623]"
                          >
                            Abbrechen
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#5C4A3A] mb-1">
                              Name (z.B. "Laura W." oder "Sven") *
                            </label>
                            <input
                              type="text"
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Vorname & ggf. Nachnamen-Initial"
                              className="w-full p-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-xs text-[#2C2623] focus:border-[#D4AF37] outline-none"
                            />
                            <span className="text-[10px] text-[#8C7A6B] mt-0.5 block">
                              Tipp: Der Nachname-Buchstabe wird in der Gästesicht nur bei Namensgleichheit angezeigt.
                            </span>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#5C4A3A] mb-1">
                              Gruppe / Anmerkung (optional)
                            </label>
                            <input
                              type="text"
                              value={formGroup}
                              onChange={(e) => setFormGroup(e.target.value)}
                              placeholder="z.B. Familie, Freunde, Kollegen"
                              className="w-full p-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-xs text-[#2C2623] focus:border-[#D4AF37] outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 rounded-xl border border-[#E8DFC9] bg-white text-xs font-medium text-[#5C4A3A] hover:bg-[#FAF0D7] cursor-pointer"
                          >
                            Abbrechen
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#2C2623] text-[#FAF0D7] font-bold text-xs hover:bg-[#3D352F] border border-[#D4AF37] shadow cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{isAdding ? 'Gast speichern' : 'Änderung übernehmen'}</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Table Guest List with Seat Numbers & Up/Down/Insert In-between */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#6B5A4D] px-1">
                        <span>Sitzplätze & Reihenfolge ({tableGuests.length} Gäste)</span>
                        <span className="text-[11px] text-[#8C7A6B]">
                          💡 Platznummern sind nur hier im Admin sichtbar
                        </span>
                      </div>

                      {tableGuests.length === 0 ? (
                        <div className="p-6 text-center text-xs text-[#8C7A6B] bg-white rounded-2xl border border-dashed border-[#E8DFC9]">
                          Dieser Tisch hat noch keine eingetragenen Gäste.
                        </div>
                      ) : (
                        tableGuests.map((guest, idx) => (
                          <React.Fragment key={guest.id}>
                            {/* Insert in-between button */}
                            <div className="group relative flex items-center justify-center my-0.5">
                              <button
                                onClick={() => handleStartAdd(idx)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-0.5 rounded-full bg-[#FAF0D7] border border-[#D4AF37] text-[#8B6508] text-[10px] font-bold shadow-xs hover:bg-[#D4AF37] hover:text-white cursor-pointer z-10 flex items-center gap-1"
                                title="Hier dazwischen einen neuen Gast einfügen"
                              >
                                <Plus className="w-2.5 h-2.5" />
                                <span>Dazwischen einreihen</span>
                              </button>
                            </div>

                            {/* Guest Row */}
                            <div
                              id={`admin-guest-row-${guest.id}`}
                              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E8DFC9] hover:border-[#D4AF37]/60 shadow-xs gap-3"
                            >
                              <div className="flex items-center gap-3">
                                {/* Numbered Seat Badge for Admin */}
                                <div className="w-9 h-9 rounded-xl bg-[#FAF0D7] border border-[#D4AF37]/50 text-[#8B6508] font-bold text-xs flex flex-col items-center justify-center flex-shrink-0">
                                  <span>#{guest.globalSeat || (idx + 1)}</span>
                                  {guest.globalSeat && (
                                    <span className="text-[8px] opacity-70 font-normal">Plan</span>
                                  )}
                                </div>

                                <div>
                                  <div className="font-bold text-sm text-[#2C2623] flex items-center gap-2">
                                    <span>{guest.name}</span>
                                    {guest.isMarkedSeat && (
                                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFF9C4] border border-[#FBC02D] text-[#827717] font-bold">
                                        Markiert
                                      </span>
                                    )}
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FAF6EE] text-[#8C7A6B] font-normal">
                                      Anzeige: {formatGuestDisplayName(guest, guests)}
                                    </span>
                                  </div>
                                  {guest.group && (
                                    <div className="text-xs text-[#8C7A6B]">{guest.group}</div>
                                  )}
                                </div>
                              </div>

                              {/* Actions: Reorder up/down, Edit, Delete */}
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => idx > 0 && onReorderGuest(activeTableId, idx, idx - 1)}
                                  disabled={idx === 0}
                                  className="p-1.5 rounded-lg text-[#5C4A3A] hover:bg-[#FAF0D7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  title="Einen Platz nach oben verschieben"
                                >
                                  <MoveUp className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => idx < tableGuests.length - 1 && onReorderGuest(activeTableId, idx, idx + 1)}
                                  disabled={idx === tableGuests.length - 1}
                                  className="p-1.5 rounded-lg text-[#5C4A3A] hover:bg-[#FAF0D7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  title="Einen Platz nach unten verschieben"
                                >
                                  <MoveDown className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStartEdit(guest)}
                                  className="p-1.5 rounded-lg text-[#8B6508] hover:bg-[#FAF0D7] transition-colors cursor-pointer"
                                  title="Gast bearbeiten"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Gast "${guest.name}" wirklich von Tisch ${currentTable?.number} entfernen?`)) {
                                      onDeleteGuest(guest.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Gast entfernen"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: MASTER GUEST LIST */}
                {activeTab === 'allGuests' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8860B]" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="In gesamter Gästeliste suchen..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-xs text-[#2C2623] focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E8DFC9] p-3 divide-y divide-[#F2EADB] max-h-[50vh] overflow-y-auto">
                      {guests
                        .filter((g) => {
                          const s = searchTerm.toLowerCase();
                          return (
                            !s ||
                            g.name.toLowerCase().includes(s) ||
                            g.tableName.toLowerCase().includes(s) ||
                            (g.group && g.group.toLowerCase().includes(s))
                          );
                        })
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((guest) => (
                          <div
                            key={guest.id}
                            className="py-2.5 px-2 flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="font-bold text-[#2C2623]">
                                {guest.name}
                                <span className="text-[11px] font-normal text-[#8C7A6B] ml-2">
                                  (Anzeige: {formatGuestDisplayName(guest, guests)})
                                </span>
                              </div>
                              <div className="text-[11px] text-[#7A6A5C]">
                                {guest.tableName} • Platz #{guest.seat}
                                {guest.group && ` • Gruppe: ${guest.group}`}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setActiveTableId(guest.tableId);
                                  setActiveTab('tables');
                                  handleStartEdit(guest);
                                }}
                                className="p-1.5 rounded-lg text-[#8B6508] hover:bg-[#FAF0D7] cursor-pointer"
                                title="An Tisch bearbeiten"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Gast "${guest.name}" wirklich löschen?`)) {
                                    onDeleteGuest(guest.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                                title="Gast löschen"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: EXCEL IMPORT & EXPORT */}
                {activeTab === 'excel' && (
                  <div className="space-y-6">
                    {/* Excel Download Section */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-xs space-y-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#2C2623]">
                        <Download className="w-4 h-4 text-[#2E7D32]" />
                        <span>Gästeliste als Excel herunterladen</span>
                      </div>
                      <p className="text-xs text-[#7A6A5C]">
                        Lade die aktuelle Gästeliste inklusive Tischnummern, Sitzplätzen und Gruppen im Excel-Format (.xlsx) herunter.
                      </p>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          id="btn-download-excel"
                          onClick={() => exportGuestsToExcel(guests, tables)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow transition-all cursor-pointer"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Gästeliste per Excel herunterladen (.xlsx)</span>
                        </button>

                        <button
                          id="btn-download-template"
                          onClick={() => downloadExcelTemplate(tables)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF0D7] border border-[#D4AF37]/60 text-[#8B6508] font-semibold text-xs shadow-xs transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Leere Excel-Muster-Vorlage laden</span>
                        </button>
                      </div>
                    </div>

                    {/* Excel Upload Section */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-dashed border-[#D4AF37]/70 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#2C2623]">
                        <Upload className="w-4 h-4 text-[#B8860B]" />
                        <span>Gästeliste per Excel hochladen & importieren</span>
                      </div>
                      <p className="text-xs text-[#7A6A5C]">
                        Lade eine Excel-Datei (.xlsx, .xls) oder CSV-Datei hoch. Die Spalten <em>Name</em>, <em>Tisch-Nr</em> und <em>Sitzplatz-Nr</em> werden automatisch erkannt und zugeordnet.
                      </p>

                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".xlsx, .xls, .csv"
                          onChange={handleExcelFileSelect}
                          className="hidden"
                          id="excel-file-input"
                        />
                        <label
                          htmlFor="excel-file-input"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C2623] hover:bg-[#3D352F] text-[#FAF0D7] font-bold text-xs shadow transition-all cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-[#D4AF37]" />
                          <span>Excel-Datei auswählen...</span>
                        </label>
                        {excelFile && (
                          <span className="text-xs font-medium text-[#2C2623]">
                            📄 {excelFile.name}
                          </span>
                        )}
                      </div>

                      {isParsingExcel && (
                        <div className="text-xs text-[#8B6508] flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Excel-Datei wird eingelesen und überprüft...</span>
                        </div>
                      )}

                      {excelError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{excelError}</span>
                        </div>
                      )}

                      {/* Excel Import Preview */}
                      {excelPreview && (
                        <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#D4AF37]/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold text-[#2C2623] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span>{excelPreview.totalParsed} Gäste in der Excel-Datei erkannt</span>
                            </div>
                          </div>

                          {/* Import Mode Radio */}
                          <div className="flex items-center gap-4 text-xs text-[#5C4A3A] pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="importMode"
                                checked={replaceOnImport}
                                onChange={() => setReplaceOnImport(true)}
                                className="accent-[#B8860B]"
                              />
                              <span><strong>Bestehende Liste ersetzen</strong> (empfohlen)</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="importMode"
                                checked={!replaceOnImport}
                                onChange={() => setReplaceOnImport(false)}
                                className="accent-[#B8860B]"
                              />
                              <span>Zu bestehender Liste hinzufügen</span>
                            </label>
                          </div>

                          {/* Preview sample */}
                          <div className="max-h-40 overflow-y-auto bg-white rounded-xl border border-[#E8DFC9] p-2 text-[11px] space-y-1">
                            {excelPreview.guests.slice(0, 8).map((g, idx) => (
                              <div key={idx} className="flex justify-between py-0.5 border-b border-[#F2EADB] last:border-none">
                                <span className="font-semibold text-[#2C2623]">{g.name}</span>
                                <span className="text-[#8C7A6B]">{g.tableName} (Platz #{g.seat})</span>
                              </div>
                            ))}
                            {excelPreview.guests.length > 8 && (
                              <div className="text-center text-[#8C7A6B] italic pt-1">
                                ... und {excelPreview.guests.length - 8} weitere Gäste
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => {
                                setExcelFile(null);
                                setExcelPreview(null);
                              }}
                              className="px-3.5 py-1.5 rounded-xl border border-[#E8DFC9] text-xs text-[#5C4A3A] hover:bg-white"
                            >
                              Abbrechen
                            </button>
                            <button
                              id="btn-apply-excel-import"
                              onClick={handleApplyExcelImport}
                              className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bold text-xs shadow cursor-pointer flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              <span>Gästeliste jetzt in Sitzplan übernehmen</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 4: GITHUB BACKUP & CODE EXPORT (Manipulationssicher) */}
                {activeTab === 'github' && (
                  <div className="space-y-5">
                    {/* Security Info Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F0F7FF] via-[#E8F1FC] to-[#F4F9FF] border border-[#90CAF9] shadow-xs space-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#0D47A1]">
                        <FolderLock className="w-4 h-4 text-[#1976D2]" />
                        <span>Manipulationssichere Speicherung auf GitHub (2FA & Versionsschutz)</span>
                      </div>
                      <p className="text-xs text-[#1E3A8A] leading-relaxed">
                        Da GitHub über ein separates Passwort und <strong>Zwei-Faktor-Authentifizierung (2FA)</strong> geschützt ist, können deine Daten und Gästelisten dort absolut manipulations- und ausfallsicher archiviert werden.
                      </p>
                    </div>

                    {/* Download & Copy Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Action 1: Download mockData.ts */}
                      <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-xs space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-xs text-[#2C2623] flex items-center gap-1.5">
                            <FileCode2 className="w-4 h-4 text-[#B8860B]" />
                            <span>1. mockData.ts herunterladen</span>
                          </div>
                          <p className="text-[11px] text-[#7A6A5C] mt-1">
                            Erstellt die Datei <code>src/data/mockData.ts</code> mit allen aktuellen Tischen, Gästen und URLs, bereit für deinen GitHub-Commit.
                          </p>
                        </div>
                        <button
                          id="btn-download-mockdata-ts"
                          onClick={() => downloadMockDataFile(tables, guests, appLinks, quotes, taxiServices)}
                          className="w-full py-2.5 rounded-xl bg-[#2C2623] hover:bg-[#3D352F] text-[#FAF0D7] font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-[#D4AF37]" />
                          <span>mockData.ts herunterladen</span>
                        </button>
                      </div>

                      {/* Action 2: Copy Code to Clipboard */}
                      <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-xs space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-xs text-[#2C2623] flex items-center gap-1.5">
                            <Copy className="w-4 h-4 text-[#B8860B]" />
                            <span>2. Code direkt kopieren</span>
                          </div>
                          <p className="text-[11px] text-[#7A6A5C] mt-1">
                            Kopiert den vollständigen TypeScript-Code in die Zwischenablage zum direkten Einfügen auf GitHub.
                          </p>
                        </div>
                        <button
                          id="btn-copy-github-code"
                          onClick={handleCopyGitHubCode}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs shadow flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            copiedCode
                              ? 'bg-green-600 text-white'
                              : 'bg-[#D4AF37] hover:bg-[#B8860B] text-white'
                          }`}
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Code kopiert!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Code in Zwischenablage kopieren</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Full JSON Backup & Restore */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E8DFC9] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#2C2623] flex items-center gap-1.5">
                          <Save className="w-4 h-4 text-[#2E7D32]" />
                          <span>Vollständiges JSON-Backup (Tische, Gäste, Links)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          id="btn-download-json-backup"
                          onClick={() => {
                            downloadFullBackupJson(tables, guests, appLinks, quotes, taxiServices);
                            setJsonBackupSuccess(true);
                            setTimeout(() => setJsonBackupSuccess(false), 3000);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6C4] border border-[#D4AF37] text-[#8B6508] font-bold text-xs shadow-xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>JSON-Backup herunterladen</span>
                        </button>

                        <input
                          type="file"
                          ref={backupInputRef}
                          accept=".json"
                          onChange={handleBackupFileSelect}
                          className="hidden"
                          id="json-backup-input"
                        />
                        <label
                          htmlFor="json-backup-input"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F3] border border-[#E8DFC9] text-[#5C4A3A] font-medium text-xs shadow-xs cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span>JSON-Backup wiederherstellen (.json)</span>
                        </label>
                      </div>

                      {backupRestoreMessage && (
                        <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>{backupRestoreMessage}</span>
                        </div>
                      )}
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8DFC9] text-xs text-[#5C4A3A] space-y-2">
                      <div className="font-bold text-[#2C2623]">
                        Kurzanleitung: So sicherst du den Stand in GitHub:
                      </div>
                      <ol className="list-decimal pl-5 space-y-1 text-[11px] text-[#7A6A5C]">
                        <li>Klicke oben auf <strong>"mockData.ts herunterladen"</strong> oder <strong>"Code in Zwischenablage kopieren"</strong>.</li>
                        <li>Öffne dein GitHub-Repository in einem neuen Tab und navigiere zur Datei <code>src/data/mockData.ts</code>.</li>
                        <li>Ersetze den Inhalt durch den neuen Stand und klicke auf <strong>"Commit changes"</strong>.</li>
                        <li>Damit ist dein Datenstand dauerhaft in GitHub gesichert und vor jeglichem Datenverlust geschützt!</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* TAB 5: APP LINKS & URLS (Spotify & Foto-App) */}
                {activeTab === 'links' && (
                  <form onSubmit={handleSaveLinks} className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white border border-[#E8DFC9] shadow-xs space-y-4">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#8B6508] mb-1">
                          Externe App-Links konfigurieren
                        </h4>
                        <p className="text-xs text-[#7A6A5C]">
                          Hier kannst du die Links für die Spotify-Playlist und die Foto-Upload-App (z. B. Google Fotos, Wedbox, SamSaidYes) anpassen.
                        </p>
                      </div>

                      {/* Spotify Link */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#2C2623]">
                          Spotify Playlist URL:
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="admin-spotify-url-input"
                            type="url"
                            value={tempSpotify}
                            onChange={(e) => setTempSpotify(e.target.value)}
                            placeholder="https://open.spotify.com/playlist/..."
                            className="flex-1 p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#FCFAF6] text-xs text-[#2C2623] focus:border-[#D4AF37] outline-none"
                          />
                          {tempSpotify && (
                            <a
                              href={tempSpotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6C4] border border-[#D4AF37] text-[#8B6508] font-medium text-xs flex items-center gap-1"
                              title="Link im neuen Tab testen"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Testen</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Photo App Link */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#2C2623]">
                          Hochzeitsfoto-App URL (Google Photos, Wedbox, etc.):
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="admin-photoapp-url-input"
                            type="url"
                            value={tempPhotoApp}
                            onChange={(e) => setTempPhotoApp(e.target.value)}
                            placeholder="https://photos.app.goo.gl/... oder https://wedbox.com/..."
                            className="flex-1 p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#FCFAF6] text-xs text-[#2C2623] focus:border-[#D4AF37] outline-none"
                          />
                          {tempPhotoApp && (
                            <a
                              href={tempPhotoApp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6C4] border border-[#D4AF37] text-[#8B6508] font-medium text-xs flex items-center gap-1"
                              title="Link im neuen Tab testen"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Testen</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {linksSaveSuccess ? (
                          <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Links erfolgreich gespeichert!</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#8C7A6B]">
                            Die Links werden sofort auf der Hauptseite aktiv.
                          </span>
                        )}

                        <button
                          id="btn-save-app-links"
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#2C2623] hover:bg-[#3D352F] text-[#FAF0D7] font-bold text-xs border border-[#D4AF37] shadow cursor-pointer flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Links speichern</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#FAF6EE] border-t border-[#E8DFC9] flex items-center justify-between flex-shrink-0 text-xs text-[#7A6A5C]">
            <span>Admin-Sitzplatz & GitHub Manager</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#2C2623] text-[#FAF0D7] font-bold text-xs hover:bg-[#3D352F] cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
