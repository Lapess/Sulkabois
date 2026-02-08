"use client";
import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { createContext, useContext, ReactNode, useState } from "react";

interface PlayerGroupContextType {
  selectedPlayerGroup: PlayerGroup | null;
  setSelectedPlayerGroup: (value: PlayerGroup) => void;
}

const PlayerGroupContext = createContext<PlayerGroupContextType | undefined>(
  undefined,
);

export function PlayerGroupProvider({ children }: { children: ReactNode }) {
  const [selectedPlayerGroup, setSelectedPlayerGroup] =
    useState<PlayerGroup | null>(null);
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
