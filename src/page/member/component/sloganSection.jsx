import React from "react";
import FadeInSection from "./fadeInSection";
import "../member.css";

const SloganSection = ({ slogan }) => (
  <FadeInSection>
    <div className="bg-gradient-to-b from-transparent via-gray-200 to-white dark:via-gray-900 dark:to-black">
      <section className="py-16 px-4 flex items-center justify-center text-center min-h-[30vh]">
        <p className="text-xl md:text-3xl font-light max-w-3xl leading-snug whitespace-pre-wrap text-gray-700 dark:text-gray-300 speed-text">
          {slogan}
        </p>
      </section>
    </div>
  </FadeInSection>
);

export default SloganSection;
