'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { usePosts } from '@/components/dashboard';
import type { Status } from '@/lib/posts';

export default function AllPosts() {
 const { posts, ready, trash } = usePosts();
 const [tab, setTab] = useState<Status>('Published');
 const filtered = posts.filter(post => post.status === tab);

 return (
  <section>
   <h2>All Posts</h2>
   <div className="tabs" role="tablist" aria-label="Status artikel">
    {(['Published', 'Drafts', 'Trashed'] as Status[]).map(status => (
     <button key={status} role="tab" aria-selected={tab === status} onClick={() => setTab(status)}>{status}</button>
    ))}
   </div>
   <div className="table-scroll">
    <table>
     <thead><tr><th>Judul</th><th>Kategori</th><th>Aksi</th></tr></thead>
     <tbody>
      {!ready ? <tr><td colSpan={3}>Memuat artikel...</td></tr> : filtered.length ? filtered.map(post => (
       <tr key={post.id}>
        <td>{post.title}</td>
        <td>{post.category}</td>
        <td><div className="row-actions">
         <Link className="icon-button" href={`/posts/${post.id}/edit`} aria-label={`Edit ${post.title}`} title="Edit artikel"><Pencil size={17}/></Link>
         <button className="icon-button" disabled={post.status === 'Trashed'} onClick={() => trash(post.id)} aria-label={`Buang ${post.title}`} title={post.status === 'Trashed' ? 'Sudah di Trashed' : 'Pindahkan ke Trashed'}><Trash2 size={17}/></button>
        </div></td>
       </tr>
      )) : <tr><td colSpan={3}>Belum ada artikel.</td></tr>}
     </tbody>
    </table>
   </div>
  </section>
 );
}
