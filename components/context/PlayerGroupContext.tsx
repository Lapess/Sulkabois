"use client";
import { createContext, useContext, ReactNode, useState } from "react";

interface PlayerGroupContextType {
  selectedPlayerGroup: number | null;
  setSelectedPlayerGroup: (value: number) => void;
}

const PlayerGroupContext = createContext<PlayerGroupContextType | undefined>(
  undefined,
);

export function PlayerGroupProvider({ children }: { children: ReactNode }) {
  const [selectedPlayerGroup, setSelectedPlayerGroup] = useState<number | null>(
    null,
  );
  return (
    <PlayerGroupContext.Provider
      value={{
        selectedPlayerGroup,
        setSelectedPlayerGroup,
      }}
    >
      {children}
    </PlayerGroupContext.Provider>
  );
}

export function usePlayerGroup() {
  const context = useContext(PlayerGroupContext);
  if (!context)
    throw new Error("usePlayerGroup must be used within PlayerGroupProvider");
  return context;
}
