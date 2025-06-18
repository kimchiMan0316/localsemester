import React from "react";
import FadeInSection from "./fadeInSection";
import "../member.css";

const SloganSection = ({ slogan }) => (
  <FadeInSection>
    <div className="bg-gradient-to-b from-white/0 transition-colors duration-500">
  <section className="py-16 px-4 flex items-center justify-center text-center min-h-[30vh]">
    <p className="text-xl md:text-3xl font-light max-w-3xl text-gray-800 dark:text-gray-300 leading-snug whitespace-pre-wrap speed-text">
      {slogan}
    </p>
  </section>
</div>

  </FadeInSection>
);

export default SloganSection;
