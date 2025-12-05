import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, AlertCircle, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import useDataStore from '../../store/dataStore';
import { analyzeChartImage } from '../../utils/imageAnalysis';
import { analyzeDataset } from '../../utils/dataAnalysis';

const ImageUploadZone = () => {
    const { setFile, setAnalysisResult, setError, setStatus } = useDataStore();
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisMessage, setAnalysisMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Create preview
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        setFile({ name: file.name, size: file.size });
        setStatus('uploading');
        setAnalyzing(true);
        setProgress(0);

        try {
            // Step 1: Loading image
            setAnalysisMessage('📷 Görsel yükleniyor...');
            setProgress(10);
            await new Promise(resolve => setTimeout(resolve, 300));

            // Step 2: Color analysis
            setAnalysisMessage('🎨 Renkler analiz ediliyor...');
            setProgress(25);
            await new Promise(resolve => setTimeout(resolve, 300));

            // Step 3: OCR analysis
            setAnalysisMessage('📝 Metin ve sayılar çıkarılıyor (OCR)...');
            setProgress(40);

            // Perform actual analysis
            const result = await analyzeChartImage(file);

            setProgress(80);
            setAnalysisMessage('📊 Grafik verisi oluşturuluyor...');
            await new Promise(resolve => setTimeout(resolve, 500));

            if (!result.extractable) {
                setAnalyzing(false);
                setError(result.reason || 'Bu görsel analiz edilemedi.');
                setAnalysisMessage('');
                setPreviewUrl(null);
                return;
            }

            // If extractable, process the data
            setProgress(90);
            setAnalysisMessage('✅ Veri işleniyor...');

            if (result.data && result.data.length > 0) {
                // Analyze the extracted data
                const columns = analyzeDataset(result.data);

                setTimeout(() => {
                    setProgress(100);
                    setAnalysisMessage('🎉 Tamamlandı!');

                    setTimeout(() => {
                        setAnalysisResult(result.data, columns);
                        setAnalyzing(false);
                        setAnalysisMessage('');
                        setPreviewUrl(null);
                    }, 500);
                }, 500);
            } else {
                throw new Error('Veri oluşturulamadı');
            }

        } catch (err) {
            console.error('Image analysis error:', err);
            setAnalyzing(false);
            setAnalysisMessage('');
            setPreviewUrl(null);
            setError(err.message || 'Görsel analizi başarısız oldu.');
        }
    }, [setFile, setAnalysisResult, setError, setStatus]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${isDragActive ? 'border-purple-500 bg-purple-50 scale-[1.02]' : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50'}
                    ${isDragReject ? 'border-red-500 bg-red-50' : ''}
                    ${analyzing ? 'pointer-events-none' : ''}
                `}
            >
                <input {...getInputProps()} />

                {/* Preview Image */}
                {previewUrl && analyzing && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                    </div>
                )}

                <div className="relative flex flex-col items-center gap-3">
                    <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                        ${analyzing ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : isDragActive ? 'bg-purple-100' : 'bg-purple-50'}
                    `}>
                        {analyzing ? (
                            <div className="relative">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                        ) : (
                            <ImageIcon className={`w-8 h-8 ${isDragActive ? 'text-purple-600' : 'text-purple-500'}`} />
                        )}
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-slate-900">
                            {analyzing ? 'Görsel Analiz Ediliyor...' : (isDragActive ? 'Görseli buraya bırakın' : 'Grafik görseli yükleyin')}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                            {analyzing ? analysisMessage : 'PNG, JPG, WEBP (max 10MB)'}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    {analyzing && (
                        <div className="w-full max-w-xs mt-2">
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1 text-center">{progress}%</p>
                        </div>
                    )}

                    {!analyzing && (
                        <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                .png
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                .jpg
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                .webp
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-green-900">🚀 Yerel Görsel Analizi</p>
                        <p className="text-green-700 mt-1">
                            Görseliniz <strong>tamamen yerel olarak</strong> analiz edilir. API key gerekmez!
                        </p>
                        <ul className="mt-2 text-xs text-green-600 space-y-1">
                            <li>✅ OCR ile metin ve sayı çıkarma</li>
                            <li>✅ Renk analizi ile grafik tipi tespiti</li>
                            <li>✅ Otomatik veri oluşturma</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadZone;
