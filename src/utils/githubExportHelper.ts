import { Guest, Table, WeddingQuote, TaxiService } from '../types';

export interface AppLinksConfig {
  spotifyPlaylist: string;
  photoApp: string;
}

export interface FullBackupData {
  version: string;
  exportDate: string;
  exportedBy: string;
  securityNote: string;
  appLinks: AppLinksConfig;
  tables: Table[];
  guests: Guest[];
  quotes: WeddingQuote[];
  taxiServices: TaxiService[];
}

/**
 * Generates the clean TypeScript code for src/data/mockData.ts
 * ready to be committed directly into GitHub.
 */
export const generateMockDataTsCode = (
  tables: Table[],
  guests: Guest[],
  appLinks: AppLinksConfig,
  quotes: WeddingQuote[],
  taxiServices: TaxiService[]
): string => {
  const formattedTables = JSON.stringify(tables, null, 2);
  const formattedGuests = JSON.stringify(guests, null, 2);
  const formattedQuotes = JSON.stringify(quotes, null, 2);
  const formattedTaxis = JSON.stringify(taxiServices, null, 2);
  const formattedAppLinks = JSON.stringify(appLinks, null, 2);

  return `/**
 * @file mockData.ts
 * Automatisch generierter und gesicherter Stand für GitHub.
 * Generiert am: ${new Date().toLocaleString('de-DE')}
 * Gesichert mit GitHub 2FA & Versionskontrolle.
 */

import { Guest, Table, WeddingQuote, TaxiService } from '../types';

export const INITIAL_TABLES: Table[] = ${formattedTables};

export const INITIAL_GUESTS: Guest[] = ${formattedGuests};

export const WEDDING_QUOTES: WeddingQuote[] = ${formattedQuotes};

export const TAXI_SERVICES: TaxiService[] = ${formattedTaxis};

export const APP_LINKS = ${formattedAppLinks};
`;
};

/**
 * Creates and downloads a mockData.ts file for GitHub
 */
export const downloadMockDataFile = (
  tables: Table[],
  guests: Guest[],
  appLinks: AppLinksConfig,
  quotes: WeddingQuote[],
  taxiServices: TaxiService[]
) => {
  const code = generateMockDataTsCode(tables, guests, appLinks, quotes, taxiServices);
  const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mockData.ts';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Creates and downloads a complete JSON backup file
 */
export const downloadFullBackupJson = (
  tables: Table[],
  guests: Guest[],
  appLinks: AppLinksConfig,
  quotes: WeddingQuote[],
  taxiServices: TaxiService[]
) => {
  const backup: FullBackupData = {
    version: '3.0',
    exportDate: new Date().toISOString(),
    exportedBy: 'Sven Weimar-Schmidt (Admin)',
    securityNote: 'Dieser Datenstand ist verschlüsselt auf GitHub über 2FA und geschützte Repositories sicherbar.',
    appLinks,
    tables,
    guests,
    quotes,
    taxiServices,
  };

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  link.download = `Hochzeit_Sicherung_GitHub_${dateStr}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Parses a JSON backup file
 */
export const parseBackupJson = async (file: File): Promise<FullBackupData> => {
  const text = await file.text();
  const parsed = JSON.parse(text);

  if (!parsed.guests || !Array.isArray(parsed.guests)) {
    throw new Error('Ungültiges Sicherungsformat: Keine Gästeliste gefunden.');
  }

  return {
    version: parsed.version || '3.0',
    exportDate: parsed.exportDate || new Date().toISOString(),
    exportedBy: parsed.exportedBy || 'Admin',
    securityNote: parsed.securityNote || '',
    appLinks: parsed.appLinks || {
      spotifyPlaylist: 'https://open.spotify.com',
      photoApp: 'https://photos.google.com',
    },
    tables: parsed.tables || [],
    guests: parsed.guests,
    quotes: parsed.quotes || [],
    taxiServices: parsed.taxiServices || [],
  };
};
