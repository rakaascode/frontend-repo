import axios from 'axios';
export type Status = 'Published' | 'Drafts' | 'Trashed';
export type Post = {
 id: string;
 title: string;
 content: string;
 category: string;
 status: Status;
 date: string;
};
type ApiPost = { id: number; title: string; content: string; category: string; status: string; created_date: string };
const statusToApi: Record<Status, string> = { Published: 'publish', Drafts: 'draft', Trashed: 'thrash' };
function fromApi(post: ApiPost): Post {
 const statuses: Record<string, Status> = { publish: 'Published', published: 'Published', draft: 'Drafts', drafts: 'Drafts', thrash: 'Trashed', trash: 'Trashed', trashed: 'Trashed' };
 const status = statuses[post.status.toLowerCase()];
 if (!status) throw new Error(`Status artikel tidak dikenali: ${post.status}`);
 return { id: String(post.id), title: post.title, content: post.content, category: post.category, status, date: post.created_date.slice(0, 10) };
}
const backendUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === 'production'
 ? 'https://submission.metrolabs.site' : 'http://127.0.0.1:8081')).replace(/\/+$/, '');
const api = axios.create({ baseURL: `${backendUrl}/article`, timeout: 20000 });
async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
 try {
  const response = await api.request<T>({ url: path || '/', method, data: body });
  return response.data;
 } catch (error) {
  if (axios.isAxiosError<{ error?: string }>(error)) {
   throw new Error(error.response?.data?.error || 'Permintaan ke backend gagal. Coba lagi.');
  }
  throw error;
 }
}
export async function loadPosts(): Promise<Post[]> {
 const posts: Post[] = [];
 const limit = 100;
 for (let offset = 0; ; offset += limit) {
  const batch = await request<ApiPost[]>(`/${limit}/${offset}`);
  posts.push(...batch.map(fromApi));
  if (batch.length < limit) return posts;
 }
}
export async function savePost(post: Post, create = false): Promise<Post> {
 const data = await request<{ data: ApiPost }>(create ? '' : `/${post.id}`, create ? 'POST' : 'PUT', {
  title: post.title, content: post.content, category: post.category, status: statusToApi[post.status],
 });
 return fromApi(data.data);
}
