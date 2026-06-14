"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EmissionProjectionChartProps {
  currentAnnual: number;
  futureAnnual: number;
}

export function EmissionProjectionChart({ currentAnnual, futureAnnual }: EmissionProjectionChartProps) {
  // Generate projection data for 5 years
  const data = Array.from({ length: 6 }).map((_, i) => ({
    year: `Year ${i}`,
    Current: Math.round(currentAnnual * (i + 1)),
    Projected: Math.round(futureAnnual * (i + 1)),
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm relative"
      role="region"
      aria-label="5-Year Emission Projection"
    >
      <h3 className="text-lg font-semibold mb-6" id="projection-chart-title">5-Year Emission Projection</h3>
      
      {/* Accessible Data Table Fallback */}
      <div className="sr-only">
        <table aria-labelledby="projection-chart-title">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Current Trajectory (kg CO2)</th>
              <th scope="col">Projected Trajectory (kg CO2)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.year}</td>
                <td>{item.Current}</td>
                <td>{item.Projected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-[300px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              formatter={(value: number) => [`${value.toLocaleString()} kg`, undefined]}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Current" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Projected" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
