import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bannerBg from "../../../Assets/bannerBG.webp";
import { UserContext } from "../../../Context/Auth/AuthContext";

const Banner = () => {
  const { user } = useContext(UserContext);
  return (
    <div
      className="min-h-screen px-3 relative detailsBanner z-10 flex justify-center items-center"
      style={{ backgroundImage: `url(${bannerBg})`, backgroundSize: "cover" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="grText">Next Genaration of NFT</h2>
        <p className="text-indigo-300 text-xl mt-4">
          Buy and Sell The feture products of the world
        </p>
        <div className="mt-5">
          {user?.email ? (
            <>
              <Link className="myBtn mr-2" to={"/dashboard"}>
                Visit DashBard
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
