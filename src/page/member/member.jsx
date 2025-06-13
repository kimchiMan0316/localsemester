import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import nullPhoto from "../../assets/기본이미지.png";
import "./member.css"

export const Member = () => {
  const members = useLoaderData();
  const sectionRefs = useRef([]);

  const slogans = [
    "우리는 함께 성장합니다.",
    "각자의 색깔이 모여 하나의 팀이 됩니다.",
    "열정은 우리의 공통 언어입니다.",
  ];

  return (
    <main className="overflow-y-scroll scroll-smooth bg-[#0A0A0A] text-white font-['SF Pro Display',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif]">
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl z-0" />
        <div className="z-10 text-center px-4">
          <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight neon-text">
            멤버 소개
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            함께한 팀원들의 열정과 비전을 만나보세요.
          </p>
        </div>
      </section>

    
      {members.map((member, index) => (
        <React.Fragment key={member.id}>
          <FadeInSection>
            <section
              ref={(el) => (sectionRefs.current[index] = el)}
              className="py-32 px-6 md:px-24 flex flex-col md:flex-row gap-16 items-center max-w-7xl mx-auto"
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
              <section className="min-h-[50vh] flex items-center justify-center text-center px-4 bg-[#0A0A0A]">
                <p className="text-2xl md:text-4xl font-semibold text-gray-200 max-w-3xl speed-text">
                  {slogans[index]}
                </p>
              </section>
            </FadeInSection>
          )}
        </React.Fragment>
      ))}

      {/* 멤버 네비게이션 */}
      <section className="flex flex-col justify-center items-center py-32 px-4 bg-[#0A0A0A] text-center border-t border-neutral-700">
        <h2 className="text-3xl font-bold mb-6 text-white">👥 멤버 이름 보기</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {members.map((member, index) => (
            <button
              key={member.id}
              onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
              className="text-white border border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-2 rounded-full text-lg"
            >
              {member.username}
            </button>
          ))}
        </div>
      </section>
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
      className={`transition-opacity transition-transform duration-[1500ms] ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const ProfileText = ({ username, article }) => (
  <div className="flex-1 max-w-xl text-center md:text-left">
    <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">{username}</h2>
    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{article}</p>
  </div>
);

const ProfileImage = ({ photo }) => (
  <div className="flex-1 flex justify-center">
    <img
      src={photo || nullPhoto}
      onError={(e) => (e.currentTarget.src = nullPhoto)}
      alt="프로필"
      className="w-72 md:w-96 h-auto object-cover shadow-xl rounded-lg transition-transform duration-700 hover:scale-105"
    />
  </div>
);
