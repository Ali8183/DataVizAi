import React from 'react';
import Papa from 'papaparse';
import { FileSpreadsheet } from 'lucide-react';
import useDataStore from '../../store/dataStore';
import { analyzeDataset } from '../../utils/dataAnalysis';
import { SAMPLE_CSV } from '../../constants/sampleData';

const SampleDatasets = () => {
    const { setFile, setAnalysisResult, setStatus } = useDataStore();

    const loadSample = () => {
        setStatus('uploading');
        setFile({ name: 'sample_retail_data.csv', size: 1024 }); // Fake size

        // Simulate network delay
        setTimeout(() => {
            Papa.parse(SAMPLE_CSV, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const columns = analyzeDataset(results.data);
                    setAnalysisResult(results.data, columns);
                }
            });
        }, 800);
    };

    return (
        <div className="text-center">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or try with sample data</span>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={loadSample}
                    className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-indigo-300 transition-all group"
                >
                    <div className="p-2 bg-green-50 rounded-md group-hover:bg-green-100 transition-colors">
                        <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-slate-900">Retail Sales Data</p>
                        <p className="text-xs text-slate-500">Sales, categories & satisfaction</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SampleDatasets;
