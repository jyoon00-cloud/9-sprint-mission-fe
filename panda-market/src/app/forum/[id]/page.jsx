import { getArticlebyId, getComments } from "@/lib/api/article";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ui/articleDetail";

export default async function ForumDetail(props) {
  const params = await props.params;
  const { id } = params;
  let articleData;
  let commentsData;

  try {
    articleData = await getArticlebyId(id);
    commentsData = await getComments(id);
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    return notFound();
  }

  return (
    <ArticleDetail
      initialArticle={articleData}
      initialComments={commentsData.data || []}
    />
  );
}
