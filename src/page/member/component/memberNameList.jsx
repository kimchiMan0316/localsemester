import React from "react";

const MemberNameList = ({ members, sectionRefs }) => (
  <section className="flex flex-col justify-center items-center py-24 px-4 bg-white dark:bg-black text-center border-t border-neutral-300 dark:border-neutral-800">
    <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-6">
      멤버 이름 보기
    </h2>
    <div className="flex flex-wrap justify-center gap-3">
      {members.map((member, index) => (
        <button
          key={member.id}
          onClick={() =>
            sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
          }
          className="border text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-5 py-2 rounded-full transition-all"
        >
          {member.username}
        </button>
      ))}
    </div>
  </section>
);

export default MemberNameList;
