const fs = require('fs');
const path = require('path');

const srcDir = '/mnt/c/Users/Administrator/.gemini/antigravity/brain/dba5fc59-64af-4799-8584-0fb08736b6e2';
const logoSrc = path.join(srcDir, 'hirelens_logo_1777540501594.png');

const publicDest = path.join(__dirname, 'public', 'logo.png');
const appIconDest = path.join(__dirname, 'app', 'icon.png');
const defaultFavicon = path.join(__dirname, 'app', 'favicon.ico');

// 1. Copy ke public/logo.png (Untuk raw file / ditampilkan di UI)
fs.copyFileSync(logoSrc, publicDest);
console.log('✅ Logo berhasil disalin ke public/logo.png');

// 2. Copy ke app/icon.png (Next.js akan otomatis membuatnya menjadi favicon & web clip icon)
fs.copyFileSync(logoSrc, appIconDest);
console.log('✅ Logo berhasil disalin ke app/icon.png untuk favicon');

// 3. Hapus favicon.ico bawaan Next.js jika ada agar tidak bentrok
if (fs.existsSync(defaultFavicon)) {
  fs.unlinkSync(defaultFavicon);
  console.log('✅ Favicon lama (bawaan) berhasil dihapus');
}

console.log('Semua proses selesai! Silakan refresh halaman.');
