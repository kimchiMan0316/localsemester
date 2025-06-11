import { CommentBox } from "components/box/commentBox";
import { Container } from "components/container/container";
import { CommentForm } from "components/form/commentForm/commentForm";
import { PostViewer } from "components/form/postForm/postViewer";
import { useEffect, useState } from "react";

export const LocalSemesterMain = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/post/2");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("댓글을 가져오는 중 오류 발생:", error);
      }
    };
    const fetchComment = async () => {
      try {
        const response = await fetch("/postComment?postId=2");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("댓글을 가져오는 중 오류 발생:", error);
      }
    };
    fetchComments();
    fetchComment();
  }, []);

  const getComment = (data) => {
    console.log(data);
    setComments((prev) => [data, ...prev]);
  };

  return (
    <>
      <Container>{post && <PostViewer item={post} me={true} />}</Container>

      <Container>
        <CommentForm
          articleId={post?.id}
          url={"/postComment"}
          getComment={getComment}
        />
        <CommentBox url={"/postComment"} comment={comments} />
      </Container>
    </>
  );
};
