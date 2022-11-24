import React from "react";

const PageHeader = ({ intro, bgImg }) => {
  return (
    <div
      className="px-3 relative detailsBanner z-10 flex justify-center items-center h-96  my-6"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <h2 className="grText">{intro}</h2>
    </div>
  );
};

export default PageHeader;
