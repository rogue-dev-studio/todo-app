# 📝 Todo List App

[![OMEANS Team](https://img.shields.io/badge/Developed%20by-OMEANS%20Team-blue?style=for-the-badge&logo=github)](https://omeans-team.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-red?style=for-the-badge)](https://omeans-team.github.io)

> Aplikasi web modern dan responsif untuk mengelola tugas harian dengan antarmuka yang user-friendly. Dibangun dengan teknologi terdepan untuk produktivitas maksimal.

## 🌟 Demo

**🌐 Live Demo:** [https://omeans-team.github.io/todo-app](https://omeans-team.github.io/todo-app)

**📱 PWA Support:** Install sebagai aplikasi desktop/mobile untuk pengalaman terbaik!

## ✨ Fitur Utama

### 🎯 Manajemen Tugas
- **Tambah Tugas**: Input tugas baru dengan validasi karakter (maksimal 100 karakter)
- **Edit Tugas**: Klik tombol edit (✏️) untuk mengubah teks tugas
- **Hapus Tugas**: Klik tombol hapus (🗑️) untuk menghapus tugas
- **Toggle Status**: Klik checkbox untuk menandai tugas selesai/belum selesai
- **Filter Tugas**: Filter berdasarkan status (Semua, Aktif, Selesai)

### 📊 Tampilan Data
- **List View**: Tampilan daftar tradisional dengan animasi smooth
- **Table View**: Tampilan tabel terorganisir dengan kolom sortable
- **Pagination**: Navigasi halaman dengan kontrol jumlah item per halaman
- **Responsive Design**: Optimal di desktop, tablet, dan mobile

### 📈 Statistik & Analisis
- **Progress Bar**: Visualisasi progress keseluruhan
- **Pie Chart**: Diagram distribusi status tugas
- **Statistik Harian**: Data tugas hari ini dan rata-rata per hari
- **Skor Produktivitas**: Sistem scoring berdasarkan completion rate
- **Sidebar Statistik**: Panel statistik yang dapat dibuka/tutup

### 💾 Data Management
- **Local Storage**: Data tersimpan otomatis di browser
- **Export Excel**: Export data ke format Excel (.xlsx)
- **Export JSON**: Export data ke format JSON
- **Import Data**: Import data dari file JSON
- **Backup & Restore**: Sistem backup dan restore data

### 🔗 Sharing & Collaboration
- **Web Share API**: Bagikan aplikasi ke media sosial
- **Copy Link**: Fallback untuk browser yang tidak mendukung Web Share API
- **PWA Support**: Install sebagai aplikasi desktop/mobile

## 🚀 Quick Start

### Instalasi Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/omeans-team/todo-app.git
   cd todo-app
   ```

2. **Buka di Browser**
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js
   npx live-server
   
   # Menggunakan PHP
   php -S localhost:8000
   ```

3. **Akses Aplikasi**
   ```
   http://localhost:8000
   ```

### Install PWA

1. Buka aplikasi di browser
2. Klik tombol "Install" di address bar
3. Atau gunakan menu browser untuk "Add to Home Screen"
4. Nikmati pengalaman offline!

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5**: Semantic markup dan accessibility
- **CSS3**: Modern styling dengan CSS Grid dan Flexbox
- **JavaScript ES6+**: Vanilla JavaScript dengan class-based architecture
- **Chart.js**: Library untuk visualisasi data
- **SheetJS**: Library untuk export/import Excel

### PWA Features
- **Service Worker**: Offline functionality dan caching
- **Web App Manifest**: Install prompt dan app-like experience
- **Local Storage**: Client-side data persistence
- **Web Share API**: Native sharing capabilities

### Responsive Design
- **Mobile First**: Design dimulai dari mobile
- **Breakpoints**: 480px, 640px, 768px, 1024px
- **Touch Friendly**: Optimized untuk touch devices
- **Progressive Enhancement**: Fitur bertahap sesuai kemampuan browser

## 📱 Kompatibilitas

### Browser Support
- **Chrome**: 60+ (Full support)
- **Firefox**: 55+ (Full support)
- **Safari**: 12+ (Full support)
- **Edge**: 79+ (Full support)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

### Device Support
- **Desktop**: Windows, macOS, Linux
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones
- **Smart TV**: Web browsers on smart TVs

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Fokus ke input tugas baru |
| `Ctrl/Cmd + F` | Filter ke "Semua" |
| `Ctrl/Cmd + 1` | Switch ke List View |
| `Ctrl/Cmd + 2` | Switch ke Table View |
| `Ctrl/Cmd + S` | Buka/tutup statistik |
| `Ctrl/Cmd + E` | Export ke Excel |
| `Escape` | Tutup statistik atau cancel edit |
| `Enter` | Simpan edit atau tambah tugas baru |

## 📚 Dokumentasi

### Tutorial Lengkap
Lihat file [`about.md`](./about.md) untuk tutorial penggunaan yang sangat lengkap, termasuk:
- Panduan step-by-step untuk semua fitur
- Tutorial import/export data
- Tips dan trik produktivitas
- Troubleshooting guide

### API Reference
Aplikasi menggunakan Local Storage API untuk penyimpanan data:
```javascript
// Menyimpan data
localStorage.setItem('todos', JSON.stringify(todos));

// Mengambil data
const todos = JSON.parse(localStorage.getItem('todos')) || [];
```

## 🎯 Tujuan dan Manfaat

### Untuk Individu
- **Productivity**: Meningkatkan produktivitas harian
- **Organization**: Mengorganisir tugas dengan sistematis
- **Tracking**: Melacak progress dan achievement
- **Motivation**: Sistem scoring untuk motivasi

### Untuk Tim
- **Collaboration**: Berbagi data melalui export/import
- **Reporting**: Export Excel untuk laporan
- **Consistency**: Format data yang konsisten
- **Accessibility**: Akses dari berbagai device

### Untuk Organisasi
- **Data Analysis**: Analisis produktivitas tim
- **Integration**: Import data dari sistem lain
- **Compliance**: Backup dan audit trail
- **Scalability**: Mendukung jumlah data besar

## 🔒 Privasi dan Keamanan

### Data Storage
- **Local Only**: Data tersimpan hanya di browser pengguna
- **No Server**: Tidak ada data yang dikirim ke server
- **Privacy**: Data tetap milik pengguna sepenuhnya
- **Control**: Pengguna memiliki kontrol penuh atas data

### Export/Import
- **Client-side**: Semua proses export/import di client
- **No Upload**: Tidak ada upload data ke server
- **Format Standard**: Menggunakan format standar (JSON, Excel)
- **Validation**: Validasi data untuk keamanan

## 🎨 Kustomisasi

### Theme
- **Color Scheme**: Skema warna yang konsisten
- **Dark Mode**: Support untuk dark mode (future)
- **Custom CSS**: Mudah dikustomisasi dengan CSS variables
- **Responsive**: Adaptif terhadap preferensi sistem

### Layout
- **Flexible Grid**: Layout yang fleksibel
- **Component-based**: Komponen yang dapat dikonfigurasi
- **Accessibility**: Mengikuti WCAG guidelines
- **Internationalization**: Support untuk berbagai bahasa

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Berikut cara berkontribusi:

### Cara Kontribusi
1. **Fork** repository ini
2. **Buat branch** untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Buat Pull Request**

### Guidelines
- Ikuti standar coding yang ada
- Tambahkan dokumentasi untuk fitur baru
- Test fitur sebelum submit
- Gunakan commit message yang jelas

### Report Bugs
Jika menemukan bug, silakan:
1. Cek [Issues](https://github.com/omeans-team/todo-app/issues) yang sudah ada
2. Buat issue baru dengan detail yang lengkap
3. Sertakan screenshot jika diperlukan

## 📄 Lisensi

### Open Source
- **MIT License**: Lisensi permissive
- **Free to Use**: Gratis untuk penggunaan pribadi dan komersial
- **Attribution**: Credit untuk OMEANS Team
- **Modification**: Bebas dimodifikasi dan didistribusikan

### Contribution
- **GitHub**: Source code tersedia di GitHub
- **Issues**: Report bugs dan feature requests
- **Pull Requests**: Kontribusi kode dipersilakan
- **Documentation**: Bantuan untuk dokumentasi

## 🆘 Support dan Bantuan

### Dokumentasi
- **README**: Dokumentasi lengkap ini
- **About Page**: Tutorial lengkap di [`about.md`](./about.md)
- **In-app Help**: Tooltip dan pesan bantuan
- **Video Tutorial**: Tutorial video (coming soon)

### Community
- **GitHub Issues**: [Technical support](https://github.com/omeans-team/todo-app/issues)
- **Discussions**: [Forum diskusi fitur](https://github.com/omeans-team/todo-app/discussions)
- **Examples**: Contoh penggunaan
- **Templates**: Template data untuk berbagai use case

### Contact & Support

#### 🌐 OMEANS Team
- **Website**: [https://omeans-team.github.io](https://omeans-team.github.io)
- **Portfolio**: [https://omeans-team.github.io](https://omeans-team.github.io)
- **Email**: aris.hadisopiyan@gmail.com
- **Phone**: +62 821-9927-5053

#### 👨‍💻 Lead Developer
**Aris Hadisopiyan**
- **Role**: Lead Full-Stack Developer & Game Developer
- **Location**: Indonesia
- **Specialization**: Unity3D, React, Node.js, Laravel, Yii2
- **Experience**: Expert in JavaScript, React, Next.js, TypeScript

#### 🚀 Response Time
- **Email**: Within 24 hours
- **Phone**: Within 2 hours
- **Social**: Within 12 hours
- **GitHub Issues**: Within 48 hours

#### 💼 Services Available
- **Web Development**: Modern, responsive web applications
- **Mobile Apps**: Cross-platform mobile solutions
- **UI/UX Design**: Beautiful and intuitive interfaces
- **Performance**: Optimized for speed and efficiency
- **Consulting**: Technical guidance and project planning

### 🆘 Troubleshooting

#### Masalah Umum
1. **Data Hilang**: Cek local storage browser
2. **Import Error**: Pastikan format JSON valid
3. **Export Gagal**: Cek permission download browser
4. **Chart Error**: Refresh halaman jika chart tidak muncul

#### Browser Issues
- **Chrome**: Pastikan versi 60+
- **Firefox**: Pastikan versi 55+
- **Safari**: Pastikan versi 12+
- **Mobile**: Gunakan browser terbaru

#### Performance
- **Slow Loading**: Cek koneksi internet
- **Chart Lag**: Refresh halaman
- **Export Slow**: Tunggu proses selesai

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=omeans-team/todo-app&type=Date)](https://star-history.com/#omeans-team/todo-app&Date)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/omeans-team/todo-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/omeans-team/todo-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/omeans-team/todo-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/omeans-team/todo-app)
![GitHub license](https://img.shields.io/github/license/omeans-team/todo-app)

## 🙏 Acknowledgments

- **OMEANS Team** - Untuk dukungan dan pengembangan
- **Chart.js** - Library visualisasi data yang luar biasa
- **SheetJS** - Library export Excel yang powerful
- **GitHub** - Platform hosting yang reliable
- **Komunitas Open Source** - Untuk inspirasi dan kontribusi

---

## 🚀 Get Started

**Ready to boost your productivity?** 

[🌐 Try Live Demo](https://omeans-team.github.io/todo-app) | [📚 Read Tutorial](./about.md) | [🐛 Report Issue](https://github.com/omeans-team/todo-app/issues) | [💡 Request Feature](https://github.com/omeans-team/todo-app/discussions)

---

**Versi**: 1.0.0  
**Update Terakhir**: Desember 2024  
**Dikembangkan oleh**: [OMEANS Team](https://omeans-team.github.io)  
**Lead Developer**: [Aris Hadisopiyan](https://omeans-team.github.io)

*Todo List App - Mengorganisir tugas, meningkatkan produktivitas, mencapai tujuan! 🚀*

---

<div align="center">

**Made with ❤️ by [OMEANS Team](https://omeans-team.github.io)**

[![OMEANS Team](https://img.shields.io/badge/Visit-OMEANS%20Team-blue?style=for-the-badge&logo=github)](https://omeans-team.github.io)

</div>
