# 🖼️ Görsel Yükleme Özelliği Kullanım Kılavuzu

## Genel Bakış

DataViz AI artık grafik görsellerinden otomatik veri çıkarma özelliğine sahip! Bu özellik sayesinde:

- Grafik görsellerini yükleyebilir
- Sistem görseli analiz eder
- Veri çıkarılabilirse otomatik olarak grafik oluşturulur
- Çizilemez ise açıklayıcı mesaj gösterilir

## Kurulum

### 1. Gemini API Key Alma

Görsel analizi için Google Gemini Vision API kullanılmaktadır. API key almak için:

1. [Google AI Studio](https://makersuite.google.com/app/apikey) sayfasına gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. Oluşturulan API key'i kopyalayın

### 2. API Key'i Uygulamaya Ekleme

1. Uygulamayı açın
2. Sağ üst köşedeki ⚙️ (Settings) ikonuna tıklayın
3. Açılan pencereye API key'inizi yapıştırın
4. "Kaydet" butonuna tıklayın

API key tarayıcınızın localStorage'ında güvenli bir şekilde saklanır.

## Kullanım

### Adım 1: Görsel Yükleme Sekmesine Geçin

Ana sayfada "🖼️ Görsel Yükle" sekmesine tıklayın.

### Adım 2: Grafik Görselini Yükleyin

Desteklenen formatlar:
- PNG (.png)
- JPEG (.jpg, .jpeg)
- WebP (.webp)

**Yükleme Yöntemleri:**
- Drag & drop ile görseli sürükleyip bırakın
- Alana tıklayıp dosya seçin

### Adım 3: Analiz Sürecini Bekleyin

Sistem görseli analiz ederken:
1. "Görsel analiz ediliyor..." mesajı görünür
2. Gemini Vision API görseli işler
3. Grafik tipi ve veri yapısı tespit edilir

### Adım 4: Sonuçları İnceleyin

**Başarılı Analiz:**
- Veri otomatik olarak çıkarılır
- Grafik oluşturulur
- Normal analiz ekranına yönlendirilirsiniz

**Başarısız Analiz:**
- Hata mesajı gösterilir
- Neden çizilemediği açıklanır
- Alternatif olarak CSV/JSON yükleme önerilir

## Desteklenen Grafik Tipleri

Sistem şu grafik tiplerini tanıyabilir:

✅ **İyi Çalışan Tipler:**
- Bar Chart (Çubuk Grafik)
- Line Chart (Çizgi Grafik)
- Area Chart (Alan Grafik)
- Stream Graph (Akış Grafik)
- Scatter Plot (Nokta Grafik)
- Pie Chart (Pasta Grafik)

⚠️ **Sınırlı Destek:**
- Karmaşık 3D grafikler
- Çok katmanlı grafikler
- Düşük çözünürlüklü görseller
- El yazısı etiketli grafikler

## En İyi Sonuçlar İçin İpuçları

### ✅ Yapılması Gerekenler

1. **Yüksek Çözünürlük:** En az 800x600 piksel görsel kullanın
2. **Net Görüntü:** Bulanık olmayan, keskin görseller seçin
3. **Temiz Arka Plan:** Beyaz veya açık renkli arka plan tercih edin
4. **Okunabilir Etiketler:** Eksen etiketleri ve değerleri net olmalı
5. **Basit Grafikler:** Tek bir grafik içeren görseller daha iyi sonuç verir

### ❌ Kaçınılması Gerekenler

1. **Düşük Kalite:** Pikselleşmiş veya bulanık görseller
2. **Karmaşık Layout:** Birden fazla grafik içeren görseller
3. **Aşırı Dekorasyon:** Çok fazla renk, gölge, efekt
4. **Eksik Bilgi:** Eksen değerleri olmayan grafikler
5. **Screenshot'lar:** Ekran görüntüsü yerine orijinal görseli kullanın

## Örnek Kullanım Senaryoları

### Senaryo 1: Akademik Makale Grafiği

```
Durum: Bir makaledeki stream graph'i yeniden oluşturmak istiyorsunuz
Çözüm: 
1. Grafik görselini yükleyin
2. Sistem veriyi çıkarır
3. Kendi stilinizde yeniden oluşturun
```

### Senaryo 2: Rapor Grafiği Analizi

```
Durum: PDF raporundaki grafiği düzenlemek istiyorsunuz
Çözüm:
1. PDF'den grafiği PNG olarak export edin
2. DataViz AI'a yükleyin
3. Veriyi çıkarıp yeni grafik oluşturun
```

### Senaryo 3: Sosyal Medya Grafiği

```
Durum: Twitter'da gördüğünüz bir grafiği analiz etmek istiyorsunuz
Çözüm:
1. Görseli kaydedin
2. Uygulamaya yükleyin
3. Veri çıkarılabilirse analiz edin
```

## Sorun Giderme

### "API key not configured" Hatası

**Çözüm:** 
- Settings'den API key'inizi ekleyin
- Sayfayı yenileyin

### "Görsel çizilebilir bir grafik içermiyor" Hatası

**Nedenler:**
- Görsel gerçekten grafik içermiyor
- Grafik çok karmaşık
- Çözünürlük çok düşük
- Veri etiketleri okunamıyor

**Çözüm:**
- Daha yüksek kaliteli görsel deneyin
- Alternatif olarak CSV/JSON kullanın

### "Veri çıkarılamadı" Hatası

**Nedenler:**
- API isteği başarısız oldu
- Görsel formatı desteklenmiyor
- Dosya bozuk

**Çözüm:**
- İnternet bağlantınızı kontrol edin
- Farklı format deneyin (PNG önerilir)
- Görseli yeniden kaydedin

## Sınırlamalar

1. **API Limitleri:** Gemini API'nin ücretsiz kotası vardır
2. **Dosya Boyutu:** Maksimum 10MB
3. **Doğruluk:** %100 doğruluk garanti edilemez
4. **Karmaşıklık:** Çok karmaşık grafikler desteklenmeyebilir
5. **Dil:** İngilizce etiketler daha iyi sonuç verir

## Gizlilik ve Güvenlik

- API key'iniz sadece tarayıcınızda saklanır
- Görseller Google'ın sunucularına gönderilir (Gemini API)
- Verileriniz sunucularımızda saklanmaz (client-side app)
- API key'inizi kimseyle paylaşmayın

## Gelecek Geliştirmeler

- [ ] Offline OCR desteği (Tesseract.js)
- [ ] Daha fazla grafik tipi desteği
- [ ] Batch upload (çoklu görsel)
- [ ] Veri düzeltme arayüzü
- [ ] Export edilen veriyi kaydetme

## Destek

Sorunlarınız için:
1. README.md dosyasını okuyun
2. GitHub Issues'da arama yapın
3. Yeni issue açın

---

**Not:** Bu özellik Beta aşamasındadır. Geri bildirimleriniz çok değerlidir!
