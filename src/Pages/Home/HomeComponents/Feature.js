import React from "react";
import bgImg from "../../../Assets/ext.jpg";
import ft1 from "../../../Assets/feature-icon-1.png";
import ft2 from "../../../Assets/feature-icon-2.png";
import ft3 from "../../../Assets/feature-icon-3.png";

const Feature = () => {
  return (
    <div
      className="px-3 relative detailsBanner z-10 flex justify-center items-center min-h-[450px]  mb-6"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <div className="myCard py-4 px-8 bg-slate-900 bg-opacity-25 backdrop-blur-lg rounded border border-cyan-500 border-opacity-20 text-center">
          <img className="mx-auto" src={ft1} alt="" />
          <h2 className="font-bold text-cyan-500 text-xl mt-4">
            Tech Enabaled
          </h2>
          <p className="text-slate-200  leading-7">
            Get World Class support for your any kind of query
          </p>
        </div>
        <div className="myCard py-4 px-8 bg-slate-900 bg-opacity-25 backdrop-blur-lg rounded border border-cyan-500 border-opacity-20 text-center">
          <img className="mx-auto mt-8" src={ft3} alt="" />
          <h2 className="font-bold text-cyan-500 text-xl mt-4">
            Thousand Of Products
          </h2>
          <p className="text-slate-200  leading-7">
            you can get almoast any kind of product
          </p>
        </div>
        <div className="myCard py-4 px-8 bg-slate-900 bg-opacity-25 backdrop-blur-lg rounded border border-cyan-500 border-opacity-20 text-center">
          <img className="mx-auto" src={ft2} alt="" />
          <h2 className="font-bold text-cyan-500 text-xl mt-4">
            Better Security
          </h2>
          <p className="text-slate-200  leading-7">
            Get World Class Security for your every Trancjaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
