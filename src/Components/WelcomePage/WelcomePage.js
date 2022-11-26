import React, { useContext } from "react";
import { UserContext } from "../../Context/Auth/AuthContext";
import welcome from "../../Assets/welcome.png";

const WelcomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="h-full w-full grid place-items-center md:px-24">
      <div className="grid sm:grid-cols-2 gapx-3 items-center">
        <div className="">
          <h2 className="font-bold text-cyan-500 text-3xl">
            Hello {user?.displayName}
          </h2>
          <p className="text-xl text-slate-100">
            You can find your dashBoard menu in left side of your screen
          </p>
          <p className="text-xl text-slate-100">
            it's{" "}
            <span className="text-cyan-500">
              {new Date().toLocaleString().split(",")[0]}
            </span>
          </p>
        </div>
        <div>
          <img className="w-full" src={welcome} alt="" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
