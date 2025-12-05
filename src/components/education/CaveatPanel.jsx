import React from 'react';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';

const caveats = {
    pie: [
        {
            type: 'warning',
            message: 'Humans are poor at judging angles. For more than 5 categories, consider a Bar Chart.',
            icon: AlertTriangle
        }
    ],
    bar: [
        {
            type: 'info',
            message: 'Always start the Y-axis at 0 to avoid misleading comparisons.',
            icon: Info
        }
    ],
    scatter: [
        {
            type: 'tip',
            message: 'Overplotting can be an issue with large datasets. Try reducing opacity or using density plots.',
            icon: Lightbulb
        }
    ],
    line: [
        {
            type: 'warning',
            message: 'Ensure the aspect ratio doesn\'t exaggerate or minimize the trend slope.',
            icon: AlertTriangle
        }
    ]
};

const CaveatPanel = ({ chartType }) => {
    if (!chartType || !caveats[chartType.id]) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Things to Consider</h3>
            <div className="space-y-3">
                {caveats[chartType.id].map((caveat, index) => {
                    const Icon = caveat.icon;
                    const styles = {
                        warning: 'bg-amber-50 text-amber-800 border-amber-200',
                        info: 'bg-blue-50 text-blue-800 border-blue-200',
                        tip: 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    };

                    return (
                        <div
                            key={index}
                            className={`flex gap-3 p-4 rounded-lg border ${styles[caveat.type]}`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{caveat.message}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CaveatPanel;
