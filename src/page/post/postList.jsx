import { useNavigate } from "react-router-dom";
import { Container } from "../../components/container/container";
import { PostCard } from "./postCard";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const postCreate = () => navigate("/postCreate");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/post"); // proxy 설정이 있으므로 포트 생략 가능
        let data = await res.json();
        // 최신순 정렬 (createAt 기준 내림차순)
        data = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
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

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentPosts = posts.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-kakao">게시판</h1>
        <button
          onClick={postCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          글쓰기
        </button>
      </div>

      {loading ? (
        <p>로딩 중입니다...</p>
      ) : posts.length > 0 ? (
        <div className="space-y-4 pt-4 mb-6">
          {currentPosts.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </Container>
  );
};