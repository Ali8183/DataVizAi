import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import useDataStore from '../../store/dataStore';
import { analyzeDataset } from '../../utils/dataAnalysis';

const UploadZone = () => {
    const { setFile, setAnalysisResult, setError, setStatus } = useDataStore();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setFile({ name: file.name, size: file.size });

        // Basic validation
        if (file.size > 10 * 1024 * 1024) { // 10MB
            setError('File size exceeds 10MB limit');
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target.result;

            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                try {
                    const data = JSON.parse(text);
                    // Normalize JSON if it's not an array of objects
                    const normalizedData = Array.isArray(data) ? data : [data];
                    processData(normalizedData);
                } catch (err) {
                    setError('Invalid JSON format');
                }
            } else {
                // Assume CSV
                Papa.parse(text, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (results.errors.length > 0) {
                            console.warn('CSV Parse Errors:', results.errors);
                        }
                        processData(results.data);
                    },
                    error: (err) => {
                        setError(`CSV Parsing Error: ${err.message}`);
                    }
                });
            }
        };

        reader.onerror = () => {
            setError('Failed to read file');
        };

        reader.readAsText(file);
    }, []);

    const processData = (data) => {
        if (!data || data.length === 0) {
            setError('Dataset is empty');
            return;
        }

        // Perform detailed analysis
        const columns = analyzeDataset(data);

        // Simulate analysis delay for UX
        setTimeout(() => {
            setAnalysisResult(data, columns);
        }, 1000);
    };

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/json': ['.json']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`
        relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
        ${isDragReject ? 'border-red-500 bg-red-50' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4">
                <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${isDragActive ? 'bg-indigo-100' : 'bg-slate-100'}
        `}>
                    <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>

                <div>
                    <p className="text-lg font-medium text-slate-900">
                        {isDragActive ? 'Drop your file here' : 'Drag & drop your dataset'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                        Supports CSV and JSON (max 10MB)
                    </p>
                </div>

                <div className="flex gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        .csv
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        .json
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UploadZone;
