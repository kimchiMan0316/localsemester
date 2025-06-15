// PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostHeader } from "./postHeader";
import { PostViewer } from "../../components/form/postForm/postViewer";
import { CommentBox } from "../..//components/box/commentBox"
import { CommentForm } from "../../components/form/commentForm/commentForm";

export const PostDetail = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // 게시글 정보 가져오기
        fetch(`/post/${id}`)
            .then((res) => res.json())
            .then(setPosts);

        fetchComments(); // 댓글 가져오기
    }, [id]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/postComment?postId=${id}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error("댓글 가져오기 실패");
            }
        } catch (error) {
            console.error("댓글 가져오기 중 오류 발생:", error);
        }
    };
    if (!posts) return <p>로딩 중...</p>;

    return (
        <div className="space-y-4">
            <PostHeader post={posts} />
            <PostViewer item={posts} />
            <CommentBox comment={comments} url={"/postComment"} deleteComment={fetchComments} />
            <CommentForm articleId={id} url={"/postComment"} getComment={fetchComments} />
        </div>
    );
};