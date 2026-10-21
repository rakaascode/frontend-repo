'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosts } from './dashboard';
import type { Status } from '@/lib/posts';
export function ArticleForm({ id }: { id?: string }) {
 const { posts, ready, error: loadError, save } = usePosts(); const router = useRouter(); const [title,setTitle] = useState(''); const [content,setContent] = useState(''); const [category,setCategory] = useState(''); const [error,setError] = useState(''); const [saving,setSaving] = useState(false); const titleRef = useRef<HTMLInputElement>(null); const contentRef = useRef<HTMLTextAreaElement>(null); const categoryRef = useRef<HTMLInputElement>(null); const initialized = useRef(false); const existing = posts.find(p => p.id === id);
 useEffect(() => {if (ready && !initialized.current) { if (existing) {setTitle(existing.title);setContent(existing.content);setCategory(existing.category);} initialized.current=true; titleRef.current?.focus();}}, [ready,existing]);
 async function submit(status: Status) {
  if (saving) return;
  if (Array.from(title.trim()).length < 20) {setError('Judul minimal 20 karakter.');titleRef.current?.focus();return;}
  if (Array.from(content.trim()).length < 20) {setError('Isi artikel minimal 20 karakter.');contentRef.current?.focus();return;}
  if (Array.from(category.trim()).length < 3) {setError('Kategori minimal 3 karakter.');categoryRef.current?.focus();return;}
  setError(''); setSaving(true);
  try {
   await save({id: existing?.id ?? '',title:title.trim(),content:content.trim(),category:category.trim(),status,date:existing?.date ?? ''});
   router.push('/');
  } catch (err) { setError(err instanceof Error ? err.message : 'Gagal menyimpan artikel.'); }
  finally { setSaving(false); }
 }
 if (!ready) return <div className="empty-state">Memuat artikel...</div>;
 if (loadError) return <p>Form belum tersedia karena artikel gagal dimuat.</p>;
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
     <button type="submit" className="primary" disabled={saving}>{saving ? 'Menyimpan...' : 'Publish'}</button>
     <button type="button" disabled={saving} onClick={() => submit('Drafts')}>Draft</button>
    </div>
   </form>
  </section>
 );
}
