export const PostHeader = ({ post }) => (
    <div className="border-b pb-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">{post.username} · {new Date(post.createAt).toLocaleString()}</p>
    </div>
);
