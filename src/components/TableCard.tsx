import React from 'react';
import { Crown, Users, Sparkles } from 'lucide-react';
import { Table, Guest } from '../types';
import { formatGuestDisplayName } from '../utils/nameHelper';

interface TableCardProps {
  table: Table;
  guests: Guest[];
  allGuests?: Guest[];
  selectedGuest: Guest | null;
  onSelectGuest: (guest: Guest) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  guests,
  allGuests = guests,
  selectedGuest,
  onSelectGuest,
}) => {
  const tableGuests = allGuests.filter((g) => g.tableId === table.id);
  const isTableHighlighted = selectedGuest?.tableId === table.id;
  const isHeadTable = table.shape === 'head' || table.number === 1;

  return (
    <div
      id={`table-card-${table.id}`}
      className={`relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isTableHighlighted
          ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E2] to-[#FFFDF9] border-2 border-[#D4AF37] shadow-xl ring-4 ring-[#D4AF37]/20 scale-[1.01]'
          : isHeadTable
          ? 'bg-gradient-to-b from-[#FFFDF8] to-[#FAF5EB] border border-[#D4AF37]/60 shadow-md hover:border-[#D4AF37]'
          : 'bg-[#FFFCF8] border border-[#E8DFC9] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Table Header Banner */}
      <div
        className={`p-4 border-b flex items-center justify-between gap-2 ${
          isHeadTable
            ? 'bg-gradient-to-r from-[#FAF0D7] via-[#FFF8EA] to-[#FAF0D7] border-[#D4AF37]/40'
            : isTableHighlighted
            ? 'bg-[#FAF0D7]/70 border-[#D4AF37]/40'
            : 'bg-[#FAF7F0] border-[#E8DFC9]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-sm shadow-sm ${
              isHeadTable
                ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white'
                : isTableHighlighted
                ? 'bg-[#D4AF37] text-white'
                : 'bg-[#F2EADB] text-[#7A6A5C] border border-[#E8DFC9]'
            }`}
          >
            {isHeadTable ? <Crown className="w-4 h-4" /> : `#${table.number}`}
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C2623] leading-snug">
              Tisch {table.number}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#8C7A6B] bg-white/80 px-2 py-1 rounded-lg border border-[#E8DFC9]">
          <Users className="w-3.5 h-3.5" />
          <span>{tableGuests.length}/{table.seatsCount}</span>
        </div>
      </div>

      {/* Guest List without seat numbers */}
      <div className="p-3 sm:p-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tableGuests.map((guest) => {
            const isGuestSelected = selectedGuest?.id === guest.id;
            const displayName = formatGuestDisplayName(guest, allGuests);

            return (
              <button
                key={guest.id}
                id={`seat-guest-${guest.id}`}
                onClick={() => onSelectGuest(guest)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs sm:text-sm transition-all cursor-pointer ${
                  isGuestSelected
                    ? 'bg-[#D4AF37] text-white font-bold shadow-md ring-2 ring-[#B8860B]/40'
                    : 'bg-white/80 hover:bg-[#FAF0D7] border border-[#EBE3D3] hover:border-[#D4AF37]/40 text-[#2C2623]'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {/* Mobile only: Stylized Seat dot */}
                  <span
                    className={`md:hidden w-2 h-2 rounded-full flex-shrink-0 ${
                      isGuestSelected ? 'bg-white shadow-xs' : 'bg-[#D4AF37]/70'
                    }`}
                  />

                  {/* Desktop only: Seat Number Badge (#1..#154) */}
                  <span
                    className={`hidden md:inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0 ${
                      isGuestSelected
                        ? 'bg-white/20 text-white border border-white/40'
                        : 'bg-[#FAF0D7] text-[#8B6508] border border-[#E8DFC9]'
                    }`}
                  >
                    #{guest.globalSeat || guest.seat}
                  </span>

                  <span className="truncate font-medium">{displayName}</span>
                </div>

                {isGuestSelected && (
                  <Sparkles className="w-4 h-4 text-white flex-shrink-0 animate-spin" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Footer / Description */}
      {table.description && (
        <div className="px-4 py-2 bg-[#FAF8F3] border-t border-[#E8DFC9] text-[11px] text-[#8C7A6B] italic text-center">
          {table.description}
        </div>
      )}
    </div>
  );
};
