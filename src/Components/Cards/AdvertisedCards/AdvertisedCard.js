import React from "react";

import { FaUserCheck } from "react-icons/fa";

const AdvertisedCard = ({ product, setCurrentProduct, setisModalClose }) => {
  const {
    name,
    img,
    sellingPrice,
    originalPrice,
    sellerName,
    description,
    conditionType,
    sellerverified,
  } = product;

  const converSellerVerified = "" + sellerverified;
  return (
    <div>
      <div className=" h-[670px] rounded border border-indigo-300 border-opacity-25 flex flex-col justify-between text-slate-200">
        <img className="w-full h-[260px] rounded-t" src={img} alt="" />
        <div className="p-3">
          <h3 className="text-xl my-2 font-bold text-cyan-500">{name}</h3>
          <div className="flex justify-start gap-2">
            <p className="text-green-500">Seller: {sellerName}</p>
            {converSellerVerified === "true" && (
              <FaUserCheck className="text-blue-500 text-xl"></FaUserCheck>
            )}
          </div>
          <p>{description ? description.substring(0, 120) : ""}</p>
          <div className="flex justify-between bg-slate-800 p-2 py-3 rounded mt-3">
            <p>selling Price: {sellingPrice}</p>
            <p>Original Price: {originalPrice}</p>
          </div>
          <div className="flex justify-between bg-slate-800 p-2 py-3 rounded mt-3">
            <p>Condition Type: {conditionType}</p>
          </div>

          <label
            onClick={() => setCurrentProduct(product)}
            htmlFor="bookingModal"
            className=" block text-center cursor-pointer mt-4 w-full px-4 py-3 rounded bg-gradient-to-l from-blue-500 to-cyan-500 font-bold text-xl text-slate-900 "
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedCard;
