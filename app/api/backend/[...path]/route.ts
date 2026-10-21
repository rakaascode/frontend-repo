import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
 const { path } = await context.params;
 const route = path.join('/');
 if (!/^article(?:\/\d+(?:\/\d+)?)?$/.test(route)) {
  return NextResponse.json({ error: 'Endpoint tidak ditemukan.' }, { status: 404 });
 }
 const baseUrl = (process.env.API_BASE_URL || (process.env.NODE_ENV === 'production'
  ? 'https://submission.metrolabs.site' : 'http://127.0.0.1:8081')).replace(/\/+$/, '');
 try {
  const response = await axios.request<string>({
   url: `${baseUrl}/${route}${route === 'article' ? '/' : ''}`,
   method: request.method,
   headers: { 'Content-Type': 'application/json' },
   data: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text(),
   timeout: 15000, maxRedirects: 0, validateStatus: () => true,
   responseType: 'text', transformResponse: [],
  });
  return new NextResponse(response.data, {
   status: response.status, headers: { 'Content-Type': String(response.headers['content-type'] || 'application/json'), 'Cache-Control': 'no-store' },
  });
 } catch {
  return NextResponse.json({ error: 'Backend tidak dapat dihubungi. Periksa layanan backend dan API_BASE_URL.' }, { status: 502 });
 }
}
export { proxy as GET, proxy as POST, proxy as PUT, proxy as DELETE };
