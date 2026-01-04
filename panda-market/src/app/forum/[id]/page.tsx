import { getArticleById, getComments } from "@/lib/api/article";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ui/articleDetail";
import { parse } from "next/dist/build/swc/generated-native";

interface ForumDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ForumDetail({ params }: ForumDetailProps) {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (!id) {
    return notFound();
  }

  let articleData;
  let commentsData;

  try {
    articleData = await getArticleById(articleId);
    commentsData = await getComments(articleId);
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    return notFound();
  }

  return (
    <ArticleDetail
      initialArticle={articleData}
      initialComments={commentsData || []}
    />
  );
}
