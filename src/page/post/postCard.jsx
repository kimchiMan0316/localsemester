import { Link } from "react-router-dom";

export const PostCard = ({ item }) => {
  const { id, title, content, userId, createdAt } = item;

  console.log("🧾 PostCard item:", item); // 확인용 로그

  return (
    <Link to={`/post/${id}`} className="block p-4 border rounded hover:shadow transition">
      <div className="flex items-center">
        {/*  {thumbnail && (
          <img src={thumbnail} alt="썸네일" className="w-24 h-24 object-cover mr-4 rounded" />
        )} */}
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-sm text-gray-500 truncate">{content}</p>
          <p className="text-xs text-gray-400 mt-2">
            {userId?.username} · {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};