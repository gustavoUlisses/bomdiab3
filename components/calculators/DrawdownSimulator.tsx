"use client"

import React, { useState, useEffect } from 'react';
import { useTrader } from '@/app/context/TraderContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DrawdownSimulator() {
  const { state } = useTrader();
  const [numTrades, setNumTrades] = useState<number>(100);
  const [chartData, setChartData] = useState<any[]>([]);
  const [maxDrawdown, setMaxDrawdown] = useState<number>(0);
  const [ruinProb, setRuinProb] = useState<number>(0);

  useEffect(() => {
    simulate();
  }, [state.bankroll, state.riskPercent, state.winRate, state.payoff, numTrades]);

  const simulate = () => {
    let currentBankroll = state.bankroll;
    let peak = currentBankroll;
    let maxDd = 0;
    const data = [{ trade: 0, balance: currentBankroll }];
    let ruined = false;

    for (let i = 1; i <= numTrades; i++) {
      if (currentBankroll <= 0) {
        ruined = true;
        break;
      }

      const isWin = Math.random() * 100 <= state.winRate;
      const riskAmount = currentBankroll * (state.riskPercent / 100);

      if (isWin) {
        currentBankroll += riskAmount * state.payoff;
      } else {
        currentBankroll -= riskAmount;
      }

      if (currentBankroll > peak) {
        peak = currentBankroll;
      }

      const currentDd = ((peak - currentBankroll) / peak) * 100;
      if (currentDd > maxDd) {
        maxDd = currentDd;
      }

      data.push({ trade: i, balance: Math.max(0, currentBankroll) });
    }

    setChartData(data);
    setMaxDrawdown(maxDd);
    setRuinProb(ruined ? 100 : calculateRuinProbability(state.winRate, state.payoff, state.riskPercent));
  };

  // Simplified Kelly/Ruin probability formula
  const calculateRuinProbability = (winRate: number, payoff: number, risk: number) => {
    const p = winRate / 100;
    const q = 1 - p;
    if (p * payoff <= q) return 100; // Negative expectancy
    // Very simplified approximation for display purposes
    const prob = Math.pow((q / p), (100 / risk));
    return Math.min(100, Math.max(0, prob * 100));
  };

  return (
    <Card className="h-full flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-rose-400">Simulador de Drawdown</CardTitle>
        <CardDescription>Probabilidade de quebrar e curva de capital simulada</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numTrades">Número de Operações</Label>
              <Input
                id="numTrades"
                type="number"
                value={numTrades}
                onChange={(e) => setNumTrades(Number(e.target.value))}
                min={10}
                max={1000}
              />
            </div>
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Máximo Drawdown</span>
                <span className="font-mono font-medium text-rose-400">
                  {maxDrawdown.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Risco de Ruína</span>
                <span className="font-mono font-medium text-rose-400">
                  {ruinProb < 0.01 ? '< 0.01' : ruinProb.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 h-48 md:h-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="trade" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, 'Saldo']}
                  labelFormatter={(label) => `Trade ${label}`}
                />
                <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
