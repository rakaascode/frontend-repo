'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosts } from './dashboard';
import type { Status } from '@/lib/posts';
export function ArticleForm({ id }: { id?: string }) {
 const { posts, ready, save } = usePosts(); const router = useRouter(); const [title,setTitle] = useState(''); const [content,setContent] = useState(''); const [category,setCategory] = useState(''); const [error,setError] = useState(''); const titleRef = useRef<HTMLInputElement>(null); const contentRef = useRef<HTMLTextAreaElement>(null); const categoryRef = useRef<HTMLInputElement>(null); const initialized = useRef(false); const existing = posts.find(p => p.id === id);
 useEffect(() => {if (ready && !initialized.current) { if (existing) {setTitle(existing.title);setContent(existing.content);setCategory(existing.category);} initialized.current=true; titleRef.current?.focus();}}, [ready,existing]);
 function submit(status: Status) { if (!title.trim()) {setError('Judul wajib diisi.');titleRef.current?.focus();return;} if (!content.trim()) {setError('Isi artikel wajib diisi.');contentRef.current?.focus();return;} if (!category.trim()) {setError('Kategori wajib diisi.');categoryRef.current?.focus();return;} save({id: existing?.id ?? crypto.randomUUID(),title:title.trim(),content:content.trim(),category:category.trim(),status,date:new Date().toISOString().slice(0,10)}); router.push('/'); }
 if (!ready) return <div className="empty-state">Memuat artikel...</div>;
 if (id && !existing) return <><h2>Artikel tidak ditemukan</h2><Link href="/">Kembali ke All Posts</Link></>;
 return (
  <section>
   <h2>{id ? 'Edit artikel' : 'Add New'}</h2>
   <form onSubmit={e => { e.preventDefault(); submit('Published'); }} noValidate>
    <label htmlFor="title">Judul</label>
    <input id="title" ref={titleRef} value={title} onChange={e => setTitle(e.target.value)} required />
    <label htmlFor="content">Isi artikel</label>
    <textarea id="content" ref={contentRef} value={content} onChange={e => setContent(e.target.value)} rows={10} required />
    <label htmlFor="category">Kategori</label>
    <input id="category" ref={categoryRef} value={category} onChange={e => setCategory(e.target.value)} required />
    {error && <p className="error" role="alert">{error}</p>}
    <div className="form-actions">
     <button type="submit" className="primary">Publish</button>
     <button type="button" onClick={() => submit('Drafts')}>Draft</button>
    </div>
   </form>
  </section>
 );
}
