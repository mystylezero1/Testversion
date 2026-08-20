import React, { useState, useRef, useEffect } from 'react';
import { Search, X, User, ChevronDown } from 'lucide-react';
import { Guest } from '../types';
import { formatGuestDisplayName } from '../utils/nameHelper';

interface GuestSearchProps {
  guests: Guest[];
  selectedGuest: Guest | null;
  onSelectGuest: (guest: Guest | null) => void;
}

export const GuestSearch: React.FC<GuestSearchProps> = ({
  guests,
  selectedGuest,
  onSelectGuest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredGuests = guests.filter((guest) => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;
    const formattedName = formatGuestDisplayName(guest, guests).toLowerCase();
    const rawName = guest.name.toLowerCase();
    return (
      rawName.includes(search) ||
      formattedName.includes(search) ||
      guest.tableName.toLowerCase().includes(search) ||
      (guest.group && guest.group.toLowerCase().includes(search))
    );
  });

  const handleSelect = (guest: Guest) => {
    onSelectGuest(guest);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleClear = () => {
    onSelectGuest(null);
    setSearchTerm('');
  };

  const selectedGuestDisplayName = selectedGuest ? formatGuestDisplayName(selectedGuest, guests) : '';

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto my-3" id="guest-search-widget">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#B8860B] pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          id="guest-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredGuests.length > 0) {
              e.preventDefault();
              handleSelect(filteredGuests[0]);
            }
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={selectedGuest ? `Ausgewählt: ${selectedGuestDisplayName}` : "Namen suchen... (z. B. Laura, Sven, Dennis)"}
          className="w-full pl-11 pr-20 py-3.5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/40 shadow-sm hover:border-[#D4AF37] focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/15 text-sm sm:text-base text-[#2C2623] placeholder-[#A89887] transition-all outline-none"
        />

        <div className="absolute right-3 flex items-center gap-1">
          {(searchTerm || selectedGuest) && (
            <button
              id="clear-search-input-btn"
              onClick={handleClear}
              className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#2C2623] hover:bg-[#F0E6D2] transition-colors cursor-pointer"
              title="Suche zurücksetzen"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            id="toggle-search-dropdown-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1.5 rounded-full text-[#8B6508] hover:bg-[#FAF0D7] transition-colors cursor-pointer"
            title="Gäste aufklappen"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          id="guest-search-dropdown"
          className="absolute left-0 right-0 top-full mt-2 z-40 max-h-72 overflow-y-auto rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/40 shadow-xl p-2 space-y-1"
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider flex justify-between items-center border-b border-[#F0E6D2]">
            <span>Gäste ({filteredGuests.length})</span>
            <span>Tisch</span>
          </div>

          {filteredGuests.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-[#8C7A6B]">
              Kein Gast mit "{searchTerm}" gefunden.
            </div>
          ) : (
            filteredGuests.map((guest) => {
              const isSelected = selectedGuest?.id === guest.id;
              const displayName = formatGuestDisplayName(guest, guests);

              return (
                <button
                  key={guest.id}
                  id={`guest-item-${guest.id}`}
                  onClick={() => handleSelect(guest)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF0D7] text-[#8B6508] font-bold border border-[#D4AF37]/50'
                      : 'text-[#2C2623] hover:bg-[#FAF6EC] hover:text-[#8B6508]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isSelected ? 'bg-[#D4AF37] text-white' : 'bg-[#F2EADB] text-[#7A6A5C]'
                    }`}>
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{displayName}</div>
                      {guest.group && (
                        <div className="text-[11px] text-[#8C7A6B]">{guest.group}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#8B6508]">
                      {guest.tableName}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
