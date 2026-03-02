"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

export function TaxCalculator() {
  const [grossProfit, setGrossProfit] = useState<number>(1000);
  const [operationType, setOperationType] = useState<'DAY_TRADE' | 'SWING_TRADE'>('DAY_TRADE');
  const [isAcao, setIsAcao] = useState<boolean>(false);
  const [totalSales, setTotalSales] = useState<number>(15000);

  let taxRate = operationType === 'DAY_TRADE' ? 0.20 : 0.15;
  let taxAmount = 0;
  let isExempt = false;

  if (operationType === 'SWING_TRADE' && isAcao && totalSales <= 20000) {
    isExempt = true;
    taxAmount = 0;
  } else {
    taxAmount = grossProfit * taxRate;
  }

  const netProfit = grossProfit - taxAmount;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-purple-400">Calculadora de IR</CardTitle>
        <CardDescription>Imposto de Renda Simplificado</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grossProfit">Lucro Bruto (R$)</Label>
              <Input
                id="grossProfit"
                type="number"
                value={grossProfit}
                onChange={(e) => setGrossProfit(Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operationType">Tipo de Operação</Label>
              <Select
                id="operationType"
                value={operationType}
                onChange={(e) => setOperationType(e.target.value as 'DAY_TRADE' | 'SWING_TRADE')}
              >
                <option value="DAY_TRADE">Day Trade (20%)</option>
                <option value="SWING_TRADE">Swing Trade (15%)</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAcao"
              checked={isAcao}
              onChange={(e) => setIsAcao(e.target.checked)}
              className="rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500"
            />
            <Label htmlFor="isAcao">Operação com Ações</Label>
          </div>
          {isAcao && operationType === 'SWING_TRADE' && (
            <div className="space-y-2">
              <Label htmlFor="totalSales">Total de Vendas no Mês (R$)</Label>
              <Input
                id="totalSales"
                type="number"
                value={totalSales}
                onChange={(e) => setTotalSales(Number(e.target.value))}
                min={0}
              />
            </div>
          )}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Imposto Estimado</span>
              <span className="font-mono font-medium text-rose-400">
                {isExempt ? 'Isento' : `R$ ${taxAmount.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Lucro Líquido Real</span>
              <span className="font-mono text-2xl font-bold text-emerald-400">
                R$ {netProfit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
