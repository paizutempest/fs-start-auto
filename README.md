# 🌊 FS START AUTO REGISTER - Deep Ocean Identity
> **Developed by:** Paizutempest | **Version:** 1.2.0

Script otomatis untuk melakukan registrasi akun Abysea secara massal menggunakan email generator, menangkap token secara otomatis, dan melakukan adopsi NFT FS01.

## 🚀 Fitur Utama
- **Identity Generator:** Menggunakan User-Agent acak dari berbagai perangkat (Windows, Mac, Android, iOS) agar tidak terdeteksi sebagai bot.
- **Auto Email:** Integrasi otomatis dengan `generator.email` untuk pengambilan email baru.
- **Stealth Mode:** Menggunakan `playwright-extra` dan `stealth plugin` untuk menembus proteksi anti-bot.[cite: 1]
- **Auto Adoption:** Pembersihan pop-up otomatis dan pembelian NFT FSx (40 USDT) secara otomatis.[cite: 1]
- **Data Management:** Hasil registrasi (Email, Password, Token) disimpan otomatis ke dalam file `fs_results.json`.[cite: 1]

## 🛠️ Prasyarat
Pastikan kamu sudah menginstal **Node.js** (Versi 18 ke atas disarankan).

## 📥 Instalasi
1. Clone atau download folder script ini.
2. Buka terminal/CMD di folder tersebut.
3. Instal semua dependensi yang diperlukan:
   ```bash
   npm install
