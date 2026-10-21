# Tes Frontend Sharing Vision 2023

Aplikasi pengelolaan artikel menggunakan Next.js dan TypeScript.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Fitur

- All Posts: tab Published, Drafts, dan Trashed dengan aksi edit dan trash.
- Add New: tambah artikel dengan judul, isi, dan kategori.
- Edit artikel: simpan sebagai Publish atau Draft.
- Preview: artikel Published dengan pagination, 3 artikel per halaman.

Data disimpan di localStorage browser.

## Build

```bash
npm run typecheck
npm run build
npm start
```
