"use client"

import React, { useState } from 'react';
import { useTrader } from '@/app/context/TraderContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

export function LeverageSimulator() {
  const { state } = useTrader();
  const [asset, setAsset] = useState<'WIN' | 'WDO'>('WIN');
  const [contracts, setContracts] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(150);

  const multiplier = asset === 'WIN' ? 0.2 : 10;
  const riskReal = stopLoss * multiplier * contracts;
  const exposedPercent = (riskReal / state.bankroll) * 100;
  
  // Quanto aguenta perder antes de quebrar (quantos stops seguidos)
  const tradesToRuin = riskReal > 0 ? Math.floor(state.bankroll / riskReal) : 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-orange-400">Simulador de Alavancagem</CardTitle>
        <CardDescription>Exposição financeira e risco real</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lev-asset">Ativo</Label>
              <Select
                id="lev-asset"
                value={asset}
                onChange={(e) => setAsset(e.target.value as 'WIN' | 'WDO')}
              >
                <option value="WIN">WIN</option>
                <option value="WDO">WDO</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lev-contracts">Contratos</Label>
              <Input
                id="lev-contracts"
                type="number"
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lev-stopLoss">Stop em Pontos</Label>
            <Input
              id="lev-stopLoss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Risco Real (R$)</span>
              <span className="font-mono font-medium text-rose-400">
                R$ {riskReal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">% da Banca Exposta</span>
              <span className={`font-mono font-medium ${exposedPercent > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {exposedPercent.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Stops até Quebrar</span>
              <span className="font-mono font-medium text-orange-400">
                {tradesToRuin} trades
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
