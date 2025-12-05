import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import UploadZone from './components/upload/UploadZone';
import ImageUploadZone from './components/upload/ImageUploadZone';
import SampleDatasets from './components/upload/SampleDatasets';
import DataSummary from './components/analysis/DataSummary';
import ChartTypeGrid from './components/selector/ChartTypeGrid';
import ChartCanvas from './components/visualization/ChartCanvas';
import CaveatPanel from './components/education/CaveatPanel';
import useDataStore from './store/dataStore';
import { recommendCharts } from './utils/chartRecommendation';
import { Activity, BarChart, FileSpreadsheet, AlertCircle } from 'lucide-react';

function App() {
  const { status, data, columns, error } = useDataStore();
  const [selectedChart, setSelectedChart] = useState(null);
  const [uploadTab, setUploadTab] = useState('file'); // 'file' or 'image'

  const recommendations = useMemo(() => {
    if (status === 'ready' && columns.length > 0) {
      return recommendCharts(columns);
    }
    return [];
  }, [status, columns]);

  useEffect(() => {
    if (recommendations.length > 0 && !selectedChart) {
      setSelectedChart(recommendations[0]);
    }
  }, [recommendations, selectedChart]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Hero Section / State Display */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Turn your data into <span className="text-indigo-600">compelling stories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload your dataset and let our AI analyze it to recommend the best visualizations for your needs.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px] p-6">
            {status === 'idle' && (
              <div className="max-w-xl mx-auto mt-12 space-y-8">
                {/* Tab Switcher */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setUploadTab('file')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${uploadTab === 'file'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    📄 Dosya Yükle
                  </button>
                  <button
                    onClick={() => setUploadTab('image')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${uploadTab === 'image'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    🖼️ Görsel Yükle
                  </button>
                </div>

                {/* Upload Zone based on tab */}
                {uploadTab === 'file' ? <UploadZone /> : <ImageUploadZone />}

                <SampleDatasets />
              </div>
            )}

            {status === 'uploading' && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-slate-600">Processing your file...</p>
              </div>
            )}

            {status === 'ready' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Analysis Dashboard</h2>
                    <p className="text-slate-500">Explore your data and visualizations</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start New Analysis
                  </button>
                </div>

                <DataSummary columns={columns} data={data} />

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <ChartTypeGrid
                      recommendations={recommendations}
                      selectedChart={selectedChart}
                      onSelectChart={setSelectedChart}
                    />
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <ChartCanvas
                      data={data}
                      chartType={selectedChart}
                      columns={columns}
                    />
                    <CaveatPanel chartType={selectedChart} />
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Bir Hata Oluştu</h3>
                <p className="text-slate-600 max-w-md mb-4">{error || 'Bilinmeyen bir hata oluştu.'}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Yeniden Dene
                </button>
              </div>
            )}
          </div>

          {/* Features Grid (Only show on idle) */}
          {status === 'idle' && (
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <FileSpreadsheet className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Upload</h3>
                <p className="text-slate-600">Support for CSV and JSON files with automatic type detection and parsing.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Analysis</h3>
                <p className="text-slate-600">Automated statistical analysis to understand your data distribution and quality.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Auto Visualization</h3>
                <p className="text-slate-600">Get intelligent chart recommendations based on your data variables.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
