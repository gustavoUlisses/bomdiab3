"use client"

import React from 'react';
import { useTrader, AssetType } from '@/app/context/TraderContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

export function GlobalSettings() {
  const { state, updateState } = useTrader();

  return (
    <Card className="mb-6 bg-zinc-900/80 border-zinc-800">
      <CardContent className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="bankroll">Banca Total (R$)</Label>
          <Input
            id="bankroll"
            type="number"
            value={state.bankroll}
            onChange={(e) => updateState({ bankroll: Number(e.target.value) })}
            min={100}
            step={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="riskPercent">Risco por Trade (%)</Label>
          <Input
            id="riskPercent"
            type="number"
            value={state.riskPercent}
            onChange={(e) => updateState({ riskPercent: Number(e.target.value) })}
            min={0.1}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="winRate">Taxa de Acerto (%)</Label>
          <Input
            id="winRate"
            type="number"
            value={state.winRate}
            onChange={(e) => updateState({ winRate: Number(e.target.value) })}
            min={1}
            max={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payoff">Payoff (Risco/Retorno)</Label>
          <Input
            id="payoff"
            type="number"
            value={state.payoff}
            onChange={(e) => updateState({ payoff: Number(e.target.value) })}
            min={0.1}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="asset">Ativo Padrão</Label>
          <Select
            id="asset"
            value={state.asset}
            onChange={(e) => updateState({ asset: e.target.value as AssetType })}
          >
            <option value="WIN">Mini Índice (WIN)</option>
            <option value="WDO">Mini Dólar (WDO)</option>
            <option value="ACAO">Ações (B3)</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
