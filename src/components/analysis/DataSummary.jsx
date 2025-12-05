import React from 'react';
import {
    Hash,
    Type,
    Calendar,
    ToggleLeft,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';

const TypeIcon = ({ type }) => {
    switch (type) {
        case 'integer':
        case 'float':
            return <Hash className="w-4 h-4 text-blue-500" />;
        case 'date':
            return <Calendar className="w-4 h-4 text-green-500" />;
        case 'boolean':
            return <ToggleLeft className="w-4 h-4 text-purple-500" />;
        default:
            return <Type className="w-4 h-4 text-slate-500" />;
    }
};

const DataSummary = ({ columns, data }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Data Analysis Summary</h3>
                <div className="flex gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {data.length} Rows
                    </span>
                    <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {columns.length} Columns
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {columns.map((col) => (
                    <div
                        key={col.name}
                        className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-slate-50 rounded-md">
                                    <TypeIcon type={col.type} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900 truncate max-w-[150px]" title={col.name}>
                                        {col.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 capitalize">{col.type}</p>
                                </div>
                            </div>
                            {col.missing > 0 && (
                                <div className="flex items-center gap-1 text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded-full">
                                    <AlertTriangle className="w-3 h-3" />
                                    {col.missingPercentage.toFixed(1)}% null
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Unique Values:</span>
                                <span className="font-medium text-slate-900">{col.unique}</span>
                            </div>

                            {(col.type === 'integer' || col.type === 'float') && (
                                <>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Min:</span>
                                        <span className="font-medium text-slate-900">{col.min?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Max:</span>
                                        <span className="font-medium text-slate-900">{col.max?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Mean:</span>
                                        <span className="font-medium text-slate-900">{col.mean?.toFixed(2)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataSummary;
