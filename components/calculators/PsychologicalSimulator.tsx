"use client"

import React, { useState } from 'react';
import { useTrader } from '@/app/context/TraderContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PsychologicalSimulator() {
  const { state } = useTrader();
  const [scenario, setScenario] = useState<'LOSS_STREAK' | 'WIN_STREAK' | 'RANDOM'>('LOSS_STREAK');
  const [chartData, setChartData] = useState<any[]>([]);
  const [finalBalance, setFinalBalance] = useState<number>(state.bankroll);
  const [recoveryTrades, setRecoveryTrades] = useState<number>(0);

  const simulate = () => {
    let currentBankroll = state.bankroll;
    const data = [{ trade: 0, balance: currentBankroll }];
    let tradesToRecover = 0;

    const riskAmount = currentBankroll * (state.riskPercent / 100);
    const winAmount = riskAmount * state.payoff;

    if (scenario === 'LOSS_STREAK') {
      // 10 perdas seguidas
      for (let i = 1; i <= 10; i++) {
        currentBankroll -= currentBankroll * (state.riskPercent / 100);
        data.push({ trade: i, balance: currentBankroll });
      }
      
      // Calcular tempo de recuperação (quantos wins seguidos para voltar ao zero)
      let tempBankroll = currentBankroll;
      while (tempBankroll < state.bankroll && tradesToRecover < 100) {
        tradesToRecover++;
        tempBankroll += tempBankroll * (state.riskPercent / 100) * state.payoff;
      }
    } else if (scenario === 'WIN_STREAK') {
      // 5 ganhos seguidos
      for (let i = 1; i <= 5; i++) {
        currentBankroll += currentBankroll * (state.riskPercent / 100) * state.payoff;
        data.push({ trade: i, balance: currentBankroll });
      }
    } else {
      // Alternância aleatória (20 trades)
      for (let i = 1; i <= 20; i++) {
        const isWin = Math.random() * 100 <= state.winRate;
        if (isWin) {
          currentBankroll += currentBankroll * (state.riskPercent / 100) * state.payoff;
        } else {
          currentBankroll -= currentBankroll * (state.riskPercent / 100);
        }
        data.push({ trade: i, balance: currentBankroll });
      }
    }

    setChartData(data);
    setFinalBalance(currentBankroll);
    setRecoveryTrades(tradesToRecover);
  };

  return (
    <Card className="h-full flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-fuchsia-400">Simulador Psicológico</CardTitle>
        <CardDescription>Impacto emocional na banca e tempo de recuperação</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col gap-2">
              <Button 
                variant={scenario === 'LOSS_STREAK' ? 'default' : 'outline'} 
                onClick={() => { setScenario('LOSS_STREAK'); simulate(); }}
                className={scenario === 'LOSS_STREAK' ? 'bg-rose-600 hover:bg-rose-700' : 'hover:text-rose-400'}
              >
                10 Perdas Seguidas
              </Button>
              <Button 
                variant={scenario === 'WIN_STREAK' ? 'default' : 'outline'} 
                onClick={() => { setScenario('WIN_STREAK'); simulate(); }}
                className={scenario === 'WIN_STREAK' ? 'bg-emerald-600 hover:bg-emerald-700' : 'hover:text-emerald-400'}
              >
                5 Ganhos Seguidos
              </Button>
              <Button 
                variant={scenario === 'RANDOM' ? 'default' : 'outline'} 
                onClick={() => { setScenario('RANDOM'); simulate(); }}
                className={scenario === 'RANDOM' ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:text-indigo-400'}
              >
                Alternância Aleatória (20)
              </Button>
            </div>
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Saldo Final</span>
                <span className={`font-mono font-medium ${finalBalance >= state.bankroll ? 'text-emerald-400' : 'text-rose-400'}`}>
                  R$ {finalBalance.toFixed(2)}
                </span>
              </div>
              {scenario === 'LOSS_STREAK' && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Trades para Recuperar</span>
                  <span className="font-mono font-medium text-fuchsia-400">
                    {recoveryTrades} wins seguidos
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-2 h-48 md:h-full min-h-[200px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="trade" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                    itemStyle={{ color: '#d946ef' }}
                    formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, 'Saldo']}
                    labelFormatter={(label) => `Trade ${label}`}
                  />
                  <Line type="stepAfter" dataKey="balance" stroke="#d946ef" strokeWidth={2} dot={true} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center border border-dashed border-zinc-800 rounded-lg text-zinc-500">
                Selecione um cenário para simular
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
