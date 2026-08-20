import * as XLSX from 'xlsx';
import { Guest, Table } from '../types';
import { formatGuestDisplayName } from './nameHelper';

export interface ParsedGuestResult {
  guests: Omit<Guest, 'id'>[];
  warnings: string[];
  totalParsed: number;
}

/**
 * Exports the current guests list to an Excel (.xlsx) file
 */
export const exportGuestsToExcel = (
  guests: Guest[],
  tables: Table[],
  fileName = 'Hochzeit_Gaesteliste_Sitzplan.xlsx'
) => {
  // Sort by table number, then seat number
  const sortedGuests = [...guests].sort((a, b) => {
    const tableA = tables.find((t) => t.id === a.tableId)?.number || 999;
    const tableB = tables.find((t) => t.id === b.tableId)?.number || 999;
    if (tableA !== tableB) return tableA - tableB;
    return a.seat - b.seat;
  });

  const rows = sortedGuests.map((g) => {
    const table = tables.find((t) => t.id === g.tableId);
    return {
      'Tisch-Nr': table ? table.number : g.tableId.replace('t-', ''),
      'Tisch-Name': g.tableName,
      'Sitzplatz-Nr': g.seat,
      'Plan-Sitz (1-154)': g.globalSeat || g.seat,
      'Vollständiger Name': g.name,
      'Anzeigename (DSGVO)': formatGuestDisplayName(g, guests),
      'Gruppe / Kategorie': g.group || 'Gäste',
      'Rolle': g.role || 'guest',
      'Notizen': g.notes || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Column width styling
  worksheet['!cols'] = [
    { wch: 10 }, // Tisch-Nr
    { wch: 28 }, // Tisch-Name
    { wch: 12 }, // Sitzplatz-Nr
    { wch: 16 }, // Plan-Sitz
    { wch: 14 }, // Markierter Sitz
    { wch: 24 }, // Vollständiger Name
    { wch: 22 }, // Anzeigename
    { wch: 20 }, // Gruppe
    { wch: 14 }, // Rolle
    { wch: 25 }, // Notizen
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Gästeliste');

  // Also add a Table Overview sheet
  const tableSummaryRows = tables.map((t) => {
    const count = guests.filter((g) => g.tableId === t.id).length;
    return {
      'Tisch-Nr': t.number,
      'Tisch-Name': t.name,
      'Kapazität': t.seatsCount,
      'Belegte Plätze': count,
      'Freie Plätze': Math.max(0, t.seatsCount - count),
      'Beschreibung': t.description || '',
    };
  });
  const tableWorksheet = XLSX.utils.json_to_sheet(tableSummaryRows);
  tableWorksheet['!cols'] = [
    { wch: 10 },
    { wch: 28 },
    { wch: 12 },
    { wch: 15 },
    { wch: 14 },
    { wch: 35 },
  ];
  XLSX.utils.book_append_sheet(workbook, tableWorksheet, 'Tischübersicht');

  XLSX.writeFile(workbook, fileName);
};

/**
 * Generates and downloads an empty Excel template for the user to fill in
 */
export const downloadExcelTemplate = (tables: Table[]) => {
  const sampleRows = [
    {
      'Tisch-Nr': 1,
      'Tisch-Name': 'Tisch 1 – Braut-Tisch',
      'Sitzplatz-Nr': 1,
      'Plan-Sitz (1-154)': 1,
      'Vollständiger Name': 'Anja W.',
      'Gruppe / Kategorie': 'Brautpaar',
      'Rolle (bride/groom/guest)': 'bride',
      'Notizen': 'Braut',
    },
    {
      'Tisch-Nr': 1,
      'Tisch-Name': 'Tisch 1 – Braut-Tisch',
      'Sitzplatz-Nr': 2,
      'Plan-Sitz (1-154)': 2,
      'Vollständiger Name': 'Dino W.',
      'Gruppe / Kategorie': 'Brautpaar',
      'Rolle (bride/groom/guest)': 'groom',
      'Notizen': 'Bräutigam',
    },
    {
      'Tisch-Nr': 3,
      'Tisch-Name': 'Tisch 3 – Romantik',
      'Sitzplatz-Nr': 1,
      'Plan-Sitz (1-154)': 15,
      'Vollständiger Name': 'Sabine F.',
      'Gruppe / Kategorie': 'Familie',
      'Rolle (bride/groom/guest)': 'guest',
      'Notizen': '',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleRows);
  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 28 },
    { wch: 12 },
    { wch: 24 },
    { wch: 20 },
    { wch: 24 },
    { wch: 25 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Gäste_Vorlage');

  // Add guide sheet
  const guideRows = [
    { 'Anleitung': '1. Trage die Gäste mit Vorname und optionalem Nachnamen-Initial ein (z. B. "Laura W.").' },
    { 'Anleitung': '2. Die Tisch-Nr (1 bis 12 bzw. 20) ordnet den Gast automatisch dem richtigen Tisch zu.' },
    { 'Anleitung': '3. Die Sitzplatz-Nr bestimmt die Reihenfolge am Tisch.' },
    { 'Anleitung': '4. Lade die Datei anschließend in der Admin-Konsole hoch.' },
  ];
  const guideSheet = XLSX.utils.json_to_sheet(guideRows);
  XLSX.utils.book_append_sheet(workbook, guideSheet, 'Ausfüllhilfe');

  XLSX.writeFile(workbook, 'Hochzeit_Gaesteliste_Vorlage.xlsx');
};

/**
 * Parses an uploaded Excel or CSV file into structured guest data
 */
export const parseUploadedExcel = async (
  file: File,
  existingTables: Table[]
): Promise<ParsedGuestResult> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });

  // Use the first sheet
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  if (!worksheet) {
    throw new Error('Die Excel-Datei enthält kein gültiges Arbeitsblatt.');
  }

  const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);
  if (!rawRows || rawRows.length === 0) {
    throw new Error('Die hochgeladene Datei enthält keine Gästedaten.');
  }

  const warnings: string[] = [];
  const parsedGuests: Omit<Guest, 'id'>[] = [];

  rawRows.forEach((row, index) => {
    // Flexible column key matching
    const findValue = (possibleKeys: string[]) => {
      for (const key of possibleKeys) {
        const matchingKey = Object.keys(row).find(
          (k) => k.trim().toLowerCase() === key.toLowerCase()
        );
        if (matchingKey && row[matchingKey] !== undefined && row[matchingKey] !== '') {
          return row[matchingKey];
        }
      }
      return undefined;
    };

    const nameVal = findValue([
      'Vollständiger Name',
      'Name',
      'Gast',
      'Gastname',
      'Gast-Name',
      'Vorname',
      'Full Name',
    ]);

    if (!nameVal || String(nameVal).trim() === '') {
      warnings.push(`Zeile ${index + 2}: Übersprungen (kein Name angegeben).`);
      return;
    }

    const name = String(nameVal).trim();

    // Table number resolution
    let tableNum = findValue([
      'Tisch-Nr',
      'Tisch Nr',
      'Tischnummer',
      'Tisch',
      'Table',
      'Table Number',
    ]);

    let resolvedTableId = 't-1';
    let resolvedTableName = existingTables[0]?.name || 'Tisch 1';

    if (tableNum !== undefined) {
      const numInt = parseInt(String(tableNum).replace(/\D/g, ''), 10);
      if (!isNaN(numInt)) {
        const matchedTable = existingTables.find((t) => t.number === numInt);
        if (matchedTable) {
          resolvedTableId = matchedTable.id;
          resolvedTableName = matchedTable.name;
        } else {
          // Dynamic table id
          resolvedTableId = `t-${numInt}`;
          resolvedTableName = `Tisch ${numInt}`;
        }
      }
    } else {
      // Look if table name is given
      const tableNameVal = findValue(['Tisch-Name', 'Tischname', 'Tisch Name']);
      if (tableNameVal) {
        const found = existingTables.find(
          (t) => t.name.toLowerCase() === String(tableNameVal).toLowerCase()
        );
        if (found) {
          resolvedTableId = found.id;
          resolvedTableName = found.name;
        }
      }
    }

    // Seat number
    const seatVal = findValue([
      'Sitzplatz-Nr',
      'Sitzplatz',
      'Sitz',
      'Platz',
      'Seat',
      'Seat Number',
    ]);
    let seat = parseInt(String(seatVal), 10);
    if (isNaN(seat) || seat <= 0) {
      // Auto-assign based on count of guests parsed for this table so far
      const tableCount = parsedGuests.filter((g) => g.tableId === resolvedTableId).length;
      seat = tableCount + 1;
    }

    // Group
    const groupVal = findValue(['Gruppe / Kategorie', 'Gruppe', 'Kategorie', 'Group', 'Beziehung']);
    const group = groupVal ? String(groupVal).trim() : undefined;

    // Role
    const roleVal = findValue(['Rolle', 'Role', 'Funktion']);
    let role: Guest['role'] = 'guest';
    if (roleVal) {
      const r = String(roleVal).toLowerCase().trim();
      if (r.includes('braut') && !r.includes('eltern') && !r.includes('trau')) role = 'bride';
      else if (r.includes('bräutigam') || r.includes('braeutigam') || r.includes('groom')) role = 'groom';
      else if (r.includes('trauzeugin') || r.includes('maid')) role = 'maidOfHonor';
      else if (r.includes('trauzeuge') || r.includes('bestman')) role = 'bestMan';
      else if (r.includes('familie') || r.includes('eltern')) role = 'family';
    }

    // Global Seat (1-153)
    const globalSeatVal = findValue(['Plan-Sitz (1-153)', 'Plan-Sitz', 'Globaler Sitz', 'Plan Sitz', 'Global Seat']);
    let globalSeat: number | undefined = undefined;
    if (globalSeatVal !== undefined) {
      const gNum = parseInt(String(globalSeatVal).replace(/\D/g, ''), 10);
      if (!isNaN(gNum) && gNum > 0) {
        globalSeat = gNum;
      }
    }

    // Marked seat (Yellow highlight)
    const markedVal = findValue(['Markierter Sitz', 'Markiert', 'Highlight', 'Gelb']);
    const isMarkedSeat = markedVal ? String(markedVal).toLowerCase().includes('ja') || String(markedVal).toLowerCase().includes('true') : false;

    // Notes
    const notesVal = findValue(['Notizen', 'Anmerkung', 'Bemerkung', 'Notes']);
    const notes = notesVal ? String(notesVal).trim() : undefined;

    parsedGuests.push({
      name,
      tableId: resolvedTableId,
      tableName: resolvedTableName,
      seat,
      globalSeat: globalSeat || seat,
      isMarkedSeat,
      group,
      role,
      notes,
    });
  });

  return {
    guests: parsedGuests,
    warnings,
    totalParsed: parsedGuests.length,
  };
};
