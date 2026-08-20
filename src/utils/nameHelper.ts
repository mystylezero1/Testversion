import { Guest } from '../types';

/**
 * Format guest name according to wedding privacy rules:
 * Der erste Buchstabe des Nachnamens wird NUR bei mehreren gleichen Vornamen verwendet.
 * 
 * Examples:
 * - "Laura" (falls nur 1x im Gästekreis) -> "Laura"
 * - "Sven" (falls nur 1x im Gästekreis) -> "Sven"
 * - "Sarah" (wenn 2x vorhanden: "Sarah B." und "Sarah K.") -> "Sarah B." bzw. "Sarah K."
 */
export function formatGuestDisplayName(guest: Guest | string, allGuests: Guest[]): string {
  const rawName = typeof guest === 'string' ? guest : guest?.name || '';
  if (!rawName) return '';

  const trimmed = rawName.trim();
  const parts = trimmed.split(/\s+/);
  const firstName = parts[0];

  if (parts.length <= 1) {
    return firstName;
  }

  // Count how many guests in the entire list share this exact first name (case-insensitive)
  const duplicateFirstNameCount = allGuests.filter((g) => {
    const gFirstName = g.name.trim().split(/\s+/)[0];
    return gFirstName.toLowerCase() === firstName.toLowerCase();
  }).length;

  // If more than 1 guest has this first name, include the first letter of the last name
  if (duplicateFirstNameCount > 1) {
    const lastNamePart = parts.slice(1).join(' ').trim();
    const initial = lastNamePart.charAt(0).toUpperCase();
    return `${firstName} ${initial}.`;
  }

  // Unique first name -> show only first name
  return firstName;
}
