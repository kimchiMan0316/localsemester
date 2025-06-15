export const PostContent = ({ post }) => (
    <div className="prose max-w-full dark:prose-invert">
        {/* Tiptap JSON을 실제 콘텐츠로 렌더링할 로직이 필요하면 따로 처리 */}
        <p>{post.article}</p>
    </div>
);
export default PostContent;