import React from 'react';
import {
    BarChart,
    BarChart2,
    PieChart,
    LineChart,
    ScatterChart,
    BoxSelect,
    AreaChart,
    Grid,
    Circle,
    BarChartHorizontal
} from 'lucide-react';

const iconMap = {
    BarChart,
    BarChart2,
    PieChart,
    LineChart,
    ScatterChart,
    BoxSelect,
    AreaChart,
    Grid,
    Circle,
    BarChartHorizontal
};

const ChartTypeGrid = ({ recommendations, onSelectChart, selectedChart }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Recommended Visualizations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations.map((chart) => {
                    const Icon = iconMap[chart.icon] || BarChart;
                    const isSelected = selectedChart?.id === chart.id;

                    return (
                        <button
                            key={chart.id}
                            onClick={() => onSelectChart(chart)}
                            className={`
                flex flex-col items-center p-4 rounded-xl border transition-all text-left
                ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                                }
              `}
                        >
                            <div className={`
                p-3 rounded-lg mb-3
                ${isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
              `}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h4 className={`font-medium mb-1 ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                                {chart.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 text-center">
                                {chart.description}
                            </p>
                            {chart.score >= 9 && (
                                <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    Best Fit
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ChartTypeGrid;
