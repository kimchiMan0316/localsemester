import React from "react";
import "../member.css"

const IntroSection = () => (
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
);

export default IntroSection;
