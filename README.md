# Aymira Otel Yönetim Portalı

84 odalı otel için tarayıcı tabanlı yönetim portalı.

## Özellikler
- Görev panosu ve görev yönetimi
- Kat hizmetleri ve 84 oda kontrol listesi
- Teknik servis / arıza kayıtları
- Stok ve envanter
- Misafir şikâyetleri, duyurular ve kayıp eşya
- Günlük plan ve dahili mesajlar

> Bu proje şu anda bir **yerel demo**dur. Veriler tarayıcının localStorage alanında tutulur. Gerçek misafir veya çalışan kişisel verilerini burada saklamayın. GitHub deposu herkese açıktır.

## Windows'ta ilk kurulum
Git yüklüyse PowerShell'de:

```powershell
cd "$env:USERPROFILE\Downloads"
git clone https://github.com/Hurmanl/aymira-hotel.git
cd aymira-hotel
py -m http.server 5510
```

Tarayıcı: http://localhost:5510/

## Sonraki güncellemeler
Sunucuyu Ctrl+C ile durdurun, sonra:

```powershell
cd "$env:USERPROFILE\Downloads\aymira-hotel"
git pull
py -m http.server 5510
```

Not: 5510 portu doluysa eski sunucuyu kapatın veya başka port kullanın.

## Dosya yapısı
- `index.html`: uygulama iskeleti
- `style.css`: görünüm
- `app.js`: sayfalar ve işlemler

## Tasarım ve görseller
Görev Panosu, kullanıcının sağladığı GrandVista referansından esinlenerek AYMİRA kimliğiyle yeniden oluşturulmuştur. Ekran görüntüsü doğrudan arka plan olarak kullanılmaz; kartlar, etiketler ve butonlar canlı HTML/CSS öğeleridir. Grafikler gerçek görev sayılarını gösterir. Kaydedilmiş veriler `aymira-portal-pastel-v1` localStorage anahtarında korunur.

Bağımsız arka plan fotoğrafları, Unsplash License kapsamında yayınlanan örnek fotoğraflardır. Otelin gerçek fotoğrafları değildir:
- **Üst alan:** [Will Haddock, modern otel binası](https://unsplash.com/photos/modern-hotel-building-with-balconies-and-palm-trees-mO8uc43fF0U).
- **Yan menü:** [Max Bvp, akşam otel dış mekânı](https://unsplash.com/photos/luxury-hotel-illuminated-at-dusk-with-palm-trees-VuzYM4CzEiA).

Fotoğraflar CSS'deki internet adreslerinden yüklenir; bağlantı yokken arka plan gradyanı görünür. Canlı kullanıma geçmeden önce görselleri onaylı otel fotoğraflarıyla değiştirmek ve lisans koşullarını yeniden kontrol etmek uygundur.

## Geri alma
17 Kasım 2026 referans tasarımı değişikliklerinden önceki kod `backup-before-grandvista-redesign-2026-11-17` dalında saklanmıştır.

## Kapsam ve doğrulama
Statik HTML/CSS/JS demo; henüz çok kullanıcılı, sunucu tarafı yetkilendirmeli veya gerçek misafir verileri için güvenli bir üretim sistemi değildir. Temel JavaScript render ve veri modelinin kontrolü yapılmıştır; farklı tarayıcı ve ekran boyutlarında görsel test ayrıca yapılmalıdır.
