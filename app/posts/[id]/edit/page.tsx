import { ArticleForm } from '@/components/article-form';
export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ArticleForm id={id}/>; }
