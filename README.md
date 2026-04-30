<div align="center">
  <img src="public/logo.png" alt="HireLens AI Logo" width="120" />
</div>

<h1 align="center">HireLens AI - Resume Reviewer 🤖🚀</h1>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/AI_Model-Llama_3-orange?style=for-the-badge&logo=meta" alt="AI Model Llama 3" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <em>Sistem cerdas evaluasi CV layaknya rekruter profesional dengan skor ATS, pemetaan keahlian, dan saran perbaikan instan.</em>
</p>

---

## 🌟 Fitur Utama

1. **Analisis Berbasis AI (Llama-3 / Groq)**
   Mengekstrak teks PDF secara lokal lalu mengirimkannya ke model *Large Language Model* super cepat untuk dievaluasi.
2. **Skor Keseluruhan & Skor ATS**
   Dapatkan representasi angka seberapa baik CV Anda dan seberapa mudah dibaca oleh robot seleksi otomatis (ATS).
3. **Kritik Per Bagian (Section Feedback)**
   Menilai bagian-bagian penting (Ringkasan, Pengalaman, Pendidikan, Keahlian, dll) dan langsung memberikan *insight* perbaikan.
4. **Kelebihan & Kekurangan (Strengths & Weaknesses)**
   Menyoroti secara objektif apa yang sudah bagus dan apa yang masih kurang dari profil kandidat berdasarkan target peran (*Target Role*).
5. **AI Assistant Interaktif (Lensy)**
   Karakter animasi yang menemani pengguna di setiap tahapan, mulai dari *idle*, *loading/thinking*, hingga merayakan hasil (*celebrating*).
6. **Animasi Halus & Responsif**
   Antarmuka kelas premium dengan *glassmorphism* dan transisi `framer-motion`, serta mendukung penuh resolusi *mobile*.

---

## 🛠️ Teknologi yang Digunakan

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs,git,github,vercel&theme=light" alt="Tech Stack" />
  </a>
</div>
<br/>

- **Frontend Core**: [Next.js](https://nextjs.org/) (App Router), React, TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & Lucide Icons
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **API & Data Fetching**: Axios
- **AI Processing**: `@langchain/groq` & Llama 3
- **Validasi Data AI**: Zod (Structured Output)
- **PDF Extraction**: `pdf-parse`

---

## ⚙️ Prasyarat (Requirements)

Sebelum memulai, pastikan Anda telah memiliki hal-hal berikut:
1. **Node.js** (v18 atau lebih baru)
2. **NPM**, **Yarn**, atau **pnpm**
3. Kunci API Groq (**Groq API Key**). Dapatkan di [Groq Console](https://console.groq.com/).

---

## 🚀 Cara Instalasi & Menjalankan (Local Setup)

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/username/ai-cv-reviewer.git
   cd ai-cv-reviewer
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Environment Variables**
   Buat sebuah file bernama `.env` (atau `.env.local`) di direktori utama (*root*) proyek, lalu tambahkan API Key Anda:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Jalankan Server Pengembangan (Dev Server)**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 📖 Cara Penggunaan Sistem

1. **Halaman Utama (Landing Page)**:
   Saat pertama kali masuk, Anda akan disambut oleh halaman depan interaktif dan AI Assistant **Lensy** di sudut kanan bawah. Klik tombol **Coba Sekarang** atau **Upload CV Anda**.

2. **Halaman Upload & Analisis (`/analyze`)**:
   - Tarik dan lepas (*drag and drop*) atau klik kotak untuk mengunggah file **CV berformat PDF** (Maks 5MB).
   - Masukkan **Target Posisi** (Contoh: *Frontend Developer*, *Data Analyst*).
   - Pilih tingkat **Senioritas** (Contoh: *Junior*, *Mid*, *Senior*).
   - (Opsional) Tempel *Job Description* spesifik jika Anda ingin AI menyesuaikan analisis terhadap loker tertentu.
   - Klik **Mulai Analisis CV**. Selama proses berjalan (biasanya ~5-10 detik), Lensy akan menampilkan indikator sedang berpikir (*thinking*).

3. **Halaman Dasbor Hasil (`/results`)**:
   - Setelah selesai, Anda akan dialihkan otomatis ke Dasbor Hasil.
   - Anda akan melihat visualisasi berupa metrik skor (*CV Score* dan *ATS Score*).
   - Tinjau **Missing Skills**, **Kekurangan Utama**, serta **Kelebihan** profil Anda.
   - Baca detail **Section Feedback** untuk memperbaiki kalimat dan kata kunci di resume Anda.
   - Anda dapat menekan **Analisis CV Baru** untuk mencoba dokumen lain.

---

## 📄 Catatan Pengembangan (Known Limitations)

- Karena ekstraksi file dilakukan menggunakan pustaka murni JavaScript (`pdf-parse`), struktur PDF multi-kolom yang sangat kompleks atau berupa gambar *scanned image* (bukan teks) mungkin tidak terbaca 100% sempurna. Gunakan PDF dengan format urutan standar ATS.
- Untuk deployment ke lingkungan serverless (misal: Vercel), fungsi ekstraksi dokumen memakan waktu beberapa detik. Pastikan fungsi server memiliki *timeout* yang cukup (Vercel Hobby plan maksimal 10 detik, direkomendasikan upgrade *timeout* jika diperlukan atau gunakan *streaming/background job* untuk produksi skala besar).

---

<div align="center">
  Dibuat dengan ❤️ untuk membantu para pencari kerja menggapai karier impian. 🌟
</div>
