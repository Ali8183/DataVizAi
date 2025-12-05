import React from 'react';
import {
    ScatterChart as ReScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ZAxis
} from 'recharts';

const ScatterPlotComponent = ({ data, config }) => {
    const { x, y, z } = config;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ReScatterChart
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    type="number"
                    dataKey={x}
                    name={x}
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    type="number"
                    dataKey={y}
                    name={y}
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                {z && <ZAxis type="number" dataKey={z} range={[60, 400]} name={z} />}
                <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Scatter name={`${x} vs ${y}`} data={data} fill="#6366f1" />
            </ReScatterChart>
        </ResponsiveContainer>
    );
};

export default ScatterPlotComponent;
