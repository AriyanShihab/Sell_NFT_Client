import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import BookingModal from "../../../Components/BookingMoadal/BookingModal";
import AdvertisedCard from "../../../Components/Cards/AdvertisedCards/AdvertisedCard";
import Loading from "../../../Components/Loader/Loading";
import { UserContext } from "../../../Context/Auth/AuthContext";

const Advertised = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/advertised`);
      const data = await res.json();
      return data;
    },
  });

  const { currentProduct, setCurrentProduct } = useContext(UserContext);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (products?.length) {
    return (
      <div className="bg-slate-900 text-indigo-300 pt-32">
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

        {currentProduct && (
          <BookingModal
            product={currentProduct}
            setCurrentProduct={setCurrentProduct}
          ></BookingModal>
        )}
      </div>
    );
  }
};
export default Advertised;
