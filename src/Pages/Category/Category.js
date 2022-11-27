import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import bgImg from "../../Assets/hero-shape-2.svg";
import BookingModal from "../../Components/BookingMoadal/BookingModal";
import AdvertisedCard from "../../Components/Cards/AdvertisedCards/AdvertisedCard";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { UserContext } from "../../Context/Auth/AuthContext";

const Category = () => {
  const products = useLoaderData();
  const intro = products[0].category;

  const { currentProduct, setCurrentProduct } = useContext(UserContext);

  return (
    <div className="min-h-screen">
      <PageHeader intro={intro} bgImg={bgImg}></PageHeader>

      <div className=" max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-16 mb-20">
        {products.length &&
          products.map((product) => (
            <AdvertisedCard
              key={product._id}
              product={product}
              setCurrentProduct={setCurrentProduct}
            ></AdvertisedCard>
          ))}
      </div>

      {currentProduct && (
        <BookingModal
          product={currentProduct}
          setCurrentProduct={setCurrentProduct}
        ></BookingModal>
      )}
    </div>
  );
};

export default Category;
