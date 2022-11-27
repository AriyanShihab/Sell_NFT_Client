import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../../Assets/hero-shape-2.svg";
import BookingModal from "../../../Components/BookingMoadal/BookingModal";
import AdvertisedCard from "../../../Components/Cards/AdvertisedCards/AdvertisedCard";
import Loading from "../../../Components/Loader/Loading";
import { UserContext } from "../../../Context/Auth/AuthContext";

const Categories = () => {
  const { currentProduct, setCurrentProduct } = useContext(UserContext);
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(` https://sel-nft.vercel.app/only-categories`);
      const data = await res.json();
      return data;
    },
  });
  const { data: products = [], isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(` https://sel-nft.vercel.app/products/top`);
      const data = await res.json();
      return data;
    },
  });

  if (productLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div
        className="py-12  bg-slate-900 "
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      >
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-4xl font-bold text-cyan-500 mb-6 ml-2">
            Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-x-2">
            {categories.map((cat) => (
              <Link to={`categories/${cat}`} key={cat} className="">
                <div className="min-h-[200px] px-4 py-3 rounded bg-gradient-to-l from-blue-500 to-cyan-500 bg-opacity-25 font-bold text-xl text-slate-900 ml-2 grid place-items-center">
                  {cat}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-24">
        <h2 className="grText text-center my-5">Top Trendings Products</h2>
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
        <div className="text-center mt-8">
          <Link className="myBtn" to={"/products"}>
            Show All Products
          </Link>
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

export default Categories;
