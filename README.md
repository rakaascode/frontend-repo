# Tes Frontend Sharing Vision 2026

Aplikasi pengelolaan artikel menggunakan Next.js, TypeScript, Axios, dan REST API Go/MySQL.

## Menjalankan lokal

Jalankan backend lokal pada port 8081, lalu:

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Mode development memakai backend `http://127.0.0.1:8081` secara default.

Untuk memakai backend VPS saat development:

```bash
cp .env.example .env.local
npm run dev
```

`.env.example` mengatur `NEXT_PUBLIC_API_BASE_URL=https://submission.metrolabs.site`.
Untuk kembali ke backend lokal, ubah `.env.local` menjadi:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8081
```

Browser mengakses backend langsung. Backend harus mengaktifkan CORS untuk origin frontend. Restart server development setelah mengubah environment. URL ini bersifat publik dan dimasukkan ke bundle saat build; lakukan build ulang jika URL production berubah.

## Fitur

- All Posts: tab Published, Drafts, dan Trashed dengan aksi edit dan trash.
- Add New: tambah artikel dengan judul, isi, dan kategori.
- Edit artikel: simpan sebagai Publish atau Draft.
- Preview: artikel Published dengan pagination, 3 artikel per halaman.

Artikel disimpan di database backend. Data contoh/localStorage lama tidak otomatis diunggah.
Status tampilan dipetakan ke API: Published → `publish`, Drafts → `draft`, Trashed → `thrash`. Trash memperbarui status, sehingga artikel tetap tersedia pada tab Trashed.

## Build dan production

```bash
npm run typecheck
npm run build
npm start
```

Production secara default memakai `https://submission.metrolabs.site`. `NEXT_PUBLIC_API_BASE_URL` dapat diatur untuk mengganti backend pada development maupun production. Jika `.env.local` masih berisi URL lokal, nilai tersebut juga digunakan saat production; ubah ke URL VPS sesuai kebutuhan.

Atur `NEXT_PUBLIC_API_BASE_URL` melalui environment penyedia hosting sebelum menjalankan build. Backend Go harus dideploy dengan konfigurasi CORS agar browser dapat mengakses API langsung.
