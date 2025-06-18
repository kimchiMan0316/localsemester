import React from "react";
import nullPhoto from "../../../assets/기본이미지.png";

const MemberModal = ({
  member,
  isEditing,
  setIsEditing,
  editMessage,
  setEditMessage,
  onClose,
  onSave,
  isAdmin,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-xl w-full shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={member.photo || nullPhoto}
          alt={member.username}
          className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
          onError={(e) => (e.currentTarget.src = nullPhoto)}
        />
        <h2 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          {member.username}
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
            {member.article}
          </p>
        )}
        {isAdmin &&
          (isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={onSave}
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
              className="w-full mt-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
            >
              수정하기
            </button>
          ))}
      </div>
    </div>
  );
};

export default MemberModal;
