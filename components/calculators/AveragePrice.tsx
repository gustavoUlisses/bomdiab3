"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Purchase {
  id: number;
  quantity: number;
  price: number;
}

export function AveragePrice() {
  const [purchases, setPurchases] = useState<Purchase[]>([{ id: 1, quantity: 100, price: 10.50 }]);
  const [currentPrice, setCurrentPrice] = useState<number>(11.00);

  const addPurchase = () => {
    setPurchases([...purchases, { id: Date.now(), quantity: 100, price: 10.00 }]);
  };

  const removePurchase = (id: number) => {
    if (purchases.length > 1) {
      setPurchases(purchases.filter(p => p.id !== id));
    }
  };

  const updatePurchase = (id: number, field: 'quantity' | 'price', value: number) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const totalQuantity = purchases.reduce((sum, p) => sum + p.quantity, 0);
  const totalCost = purchases.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const averagePrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;
  
  const currentValue = totalQuantity * currentPrice;
  const profitLoss = currentValue - totalCost;
  const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

  return (
    <Card className="h-full flex flex-col col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-indigo-400">Preço Médio (Ações)</CardTitle>
        <CardDescription>Calculadora de compras múltiplas e P/L atual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Compras</Label>
              <Button variant="outline" size="sm" onClick={addPurchase} className="h-8">
                <Plus className="w-4 h-4 mr-1" /> Adicionar
              </Button>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {purchases.map((purchase, index) => (
                <div key={purchase.id} className="flex items-end gap-2">
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs text-zinc-500">Qtd</Label>
                    <Input
                      type="number"
                      value={purchase.quantity}
                      onChange={(e) => updatePurchase(purchase.id, 'quantity', Number(e.target.value))}
                      min={1}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs text-zinc-500">Preço (R$)</Label>
                    <Input
                      type="number"
                      value={purchase.price}
                      onChange={(e) => updatePurchase(purchase.id, 'price', Number(e.target.value))}
                      min={0.01}
                      step={0.01}
                      className="h-8"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePurchase(purchase.id)}
                    disabled={purchases.length === 1}
                    className="h-8 w-8 text-zinc-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Label htmlFor="currentPrice">Preço Atual (R$)</Label>
              <Input
                id="currentPrice"
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                min={0.01}
                step={0.01}
              />
            </div>
          </div>
          <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-sm text-zinc-400 block mb-1">Preço Médio</span>
              <span className="font-mono text-3xl font-bold text-indigo-400">
                R$ {averagePrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm text-zinc-400 block mb-1">Quantidade Total</span>
              <span className="font-mono text-xl text-zinc-200">
                {totalQuantity} ações
              </span>
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <span className="text-sm text-zinc-400 block mb-1">Lucro/Prejuízo Atual</span>
              <span className={`font-mono text-2xl font-bold ${profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                R$ {profitLoss.toFixed(2)} <span className="text-sm font-normal">({profitLossPercent > 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%)</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
