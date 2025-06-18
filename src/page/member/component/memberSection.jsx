import React from "react";
import FadeInSection from "./fadeInSection";
import ProfileText from "./profileText";
import ProfileImage from "./profileImage";

const MemberSection = ({ member, index, sectionRef, onClick, slogan }) => {
  return (
    <FadeInSection>
      <section
        ref={sectionRef}
        className="py-20 px-4 md:px-16 flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto cursor-pointer transition-all duration-500"
        onClick={onClick}
        style={{
          borderBottom: "none",
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
  );
};

export default MemberSection;
