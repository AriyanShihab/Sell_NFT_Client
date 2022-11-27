import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import bgImg from "../Assets/hero-shape-2.svg";
import BookingModal from "../Components/BookingMoadal/BookingModal";
import AdvertisedCard from "../Components/Cards/AdvertisedCards/AdvertisedCard";
import Loading from "../Components/Loader/Loading";
import PageHeader from "../Components/PageHeader/PageHeader";
import { UserContext } from "../Context/Auth/AuthContext";

const AllAvd = () => {
  const [products, setProducts] = useState([]);
  const [ldng, setldng] = useState(false);
  useEffect(() => {
    setProducts(true);
    axios.get("http://localhost:5000/advertised").then((res) => {
      setProducts(res.data);
      setldng(false);
    });
  }, []);

  const { currentProduct, setCurrentProduct } = useContext(UserContext);

  return (
    <div>
      <PageHeader intro={"All advertised Products"} bgImg={bgImg}></PageHeader>

      {ldng ? (
        <Loading></Loading>
      ) : (
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-4xl md:text-5xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-500 text-center">
            Promoted NFT's
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-16">
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
      )}

      {currentProduct && (
        <BookingModal
          product={currentProduct}
          setCurrentProduct={setCurrentProduct}
        ></BookingModal>
      )}
    </div>
  );
};

export default AllAvd;
