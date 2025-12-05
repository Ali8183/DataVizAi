import React, { useMemo } from 'react';
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const BarChartComponent = ({ data, config }) => {
    const { x, y } = config;

    // If we are just counting categories (e.g. 1 categorical variable)
    const chartData = useMemo(() => {
        if (config.mode === 'count') {
            const counts = {};
            data.forEach(row => {
                const key = row[x];
                counts[key] = (counts[key] || 0) + 1;
            });
            return Object.entries(counts).map(([name, value]) => ({ name, value }));
        }
        // If we are plotting numerical vs categorical
        return data;
    }, [data, config, x]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ReBarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    dataKey={config.mode === 'count' ? 'name' : x}
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar
                    dataKey={config.mode === 'count' ? 'value' : y}
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    name={config.mode === 'count' ? 'Count' : y}
                />
            </ReBarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
