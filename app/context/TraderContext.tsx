"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AssetType = 'WIN' | 'WDO' | 'ACAO';

interface TraderState {
  bankroll: number;
  riskPercent: number;
  winRate: number;
  payoff: number; // Risco/Retorno (ex: 2 para 1:2)
  asset: AssetType;
}

interface TraderContextType {
  state: TraderState;
  updateState: (updates: Partial<TraderState>) => void;
}

const defaultState: TraderState = {
  bankroll: 10000,
  riskPercent: 1,
  winRate: 40,
  payoff: 2,
  asset: 'WIN',
};

const TraderContext = createContext<TraderContextType | undefined>(undefined);

export function TraderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TraderState>(defaultState);

  const updateState = (updates: Partial<TraderState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <TraderContext.Provider value={{ state, updateState }}>
      {children}
    </TraderContext.Provider>
  );
}

export function useTrader() {
  const context = useContext(TraderContext);
  if (context === undefined) {
    throw new Error('useTrader must be used within a TraderProvider');
  }
  return context;
}
