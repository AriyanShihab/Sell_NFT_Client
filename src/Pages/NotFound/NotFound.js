import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../../Assets/fourOfour.jpg";

const NotFound = () => {
  return (
    <div
      className="min-h-screen grid place-items-center detailsBanner relative z-10"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl rounded-lg border border-cyan-500 border-opacity-25 min-h-[40vh] grid place-items-center px-12">
        <h2 className="grText">Opps! We Are Lost</h2>
        <Link className="myBtn" to={"/"}>
          Go To Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
