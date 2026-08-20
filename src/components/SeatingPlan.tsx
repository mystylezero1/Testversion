import React, { useRef, useEffect } from 'react';
import { TableCard } from './TableCard';
import { HallMap } from './HallMap';
import { Table, Guest, ViewMode } from '../types';

interface SeatingPlanProps {
  tables: Table[];
  guests: Guest[];
  selectedGuest: Guest | null;
  onSelectGuest: (guest: Guest) => void;
  viewMode: ViewMode;
  onOpenWcModal?: () => void;
}

export const SeatingPlan: React.FC<SeatingPlanProps> = ({
  tables,
  guests,
  selectedGuest,
  onSelectGuest,
  viewMode,
  onOpenWcModal,
}) => {
  const selectedTableRef = useRef<HTMLDivElement>(null);

  // Auto-scroll into view when a guest/table is selected in Tischkarten view
  useEffect(() => {
    if (selectedGuest && selectedTableRef.current) {
      selectedTableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedGuest]);

  if (viewMode === 'map') {
    return (
      <HallMap
        tables={tables}
        guests={guests}
        selectedGuest={selectedGuest}
        onSelectGuest={onSelectGuest}
        onOpenWcModal={onOpenWcModal}
      />
    );
  }

  // ViewMode === 'plan': Tischkarten-Raster
  return (
    <div id="seating-plan-cards-view" className="w-full max-w-5xl mx-auto my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => {
          const isSelectedTable = selectedGuest?.tableId === table.id;
          return (
            <div
              key={table.id}
              ref={isSelectedTable ? selectedTableRef : undefined}
            >
              <TableCard
                table={table}
                guests={guests}
                allGuests={guests}
                selectedGuest={selectedGuest}
                onSelectGuest={onSelectGuest}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
