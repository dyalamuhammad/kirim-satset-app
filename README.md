# 🚀 Kirim Satset

> **Kirim file dengan cepat, aman, dan tanpa ribet.**

Kirim Satset adalah aplikasi berbasis **Next.js** yang memungkinkan pengguna mengunggah dan membagikan file melalui tautan unik. Dibangun dengan teknologi modern seperti **Supabase**, **React 19**, dan **Tailwind CSS v4**, aplikasi ini menawarkan pengalaman berbagi file yang cepat, responsif, dan mudah digunakan.

## 🌐 Live Demo

**Website:** https://kirim-satset-app.vercel.app

---

## ✨ Fitur

- 📤 Upload file dengan drag & drop
- 🔗 Generate link berbagi secara otomatis
- ☁️ Penyimpanan file menggunakan Supabase
- ⚡ Performa tinggi dengan Next.js 16
- 📱 Responsive untuk desktop maupun mobile
- 🌙 Dukungan Dark Mode
- 🎨 UI modern menggunakan shadcn/ui
- 🔔 Notifikasi interaktif menggunakan Sonner
- ✨ Animasi halus dengan Framer Motion
- ✅ Validasi data menggunakan Zod
- Genenete QR dan share untuk akses link via scan
- Aktivasi Password untuk akses link

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Radix UI
- Framer Motion
- Lucide React

### Backend & Database

- Supabase
- NanoID

### Utilities

- React Dropzone
- Zod
- clsx
- class-variance-authority
- tailwind-merge
- next-themes
- QR Code
- ByCrypt

---

## 📂 Struktur Project

```text
kirimsatset/
│
├── app/
├── components/
├── lib/
├── hooks/
├── public/
├── styles/
├── types/
├── utils/
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

> Struktur dapat berbeda sesuai perkembangan proyek.

---

## 🚀 Instalasi

Clone repository

```bash
git clone https://github.com/USERNAME/kirimsatset.git
```

Masuk ke folder project

```bash
cd kirimsatset
```

Install dependency

```bash
npm install
```

Jalankan development server

```bash
npm run dev
```

Buka browser

```
http://localhost:3000
```

---

## 📦 Build Production

```bash
npm run build
```

Menjalankan hasil build

```bash
npm start
```

---

## 🔧 Environment Variables

Buat file `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Sesuaikan dengan project Supabase Anda.

---

## 📸 Screenshot

Tambahkan screenshot aplikasi pada folder berikut:

```text
<img width="1012" height="723" alt="Screenshot 2026-07-04 191831" src="https://github.com/user-attachments/assets/e03480c3-0a68-4250-9864-9a972a74f916" />
<img width="800" height="549" alt="Screenshot 2026-07-04 201735" src="https://github.com/user-attachments/assets/ee8ee362-0d70-4e92-a950-773823189fd2" />
```

Lalu tampilkan di README:

```markdown
![Home](public/screenshots/home.png)
```

---

## 📋 Scripts

| Command | Deskripsi |
|----------|-----------|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build aplikasi production |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | Menjalankan ESLint |

---

## 🚀 Deployment

Project ini dapat di-deploy menggunakan:

- Vercel ⭐ (Direkomendasikan)
- Netlify
- Docker
- VPS

---

## 🔮 Roadmap

- [ ] Authentication
- [ ] Password Protected Link
- [ ] Expired Link
- [ ] Download Counter
- [ ] File Preview
- [ ] Folder Sharing
- [ ] Dashboard User
- [ ] Admin Panel
- [ ] Email Notification
- [ ] Multi File Upload

---

## 🤝 Contributing

Kontribusi selalu diterima.

1. Fork repository
2. Buat branch baru

```bash
git checkout -b feature/nama-fitur
```

3. Commit perubahan

```bash
git commit -m "Menambahkan fitur baru"
```

4. Push

```bash
git push origin feature/nama-fitur
```

5. Buat Pull Request

---

## 📄 License

Project ini menggunakan lisensi **MIT**.

---

## 👨‍💻 Author

**Kirim Satset**

Dibuat menggunakan ❤️ dengan:

- Next.js
- React
- Supabase
- Tailwind CSS
- shadcn/ui

---

## ⭐ Dukungan

Jika project ini bermanfaat, jangan lupa memberikan ⭐ pada repository GitHub agar dapat membantu pengembangan proyek ini.

Happy Coding! 🚀
