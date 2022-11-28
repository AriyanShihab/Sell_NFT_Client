import React from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
  const booking = useLoaderData();

  return (
    <div>
      <h3 className="text-3xl text-cyan-500 font-bold">
        Comming Soon, Check Out Form For{" "}
        {<span className="text-green-500">{booking?.name}</span>}
      </h3>

      <div></div>
    </div>
  );
};

export default Payment;
