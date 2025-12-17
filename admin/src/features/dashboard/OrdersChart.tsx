import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const data = [
  { date: 'Mon', orders: 12 },
  { date: 'Tue', orders: 19 },
  { date: 'Wed', orders: 15 },
  { date: 'Thu', orders: 25 },
  { date: 'Fri', orders: 22 },
  { date: 'Sat', orders: 18 },
  { date: 'Sun', orders: 14 },
];

export function OrdersChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
        <XAxis dataKey="date" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
          }}
        />
        <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

