export interface Guest {
  id: string;
  name: string; // e.g. "Anna S.", "Markus B." (First Name + Last Initial)
  tableId: string;
  tableName: string;
  seat: number;
  globalSeat?: number; // Exact seat number 1..153 matching architectural plan
  isMarkedSeat?: boolean; // Highlighted seat from plan
  role?: 'bride' | 'groom' | 'maidOfHonor' | 'bestMan' | 'family' | 'guest';
  group?: string; // e.g. "Brautpaar", "Freunde", "Familie", etc.
  notes?: string;
}

export interface Table {
  id: string;
  name: string;
  number: number;
  shape: 'round' | 'rect' | 'head';
  seatsCount: number;
  seatRange?: string;
  description?: string;
  tag?: string;
  x: number; // For layout rendering %
  y: number; // For layout rendering %
  leftSeats?: number[];
  rightSeats?: number[];
  topSeats?: number[];
  bottomSeats?: number[];
}

export interface WeddingQuote {
  id: string;
  text: string;
  author: string;
  category: 'Liebe' | 'Eheleben' | 'Trinkspruch' | 'Glückwunsch';
}

export interface TaxiService {
  id: string;
  name: string;
  phone?: string;
  displayPhone?: string;
  numbers?: { phone: string; displayPhone: string }[];
  address?: string;
  note?: string;
  availableHours?: string;
  isPrimary?: boolean;
  type?: 'taxi' | 'großraum' | 'shuttle' | 'notfall';
}

export type ViewMode = 'map' | 'plan';
export type LegalTab = 'none' | 'impressum' | 'datenschutz';
