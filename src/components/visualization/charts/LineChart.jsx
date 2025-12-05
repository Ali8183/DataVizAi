import React from 'react';
import {
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const LineChartComponent = ({ data, config }) => {
    const { x, y } = config;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ReLineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    dataKey={x}
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
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={y}
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                />
            </ReLineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
