export type Status = 'Published' | 'Drafts' | 'Trashed';

export type Post = {
 id: string;
 title: string;
 content: string;
 category: string;
 status: Status;
 date: string;
};

export const initialPosts: Post[] = [
 { id: '1', title: 'Belajar dasar HTML', category: 'Pemrograman', status: 'Published', date: '2023-10-21', content: 'HTML digunakan untuk menyusun struktur halaman web. Elemen yang sering dipakai antara lain heading, paragraf, tautan, dan gambar.\n\nDengan memahami struktur HTML, kita bisa membuat halaman yang lebih mudah dibaca dan dikembangkan.' },
 { id: '2', title: 'Mengatur tampilan dengan CSS', category: 'Pemrograman', status: 'Published', date: '2023-10-20', content: 'CSS digunakan untuk mengatur warna, ukuran teks, jarak, dan tata letak halaman.\n\nMedia query membantu menyesuaikan tampilan agar tetap nyaman digunakan pada layar ponsel maupun komputer.' },
 { id: '3', title: 'Mengenal useState', category: 'React', status: 'Published', date: '2023-10-19', content: 'useState menyimpan data yang dapat berubah di dalam komponen. Saat state berubah, React memperbarui tampilan sesuai nilai terbaru.\n\nContohnya adalah menyimpan nilai input atau tab yang sedang dipilih.' },
 { id: '4', title: 'Menyimpan data di browser', category: 'JavaScript', status: 'Published', date: '2023-10-18', content: 'localStorage dapat digunakan untuk menyimpan data sederhana di browser. Data tetap tersedia setelah halaman dimuat ulang.\n\nObjek perlu diubah menjadi string dengan JSON.stringify sebelum disimpan dan dibaca kembali menggunakan JSON.parse.' },
 { id: '5', title: 'Catatan belajar Next.js', category: 'Next.js', status: 'Drafts', date: '2023-10-17', content: 'Next.js menyediakan routing berdasarkan struktur folder. Catatan ini masih akan dilengkapi dengan contoh halaman dan navigasi.' },
 { id: '6', title: 'Contoh artikel lama', category: 'Umum', status: 'Trashed', date: '2023-10-16', content: 'Artikel ini sudah dipindahkan ke Trashed.' },
];
