# DataViz AI - Intelligent Data Visualization Platform

![DataViz AI](https://img.shields.io/badge/React-18+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC.svg)
![Recharts](https://img.shields.io/badge/Recharts-Latest-8884d8.svg)

**DataViz AI**, "From Data to Viz" metodolojisini temel alan, tamamen client-side çalışan, akıllı bir veri görselleştirme web uygulamasıdır. Kullanıcının verilerini analiz edip en uygun görselleştirme yöntemlerini önerir ve eğitici içerik sunar.

## ✨ Özellikler

### 🎯 Temel Özellikler

- **📁 Kolay Veri Yükleme**
  - Drag & drop ile CSV ve JSON dosya desteği
  - **🖼️ YENİ: Grafik görseli yükleme ve otomatik veri çıkarma**
  - Otomatik veri tipi tespiti
  - Örnek veri setleri ile hızlı deneme
  - Max 10MB dosya boyutu desteği

- **🤖 Görsel Analizi (Beta)**
  - Gemini Vision API ile grafik görsellerinden otomatik veri çıkarma
  - Stream graph, area chart, bar chart gibi grafikleri tanıma
  - Çizilebilir/çizilemez grafik kontrolü
  - Akıllı veri yapısı tespiti

- **🧠 Akıllı Veri Analizi**
  - Otomatik veri tipi tespiti (Sayısal, Kategorik, Tarih, Boolean)
  - İstatistiksel analiz (Min, Max, Mean, Median, Std)
  - Null/missing değer kontrolü
  - Unique değer analizi

- **📊 Gelişmiş Görselleştirme**
  - **Bar Chart** - Kategorik karşılaştırmalar
  - **Line Chart** - Zaman serisi trendleri
  - **Scatter Plot** - İki değişken ilişkisi
  - **Pie Chart** - Oransal dağılımlar
  - **Heatmap** - Kategorik korelasyonlar
  - Ve daha fazlası...

- **🎓 Eğitici İçerik**
  - Her grafik için uyarılar (Caveats)
  - Best practices önerileri
  - Kod snippet'leri (React/Recharts)
  - Export özellikleri (PNG)

## 🚀 Kurulum

### Gereksinimler

- Node.js 16+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
   \`\`\`bash
   git clone <repository-url>
   cd ders
   \`\`\`

2. **Bağımlılıkları yükleyin:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Geliştirme sunucusunu başlatın:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Tarayıcınızda açın:**
   \`\`\`
   http://localhost:5173
   \`\`\`

## 📁 Proje Yapısı

\`\`\`
src/
├── components/
│   ├── layout/           # Header, Footer
│   ├── upload/           # UploadZone, SampleDatasets
│   ├── analysis/         # DataSummary, ColumnTypeSelector
│   ├── selector/         # ChartTypeGrid, ChartCard
│   ├── visualization/    # ChartCanvas, ChartControls
│   │   └── charts/       # BarChart, LineChart, ScatterPlot, etc.
│   └── education/        # CaveatPanel, BestPractices
├── utils/
│   ├── dataAnalysis.js         # Veri analiz fonksiyonları
│   ├── chartRecommendation.js  # Grafik öneri algoritması
│   └── exportHelpers.js        # Export ve kod üretimi
├── store/
│   └── dataStore.js      # Zustand state management
├── constants/
│   └── sampleData.js     # Örnek veri setleri
├── App.jsx               # Ana uygulama
└── main.jsx              # Entry point
\`\`\`

## 🎨 Teknoloji Stack

- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS 3+
- **Charts:** Recharts (primary), D3.js (advanced)
- **Data Processing:** PapaParse, Lodash, MathJS
- **Icons:** Lucide-React
- **State Management:** Zustand
- **Build Tool:** Vite

## 📊 Kullanım

### 1. API Key Ayarlama (Görsel Analizi İçin - Opsiyonel)

Grafik görsellerinden veri çıkarmak için Gemini API key gereklidir:

1. Sağ üstteki ⚙️ (Settings) ikonuna tıklayın
2. [Google AI Studio](https://makersuite.google.com/app/apikey) sayfasından API key alın
3. API key'i ayarlar penceresine yapıştırın ve kaydedin

**Not:** API key olmadan da CSV/JSON dosyaları ile tüm özellikleri kullanabilirsiniz.

### 2. Veri Yükleme

**Dosya Yükleme:** CSV veya JSON dosyanızı drag & drop ile yükleyin

**Görsel Yükleme (Beta):** 
- "🖼️ Görsel Yükle" sekmesine geçin
- Grafik görselinizi (PNG, JPG, WEBP) yükleyin
- Sistem görseli analiz edip veri çıkarır
- Çizilebilir ise otomatik olarak grafik oluşturulur
- Çizilemez ise uyarı mesajı gösterilir

**Örnek Veri:** "Retail Sales Data" örneğini kullanarak hızlıca deneyin

### 2. Veri Analizi

Yüklenen veri otomatik olarak analiz edilir:
- Sütun tipleri tespit edilir
- İstatistiksel özetler hesaplanır
- Missing değerler raporlanır

### 3. Görselleştirme Seçimi

- Sistem otomatik olarak en uygun grafik tiplerini önerir
- "Best Fit" badge'i ile en iyi seçenek işaretlenir
- Farklı grafik tiplerini deneyebilirsiniz

### 4. Grafik Kontrolü

- **Export:** PNG formatında indirin
- **Code View:** React kod snippet'ini görüntüleyin
- **Share:** Analizi paylaşın (yakında)

## 🎯 Grafik Öneri Mantığı

Sistem, veri tiplerini analiz ederek otomatik öneriler sunar:

| Veri Tipi | Önerilen Grafik |
|-----------|----------------|
| 1 Sayısal | Histogram, Box Plot |
| 1 Kategorik | Bar Chart, Pie Chart |
| 2 Sayısal | Scatter Plot, 2D Density |
| 1 Sayısal + 1 Kategorik | Grouped Bar, Box Plot |
| 2 Kategorik | Heatmap, Mosaic Plot |
| 1 Sayısal + Tarih | Line Chart, Area Chart |

## 🔧 Geliştirme

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview

\`\`\`bash
npm run preview
\`\`\`

### Lint

\`\`\`bash
npm run lint
\`\`\`

## 📝 Özellik Roadmap

- [ ] Daha fazla grafik tipi (Violin Plot, Treemap, Network Graph)
- [ ] D3.js entegrasyonu ile advanced visualizations
- [ ] Plotly.js ile 3D grafikler
- [ ] SVG export desteği
- [ ] URL ile paylaşma özelliği
- [ ] Dark mode
- [ ] Çoklu dil desteği
- [ ] Veri filtreleme ve transformation
- [ ] Custom color palettes

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit yapın (\`git commit -m 'Add amazing feature'\`)
4. Push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request açın

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🙏 Teşekkürler

- [From Data to Viz](https://www.data-to-viz.com/) - Metodoloji
- [Recharts](https://recharts.org/) - Chart library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icons

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

**Made with ❤️ using React + Vite + Tailwind CSS**
