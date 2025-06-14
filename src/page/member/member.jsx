import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import nullPhoto from "../../assets/기본이미지.png";
import { useModal } from "../../hooks/useModal";
import { useMyProfile } from "../../store/myprofile";
import { useFetch } from "../../hooks/useFetch";
import "./member.css";

export const Member = () => {
  const loadedMembers = useLoaderData();
  const [members, setMembers] = useState(loadedMembers);
  const sectionRefs = useRef([]);
  const { isModal, openModal, closeModal } = useModal();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const { id: myId, state: myState } = useMyProfile((state) => state.myProfile);
  const { fetcher } = useFetch();

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setEditMessage(member.article || "");
    setIsEditing(false);
    openModal();
  };

  const handleEditSave = async () => {
    const success = await fetcher(
      {
        url: `http://localhost:5000/member/${selectedMember.id}`,
        method: "PATCH",
        body: { article: editMessage },
      },
      () => {
        setSelectedMember((prev) => ({ ...prev, article: editMessage }));
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.id === selectedMember.id ? { ...m, article: editMessage } : m
          )
        );
        setIsEditing(false);
      }
    );
    if (!success) alert("수정에 실패했습니다.");
  };

  const slogans = [
    "우리는 함께 성장합니다.",
    "각자의 색깔이 모여 하나의 팀이 됩니다.",
    "열정은 우리의 공통 언어입니다.",
  ];

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
  <div className="absolute inset-0 bg-black z-0" />
  <div className="z-10 text-center px-4 animate-fade-in">
    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 neon-text animate-title-fade">
      멤버 소개
    </h1>
    <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto">
      함께한 팀원들의 열정과 비전을 만나보세요.
    </p>
  </div>
</section>



      {members.map((member, index) => (
  <React.Fragment key={member.id}>
    <FadeInSection>
      <section
        ref={(el) => (sectionRefs.current[index] = el)}
        className="py-20 px-4 md:px-16 flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto cursor-pointer transition-all duration-500"
        onClick={() => handleCardClick(member)}
        style={{
          borderBottom: slogans[index] ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        {index % 2 === 0 ? (
          <>
            <ProfileImage photo={member.photo} />
            <ProfileText username={member.username} article={member.article} />
          </>
        ) : (
          <>
            <ProfileText username={member.username} article={member.article} />
            <ProfileImage photo={member.photo} />
          </>
        )}
      </section>
    </FadeInSection>

    {slogans[index] && (
      <FadeInSection>
        <div className="bg-gradient-to-b from-transparent via-gray-900 to-black">
          <section className="py-16 px-4 flex items-center justify-center text-center min-h-[30vh]">
            <p className="text-xl md:text-3xl font-light max-w-3xl text-gray-300 leading-snug whitespace-pre-wrap speed-text">
              {slogans[index]}
            </p>
          </section>
        </div>
      </FadeInSection>
    )}
  </React.Fragment>
))}


      <section className="flex flex-col justify-center items-center py-24 px-4 bg-black text-center border-t border-neutral-800">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          👥 멤버 이름 보기
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {members.map((member, index) => (
            <button
              key={member.id}
              onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
              className="text-white border border-white hover:bg-white hover:text-black px-5 py-2 rounded-full transition-all"
            >
              {member.username}
            </button>
          ))}
        </div>
      </section>

      {isModal && selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-sm w-full shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedMember.photo || nullPhoto}
              alt={selectedMember.username}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              onError={(e) => (e.currentTarget.src = nullPhoto)}
            />
            <h2 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              {selectedMember.username}
            </h2>
            {isEditing ? (
              <textarea
                className="w-full p-2 border rounded mb-3 bg-white text-black dark:bg-gray-700 dark:text-white resize-none"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                rows={4}
              />
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedMember.article}
              </p>
            )}
            {myId === selectedMember.id && myState === 777 && (
              isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    disabled={!editMessage.trim()}
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                   수정하기
                </button>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
};

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity transition-transform duration-[1200ms] ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const ProfileText = ({ username, article }) => (
  <div className="flex-1 max-w-xl text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white">
      {username}
    </h2>
    <p className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
      {article}
    </p>
  </div>
);

const ProfileImage = ({ photo }) => (
  <div className="flex-1 flex justify-center">
    <img
      src={photo || nullPhoto}
      onError={(e) => (e.currentTarget.src = nullPhoto)}
      alt="프로필"
      className="w-64 md:w-80 h-auto object-cover shadow-2xl rounded-xl transition-transform duration-700 hover:scale-105"
    />
  </div>
);