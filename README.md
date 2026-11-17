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

## Geliştirme notu
Depodaki sürüm temel kaynak kodlarla başlatılmıştır. Daha önce yerelde kullanılan görselli V2 tema henüz bu depoya aktarılmamıştır; tasarım değişiklikleri sonraki commit'lerde izlenecektir.
