"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendData {
  date: string;
  emission: number;
}

interface EmissionTrendChartProps {
  data: TrendData[];
}

export function EmissionTrendChart({ data }: EmissionTrendChartProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col relative"
      role="region"
      aria-label="Emission Trends Over Time"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground" id="trend-chart-title">Emission Trends</h3>
        <select 
          className="bg-muted text-xs px-2 py-1 rounded-md border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          aria-label="Select timeframe for emission trends"
        >
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Accessible Data Table Fallback */}
      <div className="sr-only">
        <table aria-labelledby="trend-chart-title">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Emissions (kg CO2)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.emission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-1 min-h-[250px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
            />
            <Area 
              type="monotone" 
              dataKey="emission" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorEmission)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
