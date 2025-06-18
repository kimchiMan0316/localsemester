import React from "react";

const ProfileText = ({ username, article }) => (
  <div className="flex-1 max-w-xl text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-medium mb-4 ">{username}</h2>
    <p className="text-base md:text-lg text-brand-sub leading-relaxed whitespace-pre-wrap">
      {article}
    </p>
  </div>
);

export default ProfileText;
