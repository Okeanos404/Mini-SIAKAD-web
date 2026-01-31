# 🎓 Mini SIAKAD — Sistem Akademik Mini (Frontend Simulation)

Mini SIAKAD adalah aplikasi web **simulasi Sistem Informasi Akademik** yang dibangun menggunakan **HTML, CSS, dan JavaScript (ES Modules)**.  
Proyek ini bertujuan sebagai **media pembelajaran**, **latihan arsitektur frontend**, dan **portfolio GitHub**.

Aplikasi ini mensimulasikan alur dasar sistem akademik seperti:
- Login mahasiswa
- Kartu Rencana Studi (KRS)
- Jadwal kuliah
- Nilai / KHS
- Perhitungan IPK

> ⚠️ **Catatan:**  
> Mini SIAKAD adalah **frontend-only project** (tanpa backend & database).  
> Data disimpan menggunakan **LocalStorage** untuk keperluan simulasi.

---

## ✨ Fitur Utama

### 🔐 Autentikasi (Simulasi)
- Login mahasiswa (NIM, Nama, Semester)
- Validasi sederhana
- Session berbasis LocalStorage

### 📘 Kartu Rencana Studi (KRS)
- Menampilkan daftar mata kuliah
- Tambah & hapus mata kuliah
- Perhitungan total SKS otomatis
- Pencegahan duplikasi KRS

### 📅 Jadwal Kuliah
- Jadwal berdasarkan mata kuliah yang diambil
- Tampilan tabel akademik yang rapi

### 📊 Nilai / KHS
- Input nilai (A–E)
- Update nilai secara real-time
- Re-render otomatis saat nilai berubah

### 🎓 IPK
- Perhitungan IPK otomatis
- Berdasarkan SKS & bobot nilai
- Sinkron dengan KRS & KHS

---

## 🧱 Struktur Proyek

```
├── 📁 assets
│   ├── 📁 css
│   │   └── 🎨 style.css
│   ├── 📁 img
│   │   ├── 🖼️ logo-mini-siakad-2.png
│   │   └── 🖼️ logo-mini-siakad.png
│   └── 📄 favicon.ico
├── 📁 js
│   ├── 📁 akademik
│   │   ├── 📄 ipk.js
│   │   ├── 📄 jadwal.js
│   │   ├── 📄 krs.js
│   │   └── 📄 nilai.js
│   ├── 📁 core
│   │   ├── 📄 alert.js
│   │   ├── 📄 auth.js
│   │   ├── 📄 router.js
│   │   └── 📄 storage.js
│   ├── 📁 data
│   │   └── 📄 dummyData.js
│   ├── 📁 pages
│   │   ├── 📄 ipkPage.js
│   │   ├── 📄 jadwalPage.js
│   │   ├── 📄 khsPage.js
│   │   └── 📄 krsPage.js
│   └── 📄 main.js
├── 📝 README.md
├── 🌐 dashboard.html
├── 🌐 index.html
└── 🌐 login.html
```

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**
- **CSS3**
  - CSS Variables
  - Flexbox & Grid
  - Responsive Design
  - Micro animation
- **JavaScript (ES6+)**
  - ES Modules
  - DOM Manipulation
  - LocalStorage API

Tanpa:
- Backend
- Framework (React, Vue, dsb)
- Database

---

## 📱 Responsive Design

Mini SIAKAD dirancang **mobile-friendly**:
- Sidebar berubah menjadi slide menu di layar kecil
- Tabel dapat di-scroll horizontal
- Layout tetap rapi di desktop & smartphone

---

## 🚀 Cara Menjalankan

### Opsi 1 — VS Code (Recommended)
1. Clone repository ini
2. Buka folder di **VS Code**
3. Install ekstensi **Live Server**
4. Klik kanan `login.html` → **Open with Live Server**

### Opsi 2 — Browser Langsung
1. Download / clone project
2. Buka `login.html` menggunakan browser

> ⚠️ Karena menggunakan ES Modules, **tidak disarankan membuka file langsung tanpa server**.

---

## 🎯 Tujuan Proyek

- Latihan arsitektur frontend modular
- Simulasi sistem akademik
- Portfolio GitHub mahasiswa
- Dasar sebelum migrasi ke:
  - Backend (Node.js / Laravel)
  - Database (MySQL / MongoDB)
  - Framework (React / Vue)

---

## 🔮 Pengembangan Selanjutnya (Future Plan)

- 🔐 Role Admin & Dosen
- 🗄️ Backend API
- 📡 Database real
- 🧾 Export KRS / KHS ke PDF
- 🌙 Dark Mode
- 📊 Chart IPK

---

## 👤 Author

**Riyan**  
Mahasiswa Sistem Informasi  
Project ini dibuat untuk keperluan pembelajaran & portfolio.

---

## 📄 Lisensi

Proyek ini bersifat **open for learning**.  
Bebas digunakan untuk:
- Referensi belajar
- Tugas kuliah
- Pengembangan pribadi

❌ Tidak untuk penggunaan komersial tanpa izin.

---
