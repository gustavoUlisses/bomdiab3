"use client"

import React, { useState } from 'react';
import { useTrader } from '@/app/context/TraderContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MonthlyGoal() {
  const { state } = useTrader();
  const [dailyGoal, setDailyGoal] = useState<number>(100);
  const [daysOperated, setDaysOperated] = useState<number>(20);

  const monthlyGoal = dailyGoal * daysOperated;
  const growthPercent = (monthlyGoal / state.bankroll) * 100;
  const annualProjection = state.bankroll * Math.pow(1 + growthPercent / 100, 12);

  // Quanto precisa ganhar por trade (assumindo 1 trade por dia e a taxa de acerto)
  // Expectativa matemática = (WinRate * Ganho) - (LossRate * Risco)
  // Para simplificar, vamos calcular o lucro líquido necessário por dia vencedor
  const winRateDec = state.winRate / 100;
  const lossRateDec = 1 - winRateDec;
  const riskAmount = state.bankroll * (state.riskPercent / 100);
  
  // dailyGoal = (winRateDec * X) - (lossRateDec * riskAmount)
  // X = (dailyGoal + lossRateDec * riskAmount) / winRateDec
  const requiredWinAmount = (dailyGoal + lossRateDec * riskAmount) / winRateDec;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-amber-400">Meta Mensal</CardTitle>
        <CardDescription>Projeção de crescimento e metas diárias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Meta Diária (R$)</Label>
              <Input
                id="dailyGoal"
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="daysOperated">Dias Operados</Label>
              <Input
                id="daysOperated"
                type="number"
                value={daysOperated}
                onChange={(e) => setDaysOperated(Number(e.target.value))}
                min={1}
                max={31}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Crescimento Mensal</span>
              <span className="font-mono font-medium text-amber-400">
                {growthPercent.toFixed(2)}% (R$ {monthlyGoal.toFixed(2)})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Projeção Anual</span>
              <span className="font-mono font-medium text-emerald-400">
                R$ {annualProjection.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Ganho Necessário/Trade</span>
              <span className="font-mono font-medium text-amber-400">
                R$ {requiredWinAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
