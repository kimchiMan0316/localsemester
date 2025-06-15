export const CommentList = ({ comments }) => (
    <div className="space-y-2">
        <h2 className="text-lg font-semibold">댓글</h2>
        {comments.map((c) => (
            <div key={c.id} className="border rounded p-2">
                <p className="text-sm font-medium">{c.username}</p>
                <p className="text-sm text-gray-700">{c.content}</p>
            </div>
        ))}
    </div>
);