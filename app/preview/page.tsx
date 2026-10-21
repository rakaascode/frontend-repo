'use client';

import { useState } from 'react';
import { usePosts } from '@/components/dashboard';

export default function Preview() {
 const { posts, ready } = usePosts();
 const [page, setPage] = useState(1);
 const published = posts.filter(post => post.status === 'Published');
 const totalPages = Math.max(1, Math.ceil(published.length / 3));
 const currentPage = Math.min(page, totalPages);
 const articles = published.slice((currentPage - 1) * 3, currentPage * 3);

 return (
  <section>
   <h2>Preview</h2>
   {!ready ? <p>Memuat artikel...</p> : <>
    {articles.length ? articles.map(post => (
     <article key={post.id}>
      <h3>{post.title}</h3>
      <p className="category">Kategori: {post.category}</p>
      <p className="article-content">{post.content}</p>
     </article>
    )) : <p>Belum ada artikel yang dipublikasikan.</p>}
    {published.length > 0 && <div className="pagination">
     <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Sebelumnya</button>
     <span>Halaman {currentPage} dari {totalPages}</span>
     <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Berikutnya</button>
    </div>}
   </>}
  </section>
 );
}
