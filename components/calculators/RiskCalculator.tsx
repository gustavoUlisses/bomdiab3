"use client"

import React, { useState, useEffect } from 'react';
import { useTrader } from '@/app/context/TraderContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RiskCalculator() {
  const { state } = useTrader();
  const [stopLoss, setStopLoss] = useState<number>(150); // Pontos ou R$

  const riskAmount = (state.bankroll * state.riskPercent) / 100;

  let idealQuantity = 0;
  let unitLabel = '';
  let stopLabel = '';

  if (state.asset === 'WIN') {
    // R$ 0.20 por ponto por contrato
    idealQuantity = Math.floor(riskAmount / (stopLoss * 0.2));
    unitLabel = 'Contratos';
    stopLabel = 'Stop em Pontos';
  } else if (state.asset === 'WDO') {
    // R$ 10.00 por ponto por contrato
    idealQuantity = Math.floor(riskAmount / (stopLoss * 10));
    unitLabel = 'Contratos';
    stopLabel = 'Stop em Pontos';
  } else {
    // Ações
    idealQuantity = Math.floor(riskAmount / stopLoss);
    unitLabel = 'Ações';
    stopLabel = 'Stop em R$ por Ação';
  }

  // Prevent negative or infinite
  if (idealQuantity < 0 || !isFinite(idealQuantity)) idealQuantity = 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-emerald-400">Risco por Ativo</CardTitle>
        <CardDescription>Calcule a quantidade ideal para operar</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stopLoss">{stopLabel}</Label>
            <Input
              id="stopLoss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Risco Financeiro</span>
              <span className="font-mono font-medium text-rose-400">
                R$ {riskAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Quantidade Ideal</span>
              <span className="font-mono text-2xl font-bold text-emerald-400">
                {idealQuantity} <span className="text-sm font-normal text-zinc-500">{unitLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
