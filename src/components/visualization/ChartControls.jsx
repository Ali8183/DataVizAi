import React from 'react';
import { Download, Code, Share2, Settings } from 'lucide-react';

const ChartControls = ({ onExport, onShowCode, onShare }) => {
    return (
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
            <button
                onClick={() => onExport('png')}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                title="Export as PNG"
            >
                <Download className="w-4 h-4" />
            </button>
            <button
                onClick={onShowCode}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                title="View Code"
            >
                <Code className="w-4 h-4" />
            </button>
            <button
                onClick={onShare}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                title="Share Analysis"
            >
                <Share2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1" />
            <button
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                title="Chart Settings"
            >
                <Settings className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ChartControls;
