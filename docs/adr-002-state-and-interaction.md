# ADR-002: State ve Interaction Yönetimi

## Karar
Basit state yönetimi için vanilla TypeScript değişkenleri kullanıldı.

## Örnek
- isPaymentSelected
- currentImage
- isDark

## Neden?
- Proje küçük ölçekli
- Framework gereksiz overhead oluşturur
- Hızlı geliştirme ihtiyacı

## Sonuç
Framework yerine vanilla TS state yönetimi tercih edildi.