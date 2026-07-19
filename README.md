# 🏫 SIAP Merdeka (Sistem Informasi Akademik Pelajar)

**SIAP Merdeka** adalah aplikasi web simulasi **Sistem Informasi Akademik (SIAKAD)** yang khusus disesuaikan dengan konsep pendidikan terbaru di Indonesia, yaitu **Kurikulum Merdeka**. Dibangun dengan arsitektur frontend modern menggunakan **HTML, CSS, dan JavaScript (ES Modules)** murni tanpa bantuan framework yang berat.

Proyek ini sangat cocok untuk **media pembelajaran**, **demonstrasi UI/UX interaktif**, maupun sebagai **portfolio frontend developer**.

> ⚠️ **Catatan:**  
> Proyek ini murni berbasis **Frontend (Client-side)** tanpa backend maupun database eksternal. Semua data operasional (seperti nilai, status jurusan, dan preferensi akun) disimpan sementara dan diproses menggunakan **LocalStorage**.

---

## ✨ Fitur-fitur Utama

### 🔐 Sistem Login Terintegrasi
- Autentikasi berbasis **NISN** dan **Password**.
- Menggunakan state management sederhana dengan LocalStorage.

### ⚙️ Pengaturan Akun Lengkap
- Siswa dapat mengunggah **Foto Profil (Avatar)** langsung dari perangkat (disimpan dalam format Base64).
- Kemampuan mengubah informasi pribadi seperti Nama Lengkap, Jenis Kelamin, Tanggal Lahir, Umur, dan Alamat.
- Sinkronisasi otomatis ke header halaman tanpa perlu memuat ulang (*refresh*).

### 📊 Rapor Akademik (Kurikulum Merdeka)
- Input dan pemantauan nilai setiap mata pelajaran per fase/semester.
- Perhitungan dan penampilan rata-rata nilai secara *real-time*.

### 🎓 Rapor Projek Penguatan Profil Pelajar Pancasila (P5)
- Sistem penilaian berbasis predikat (Belum Berkembang, Mulai Berkembang, Berkembang Sesuai Harapan, Sangat Berkembang) untuk 6 dimensi utama Profil Pelajar Pancasila.

### 🎯 Penentuan / Asesmen Jurusan
- Mengakomodasi penjurusan atau minat bakat siswa (IPA/IPS).
- Menyesuaikan jadwal dan kurikulum pelajaran secara otomatis berdasarkan pilihan siswa.

### 📅 Jadwal Pelajaran Dinamis
- Daftar mata pelajaran terperinci sesuai kelas dan pilihan jurusan.
- Indikator tabel yang elegan dan mudah dibaca.

### 💳 Informasi Pembayaran
- Simulasi fitur keuangan, rincian biaya SPP, uang pangkal, maupun kegiatan sekolah.

### 🖨️ Export Laporan ke PDF
- Terintegrasi dengan fitur **Download PDF** pada Rapor Akademik, Rapor P5, dan Jadwal.
- Menggunakan `html2pdf` dan dilengkapi dengan rendering **Kop Surat (Logo Sekolah)** secara otomatis untuk dokumen resmi.

---

## 💻 Teknologi yang Digunakan

- **HTML5 & CSS3**
  - Desain modern (*Glassmorphism*, gradasi warna eksklusif, CSS Variables).
  - Sistem layout yang **100% Responsif** menggunakan CSS Grid dan Flexbox.
- **JavaScript (Vanilla ES6+)**
  - Arsitektur berbasis **ES Modules** (`import` / `export`).
  - Sistem routing (SPA - *Single Page Application* behavior) buatan sendiri tanpa framework.
  - Interaksi DOM dan state management dinamis.
- **Library Tambahan**
  - `html2pdf.bundle.min.js` (Hanya dipanggil dari CDN untuk keperluan Export PDF).

---

## 📱 Mobile-Friendly (Responsif)

Sistem telah dirancang agar sempurna saat dibuka lewat perangkat seluler (*Smartphone*).
- Form dan kartu akan menyesuaikan ukuran layar agar tidak terpotong (mengurangi ukuran *padding*).
- Navigasi *Sidebar* utama otomatis beralih menjadi *Sliding Menu* tersembunyi yang muncul dari sisi kanan layar.
- Tabel-tabel data panjang mendukung gulir horizontal (*scroll*).

---

## 🔑 Data Uji Coba (Dummy Accounts)

Untuk masuk ke dalam *dashboard*, silakan gunakan kredensial berikut.  
**Password default untuk semua akun adalah: `password`**

- **NISN 10001** (Budi Santoso - Kls 10A)
- **NISN 10002** (Siti Aminah - Kls 10B)
- **NISN 11001** (Andi Saputra - Kls 11 IPA)
- **NISN 11002** (Dewi Lestari - Kls 11 IPA)
- **NISN 11003** (Rina Kusuma - Kls 11 IPS)
- **NISN 11004** (Agus Pratama - Kls 11 IPS)

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini menggunakan sistem *JavaScript Modules*, sehingga browser mencegahnya berjalan melalui protokol sederhana `file://`. Anda wajib menjalankannya melalui *Local Web Server*.

**Metode yang Disarankan (VS Code):**
1. Buka folder proyek ini di editor **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang.
3. Buka file `login.html`.
4. Klik tombol **"Go Live"** di bilah bawah VS Code atau klik kanan file lalu pilih **Open with Live Server**.
5. Browser akan otomatis membuka aplikasi. Silakan login.

---

## 📄 Lisensi

Proyek simulasi ini bebas digunakan, dimodifikasi, maupun dikembangkan untuk keperluan pendidikan, tugas sekolah/kuliah, dan referensi portofolio secara **Gratis / Open-Source**.
