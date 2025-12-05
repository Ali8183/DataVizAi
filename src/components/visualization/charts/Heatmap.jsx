import React, { useMemo } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis
} from 'recharts';

// Recharts doesn't have a native Heatmap. 
// We can simulate a simple heatmap using Scatter chart with custom shapes or just squares.
// Alternatively, for a proper heatmap, D3 or a library like 'react-heatmap-grid' is better.
// However, to keep it simple with Recharts as requested primarily:
// We will use a Scatter plot where X and Y are categories (mapped to indices) and Z is the value (color/size).

const HeatmapComponent = ({ data, config }) => {
    const { x, y, color } = config;

    const chartData = useMemo(() => {
        // We need to map categorical values to indices for Recharts Scatter
        const xCategories = [...new Set(data.map(d => d[x]))].sort();
        const yCategories = [...new Set(data.map(d => d[y]))].sort();

        // Calculate counts or values for each cell
        const matrix = {};
        data.forEach(row => {
            const key = `${row[x]}|${row[y]}`;
            matrix[key] = (matrix[key] || 0) + 1;
        });

        return Object.entries(matrix).map(([key, value]) => {
            const [xVal, yVal] = key.split('|');
            return {
                x: xVal,
                y: yVal,
                value: value,
                xIndex: xCategories.indexOf(xVal),
                yIndex: yCategories.indexOf(yVal)
            };
        });
    }, [data, config, x, y]);

    // Custom shape for heatmap cell
    const renderShape = (props) => {
        const { cx, cy, width, height, payload } = props;
        // Simple opacity based on value (normalization needed for real app)
        const maxVal = Math.max(...chartData.map(d => d.value));
        const opacity = 0.2 + (payload.value / maxVal) * 0.8;

        return (
            <rect
                x={cx - 15}
                y={cy - 15}
                width={30}
                height={30}
                fill={`rgba(99, 102, 241, ${opacity})`}
                rx={4}
            />
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="category"
                    dataKey="x"
                    name={x}
                    allowDuplicatedCategory={false}
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    type="category"
                    dataKey="y"
                    name={y}
                    allowDuplicatedCategory={false}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                                <div className="bg-white p-2 border border-slate-200 shadow-md rounded-md text-sm">
                                    <p className="font-semibold">{`${x}: ${data.x}`}</p>
                                    <p className="font-semibold">{`${y}: ${data.y}`}</p>
                                    <p className="text-indigo-600">{`Count: ${data.value}`}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Scatter data={chartData} shape={renderShape} />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default HeatmapComponent;
