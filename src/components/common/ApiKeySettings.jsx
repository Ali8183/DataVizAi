import React, { useState } from 'react';
import { Info, X, Cpu, Eye, FileText, Palette } from 'lucide-react';

const ApiKeySettings = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-all"
                title="Hakkında"
            >
                <Info className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                                    <Cpu className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Yerel Görsel Analizi</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-slate-100 rounded-full"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Main Feature */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                                <p className="font-semibold text-green-900 mb-2">🚀 API Key Gerekmez!</p>
                                <p className="text-sm text-green-700">
                                    Tüm görsel analizi <strong>tarayıcınızda yerel olarak</strong> gerçekleştirilir.
                                    Verileriniz hiçbir sunucuya gönderilmez.
                                </p>
                            </div>

                            {/* How it works */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <p className="font-semibold text-slate-900 mb-3">🔍 Nasıl Çalışır?</p>

                                <div className="space-y-3">
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Eye className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">1. Görsel Yükleme</p>
                                            <p className="text-xs text-slate-600">PNG, JPG veya WEBP formatında grafik görseli yükleyin</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Palette className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">2. Renk Analizi</p>
                                            <p className="text-xs text-slate-600">Canvas API ile renkler analiz edilir ve grafik tipi tespit edilir</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">3. OCR ile Metin Çıkarma</p>
                                            <p className="text-xs text-slate-600">Tesseract.js ile görselndeki yazılar ve sayılar okunur</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <Cpu className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">4. Veri Oluşturma</p>
                                            <p className="text-xs text-slate-600">Çıkarılan bilgilerden grafik verisi otomatik oluşturulur</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Supported Charts */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="font-semibold text-blue-900 mb-2">📊 Desteklenen Grafik Tipleri</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Bar Chart
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Line Chart
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Pie Chart
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Stream Graph
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Area Chart
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-700">
                                        <span>✅</span> Scatter Plot
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                                <p className="font-semibold text-amber-900 mb-1">💡 En İyi Sonuçlar İçin</p>
                                <ul className="text-amber-700 space-y-1 list-disc list-inside">
                                    <li>Yüksek çözünürlüklü görseller kullanın</li>
                                    <li>Açık arka planlı görseller tercih edin</li>
                                    <li>Etiketler ve değerler net görünmeli</li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-purple-500/25"
                            >
                                Anladım
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApiKeySettings;
