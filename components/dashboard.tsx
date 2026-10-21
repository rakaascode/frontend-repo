'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { initialPosts } from '@/lib/posts';
import type { Post } from '@/lib/posts';
const PostsContext = createContext<{ posts: Post[]; ready: boolean; save: (post: Post) => void; trash: (id: string) => void } | null>(null);
export function usePosts() { const value = useContext(PostsContext); if (!value) throw new Error('Data artikel tidak tersedia'); return value; }
export function Dashboard({ children }: { children: ReactNode }) {
 const [posts, setPosts] = useState<Post[]>(initialPosts); const [ready, setReady] = useState(false); const [storageError, setStorageError] = useState(false); const pathname = usePathname();
 useEffect(() => { try { const data = localStorage.getItem('sharing-vision-posts'); if (data) { const parsed: unknown = JSON.parse(data); if (Array.isArray(parsed) && parsed.every(p => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.content === 'string' && typeof p.category === 'string' && typeof p.date === 'string' && ['Published','Drafts','Trashed'].includes(p.status))) setPosts(parsed); } } catch { setStorageError(true); } setReady(true); }, []);
 useEffect(() => { if (ready) { try { localStorage.setItem('sharing-vision-posts', JSON.stringify(posts)); } catch { setStorageError(true); } } }, [posts, ready]);
 const save = (post: Post) => setPosts(current => current.some(p => p.id === post.id) ? current.map(p => p.id === post.id ? post : p) : [post, ...current]);
 const trash = (id: string) => setPosts(current => current.map(p => p.id === id ? { ...p, status: 'Trashed' } : p));
 return (
  <PostsContext.Provider value={{ posts, ready, save, trash }}>
   <main className="container">
    <nav aria-label="Halaman">
     {[{ href: '/', label: 'All Posts' }, { href: '/add-new', label: 'Add New' }, { href: '/preview', label: 'Preview' }].map(({ href, label }) => (
      <Link key={href} href={href} aria-current={(href === '/' ? pathname === '/' || pathname.startsWith('/posts') : pathname === href) ? 'page' : undefined}>{label}</Link>
     ))}
    </nav>
    {storageError && <p role="status">Penyimpanan browser tidak tersedia. Perubahan hanya tersimpan selama sesi ini.</p>}
    {children}
   </main>
  </PostsContext.Provider>
 );
}
