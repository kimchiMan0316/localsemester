// PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostHeader } from "./postHeader";
import { PostViewer } from "../../components/form/postForm/postViewer";
import { CommentBox } from "../..//components/box/commentBox"
import { CommentForm } from "../../components/form/commentForm/commentForm";

export const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComments] = useState([]);

    useEffect(() => {
        // 게시글 정보 가져오기
        fetch(`/post/${id}`)
            .then((res) => res.json())
            .then(setPost);

        // 댓글 정보 가져오기
        fetch(`/postComment?postId=${id}`)
            .then((res) => res.json())
            .then(setComments);
    }, [id]);

    if (!post) return <p>로딩 중...</p>;

    return (
        <div className="space-y-4">
            <PostHeader post={post} />
            <PostViewer item={post} />
            <CommentBox comment={comment} />
            <CommentForm articleId={id} getComments={(newComment) => setComments([...comment, newComment])} />
        </div>
    );
};