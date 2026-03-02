"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

export function PointsToReal() {
  const [asset, setAsset] = useState<'WIN' | 'WDO'>('WIN');
  const [points, setPoints] = useState<number>(100);
  const [contracts, setContracts] = useState<number>(1);

  const multiplier = asset === 'WIN' ? 0.2 : 10;
  const totalValue = points * multiplier * contracts;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-blue-400">Pontos → Reais</CardTitle>
        <CardDescription>Conversão para mini contratos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ptr-asset">Ativo</Label>
              <Select
                id="ptr-asset"
                value={asset}
                onChange={(e) => setAsset(e.target.value as 'WIN' | 'WDO')}
              >
                <option value="WIN">WIN</option>
                <option value="WDO">WDO</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptr-contracts">Contratos</Label>
              <Input
                id="ptr-contracts"
                type="number"
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ptr-points">Pontos</Label>
            <Input
              id="ptr-points"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Valor Financeiro</span>
              <span className="font-mono text-2xl font-bold text-blue-400">
                R$ {totalValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
