import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '12 Dec', orders: 12, prev: 10 },
  { name: '13 Dec', orders: 19, prev: 15 },
  { name: '14 Dec', orders: 15, prev: 18 },
  { name: '15 Dec', orders: 25, prev: 20 },
  { name: '16 Dec', orders: 22, prev: 24 },
  { name: '17 Dec', orders: 18, prev: 16 },
  { name: '18 Dec', orders: 28, prev: 19 },
];

export function OrdersChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: '#94a3b8' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#fff'
          }}
          itemStyle={{ color: '#fff' }}
        />
        <Area 
          type="monotone" 
          dataKey="orders" 
          stroke="#3b82f6" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorOrders)" 
        />
        <Area 
          type="monotone" 
          dataKey="prev" 
          stroke="#94a3b8" 
          strokeWidth={1}
          strokeDasharray="5 5"
          fill="transparent" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
