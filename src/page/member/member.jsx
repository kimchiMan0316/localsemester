import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useMyProfile } from "../../store/myprofile";
import { useFetch } from "../../hooks/useFetch";

import IntroSection from "./component/introSection";
import MemberSection from "./component/memberSection";
import SloganSection from "./component/sloganSection";
import MemberNameList from "./component/memberNameList";
import MemberModal from "./component/memberModal";

const slogans = [
  "한 방향을 향한, 수많은 관점.",
  "열정은 우리의 공통 언어입니다.",
  "함께 만드는 아름다움.",
  "우리는 기술이 아니라 경험을 만듭니다.",
];

const Member = () => {
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

  return (
    <main className=" font-sans overflow-x-hidden">
      <IntroSection />

      {members.map((member, index) => (
        <React.Fragment key={member.id}>
          <MemberSection
            member={member}
            index={index}
            sectionRef={(el) => (sectionRefs.current[index] = el)}
            onClick={() => handleCardClick(member)}
            slogan={slogans[index]}
          />
          {slogans[index] && <SloganSection slogan={slogans[index]} />}
        </React.Fragment>
      ))}

      <MemberNameList
        members={members}
        sectionRefs={sectionRefs}
      />

      {isModal && selectedMember && (
        <MemberModal
          member={selectedMember}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editMessage={editMessage}
          setEditMessage={setEditMessage}
          onClose={closeModal}
          onSave={handleEditSave}
          isAdmin={myId === selectedMember.id && myState === 777}
        />
      )}
    </main>
  );
};

export default Member;
