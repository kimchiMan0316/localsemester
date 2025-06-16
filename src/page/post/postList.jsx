import { useNavigate } from "react-router-dom";
import getPhoto from "util/getPhoto";
import { Container } from "../../components/container/container";
import { PostCard } from "./postCard"; // 게시글 카드 컴포넌트
import { useEffect, useState } from "react";


export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postCreate = () => navigate("/postCreate");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/post"); // proxy 설정이 있으므로 포트 생략 가능
        const data = await res.json();
        setPosts(data);
        console.log("📦 posts:", data);
        console.log(Array.isArray(posts), posts);
      } catch (err) {
        console.error("❌ fetch error:", err);
      } finally {
        setLoading(false);
        console.log(window.location.origin); // 현재 도메인 확인용
      }
    };

    fetchPosts();
  }, []);
  // posts가 배열인지 확인

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">게시판</h1>
        <button
          onClick={postCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          글쓰기
        </button>
      </div>

      {loading && <p>로딩 중입니다...</p>}
      {!loading && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.slice().reverse().map((post) => (
            <PostCard key={post.id} item={post} />
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </Container>
  );
};