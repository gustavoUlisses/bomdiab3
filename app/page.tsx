"use client"

import React from 'react';
import { TraderProvider } from '@/app/context/TraderContext';
import { GlobalSettings } from '@/components/GlobalSettings';
import { RiskCalculator } from '@/components/calculators/RiskCalculator';
import { PointsToReal } from '@/components/calculators/PointsToReal';
import { DrawdownSimulator } from '@/components/calculators/DrawdownSimulator';
import { MonthlyGoal } from '@/components/calculators/MonthlyGoal';
import { TaxCalculator } from '@/components/calculators/TaxCalculator';
import { LeverageSimulator } from '@/components/calculators/LeverageSimulator';
import { AveragePrice } from '@/components/calculators/AveragePrice';
import { PsychologicalSimulator } from '@/components/calculators/PsychologicalSimulator';
import { Activity, ShieldAlert, TrendingUp, BrainCircuit, Calculator, BarChart3, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <TraderProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-400 flex items-center gap-2">
                <Activity className="w-8 h-8" />
                BOM DIA B3
              </h1>
              <p className="text-zinc-400 mt-1">Gestão de risco e simuladores para a Bolsa de Valores.</p>
            </div>
          </header>

          {/* Global Settings */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-200">
              <ShieldAlert className="w-5 h-5 text-zinc-400" />
              Parâmetros Globais da Conta
            </h2>
            <GlobalSettings />
          </section>

          {/* Main Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Core Risk */}
            <div className="col-span-1 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <Calculator className="w-5 h-5 text-emerald-400" />
                Gestão de Risco
              </h2>
              <RiskCalculator />
            </div>

            {/* Mini Contracts & Leverage */}
            <div className="col-span-1 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Mini Contratos
              </h2>
              <PointsToReal />
            </div>

            <div className="col-span-1 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200 opacity-0 hidden lg:flex">
                <span className="w-5 h-5" />
                Espaço
              </h2>
              <LeverageSimulator />
            </div>

            {/* Drawdown Simulator (Wide) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-6 pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <BarChart3 className="w-5 h-5 text-rose-400" />
                Análise de Risco
              </h2>
              <DrawdownSimulator />
            </div>

            {/* Goals & Taxes */}
            <div className="col-span-1 space-y-6 pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <LineChart className="w-5 h-5 text-amber-400" />
                Metas & Impostos
              </h2>
              <MonthlyGoal />
            </div>

            <div className="col-span-1 space-y-6 pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200 opacity-0 hidden md:flex">
                <span className="w-5 h-5" />
                Espaço
              </h2>
              <TaxCalculator />
            </div>

            {/* Average Price */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6 pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <Activity className="w-5 h-5 text-indigo-400" />
                Ações
              </h2>
              <AveragePrice />
            </div>

            {/* Psychological Simulator (Wide) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-6 pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-200">
                <BrainCircuit className="w-5 h-5 text-fuchsia-400" />
                Psicologia & Performance
              </h2>
              <PsychologicalSimulator />
            </div>

          </div>
          
          <footer className="pt-12 pb-6 text-center text-sm text-zinc-600 border-t border-zinc-900 mt-12">
            <p>BOM DIA B3 &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">As ferramentas são para fins educacionais. Não constituem recomendação de investimento.</p>
          </footer>
        </div>
      </div>
    </TraderProvider>
  );
}
