import React from "react";
import { useLoaderData } from "react-router-dom";
const stripePromise = `${process.env.REACT_APP_STRIPE_KEY}`;

const Payment = () => {
  // const booking = useLoaderData();
  // console.log(booking);
  return (
    <div>
      <h3 className="text-3xl text-cyan-500 font-bold">Comming Soon</h3>
    </div>
  );
};

export default Payment;
