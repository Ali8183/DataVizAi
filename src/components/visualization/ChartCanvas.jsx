import React, { useMemo, useState } from 'react';
import BarChartComponent from './charts/BarChart';
import LineChartComponent from './charts/LineChart';
import ScatterPlotComponent from './charts/ScatterPlot';
import PieChartComponent from './charts/PieChart';
import HeatmapComponent from './charts/Heatmap';
import ChartControls from './ChartControls';
import { AlertCircle, X } from 'lucide-react';
import { downloadChartAsPng, generateCodeSnippet } from '../../utils/exportHelpers';

const ChartCanvas = ({ data, chartType, columns }) => {
    const [showCode, setShowCode] = useState(false);
    const chartId = 'chart-canvas-container';

    // Determine default configuration based on chart type and available columns
    const config = useMemo(() => {
        if (!chartType || !columns) return null;

        const numerical = columns.filter(c => c.type === 'integer' || c.type === 'float');
        const categorical = columns.filter(c => c.type === 'string' || c.type === 'boolean');
        const temporal = columns.filter(c => c.type === 'date');

        switch (chartType.id) {
            case 'bar':
            case 'groupedBar':
                if (categorical.length > 0) {
                    return {
                        x: categorical[0].name,
                        y: numerical.length > 0 ? numerical[0].name : 'count',
                        mode: numerical.length > 0 ? 'value' : 'count'
                    };
                }
                break;

            case 'histogram':
                if (numerical.length > 0) {
                    return { x: numerical[0].name, mode: 'bin' };
                }
                break;

            case 'pie':
                if (categorical.length > 0) {
                    return {
                        x: categorical[0].name,
                        y: numerical.length > 0 ? numerical[0].name : 'count',
                        mode: numerical.length > 0 ? 'value' : 'count'
                    };
                }
                break;

            case 'line':
            case 'area':
                if ((temporal.length > 0 || numerical.length > 0) && numerical.length > 0) {
                    return {
                        x: temporal.length > 0 ? temporal[0].name : numerical[0].name,
                        y: numerical.length > 1 ? numerical[1].name : numerical[0].name
                    };
                }
                break;

            case 'scatter':
            case 'bubble':
                if (numerical.length >= 2) {
                    return {
                        x: numerical[0].name,
                        y: numerical[1].name,
                        z: numerical.length > 2 ? numerical[2].name : null
                    };
                }
                break;

            case 'heatmap':
                if (categorical.length >= 2) {
                    return {
                        x: categorical[0].name,
                        y: categorical[1].name,
                        color: 'count'
                    };
                }
                break;

            default:
                return null;
        }
        return null;
    }, [chartType, columns]);

    const handleExport = () => {
        downloadChartAsPng(chartId, `${chartType.name.toLowerCase().replace(' ', '_')}.png`);
    };

    if (!chartType) {
        return (
            <div className="h-96 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">Select a visualization to preview</p>
            </div>
        );
    }

    if (!config) {
        return (
            <div className="h-96 flex flex-col items-center justify-center bg-amber-50 rounded-xl border border-amber-200 text-amber-800">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p className="font-medium">Insufficient data for this chart type</p>
                <p className="text-sm opacity-75">Try selecting different columns or chart type</p>
            </div>
        );
    }

    const renderChart = () => {
        switch (chartType.id) {
            case 'bar':
            case 'histogram':
            case 'groupedBar':
                return <BarChartComponent data={data} config={config} />;
            case 'pie':
                return <PieChartComponent data={data} config={config} />;
            case 'line':
            case 'area':
                return <LineChartComponent data={data} config={config} />;
            case 'scatter':
            case 'bubble':
                return <ScatterPlotComponent data={data} config={config} />;
            case 'heatmap':
                return <HeatmapComponent data={data} config={config} />;
            default:
                return (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-slate-500">Chart type "{chartType.name}" implementation coming soon</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[500px] flex flex-col relative">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">{chartType.name}</h3>
                    <div className="text-sm text-slate-500">
                        {config.x} vs {config.y || 'Count'}
                    </div>
                </div>
                <ChartControls
                    onExport={handleExport}
                    onShowCode={() => setShowCode(true)}
                    onShare={() => alert('Share feature coming soon!')}
                />
            </div>

            <div id={chartId} className="flex-grow min-h-0">
                {renderChart()}
            </div>

            {showCode && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-6 z-10 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-slate-900">React Code Snippet</h4>
                        <button
                            onClick={() => setShowCode(false)}
                            className="p-1 hover:bg-slate-100 rounded-full"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                    <pre className="flex-grow overflow-auto bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono">
                        {generateCodeSnippet(chartType, config)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ChartCanvas;
