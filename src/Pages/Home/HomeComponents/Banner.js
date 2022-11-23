import React from "react";
import { Link } from "react-router-dom";
import bannerBg from "../../../Assets/bannerBG.webp";

const Banner = () => {
  return (
    <div
      className="min-h-screen px-3 relative detailsBanner z-10 flex justify-center items-center"
      style={{ backgroundImage: `url(${bannerBg})`, backgroundSize: "cover" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-7xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
          Next Genaration of NFT
        </h2>
        <p className="text-indigo-300 text-xl mt-4">
          Buy and Sell The feture products of the world
        </p>
        <div className="mt-5">
          <Link
            className="px-4 py-3 rounded bg-gradient-to-l from-blue-500 to-cyan-500 font-bold text-xl text-slate-900 mr-2"
            to={"/signup"}
          >
            Sign Up
          </Link>
          <Link
            className="px-4 py-3 rounded bg-gradient-to-l from-blue-500 to-cyan-500 font-bold text-xl text-slate-900 ml-2"
            to={"/login"}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
