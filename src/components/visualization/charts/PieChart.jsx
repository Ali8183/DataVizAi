import React, { useMemo } from 'react';
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];

const PieChartComponent = ({ data, config }) => {
    const { x, y } = config;

    // Prepare data: Aggregate if necessary
    const chartData = useMemo(() => {
        if (config.mode === 'count') {
            const counts = {};
            data.forEach(row => {
                const key = row[x];
                counts[key] = (counts[key] || 0) + 1;
            });
            return Object.entries(counts).map(([name, value]) => ({ name, value }));
        }
        // If we have explicit values, we might need to sum them up if there are duplicate categories
        // But for now, let's assume unique categories or just take the first one for simplicity in this demo
        // Or better, group by x and sum y
        const grouped = {};
        data.forEach(row => {
            const key = row[x];
            const val = Number(row[y]);
            if (!isNaN(val)) {
                grouped[key] = (grouped[key] || 0) + val;
            }
        });
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [data, config, x, y]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
            </RePieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
