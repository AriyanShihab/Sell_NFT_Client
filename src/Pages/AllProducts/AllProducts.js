import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import bgImg from "../../Assets/hero-shape-2.svg";
import BookingModal from "../../Components/BookingMoadal/BookingModal";
import AdvertisedCard from "../../Components/Cards/AdvertisedCards/AdvertisedCard";
import Loading from "../../Components/Loader/Loading";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { UserContext } from "../../Context/Auth/AuthContext";

const AllProducts = () => {
  const { currentProduct, setCurrentProduct } = useContext(UserContext);

  const { data: products = [], isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(` https://sel-nft.vercel.app/products`);
      const data = await res.json();
      return data;
    },
  });

  if (productLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <PageHeader intro={"WelCome To Products Page"} bgImg={bgImg}></PageHeader>

      <div className="max-w-6xl mx-auto py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-16">
          {products.length &&
            products.map((product) => (
              <AdvertisedCard
                key={product._id}
                product={product}
                setCurrentProduct={setCurrentProduct}
              ></AdvertisedCard>
            ))}
        </div>
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

export default AllProducts;
