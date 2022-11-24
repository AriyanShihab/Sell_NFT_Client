import React from "react";
import { useLoaderData } from "react-router-dom";
import AdvertisedCard from "../../Components/Cards/AdvertisedCards/AdvertisedCard";
import PageHeader from "../../Components/PageHeader/PageHeader";

const Category = () => {
  const products = useLoaderData();
  const intro = products[0].category;
  const bgImg = products[0].img;

  return (
    <div className="min-h-screen">
      <PageHeader intro={intro} bgImg={bgImg}></PageHeader>

      <div className=" max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-16 mb-20">
        <div>
          <h2 className=" text-3xl font-bold text-cyan-500">
            Add filter if possible
          </h2>
        </div>
        {products.length &&
          products.map((product) => (
            <AdvertisedCard
              key={product._id}
              product={product}
            ></AdvertisedCard>
          ))}
      </div>
    </div>
  );
};

export default Category;
