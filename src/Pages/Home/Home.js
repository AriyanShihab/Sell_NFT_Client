import React from "react";
import Advertised from "./HomeComponents/Advertised";
import Banner from "./HomeComponents/Banner";
import Categories from "./HomeComponents/Categories";

const Home = () => {
  return (
    <div className="bg-slate-900">
      <Banner></Banner>
      <Advertised></Advertised>
      <Categories></Categories>
    </div>
  );
};

export default Home;
