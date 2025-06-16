import React from "react";

const MemberNameList = ({ members, sectionRefs }) => (
  <section className="flex flex-col justify-center items-center py-24 px-4 bg-black text-center border-t border-neutral-800">
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
      👥 멤버 이름 보기
    </h2>
    <div className="flex flex-wrap justify-center gap-3">
      {members.map((member, index) => (
        <button
          key={member.id}
          onClick={() =>
            sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-white border border-white hover:bg-white hover:text-black px-5 py-2 rounded-full transition-all"
        >
          {member.username}
        </button>
      ))}
    </div>
  </section>
);

export default MemberNameList;
