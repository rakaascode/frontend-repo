'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { loadPosts, savePost } from '@/lib/posts';
import type { Post } from '@/lib/posts';
const PostsContext = createContext<{ posts: Post[]; ready: boolean; error: string; save: (post: Post) => Promise<void>; trash: (id: string) => Promise<void> } | null>(null);
export function usePosts() { const value = useContext(PostsContext); if (!value) throw new Error('Data artikel tidak tersedia'); return value; }
export function Dashboard({ children }: { children: ReactNode }) {
 const [posts, setPosts] = useState<Post[]>([]); const [ready, setReady] = useState(false); const [error, setError] = useState(''); const pathname = usePathname();
 useEffect(() => {
  let active = true;
  loadPosts().then(data => { if (active) setPosts(data); }).catch(err => { if (active) setError(err instanceof Error ? err.message : 'Gagal memuat artikel.'); }).finally(() => { if (active) setReady(true); });
  return () => { active = false; };
 }, []);
 const save = async (post: Post) => {
  const saved = await savePost(post, !post.id);
  setPosts(current => current.some(p => p.id === saved.id) ? current.map(p => p.id === saved.id ? saved : p) : [saved, ...current]);
 };
 const trash = async (id: string) => {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  setError('');
  try { await save({ ...post, status: 'Trashed' }); }
  catch (err) { setError(err instanceof Error ? err.message : 'Gagal memindahkan artikel.'); }
 };
 return (
  <PostsContext.Provider value={{ posts, ready, error, save, trash }}>
   <main className="container">
    <nav aria-label="Halaman">
     {[{ href: '/', label: 'All Posts' }, { href: '/add-new', label: 'Add New' }, { href: '/preview', label: 'Preview' }].map(({ href, label }) => (
      <Link key={href} href={href} aria-current={(href === '/' ? pathname === '/' || pathname.startsWith('/posts') : pathname === href) ? 'page' : undefined}>{label}</Link>
     ))}
    </nav>
    {error && <p className="error" role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Coba lagi</button></p>}
    {children}
   </main>
  </PostsContext.Provider>
 );
}
