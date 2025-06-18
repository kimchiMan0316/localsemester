import React from "react";

const MemberNameList = ({ members, sectionRefs }) => (
  <section className="flex flex-col justify-center items-center py-24 px-4 duration-300">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
      👥 멤버 이름 보기
    </h2>
    <div className="flex flex-wrap justify-center gap-3">
      {members.map((member, index) => (
        <button
          key={member.id}
          onClick={() =>
            sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-brand dark:text-brand-dark border border-gray-900 dark:border-white 
                     hover:bg-gray-900 hover:text-brand-dark dark:hover:bg-white dark:hover:text-black 
                     px-5 py-2 rounded-full transition-all duration-300"
        >
          {member.username}
        </button>
      ))}
    </div>
  </section>
);

export default MemberNameList;
