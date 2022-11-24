import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loader/Loading";
import { UserContext } from "../../../Context/Auth/AuthContext";

const MyProducts = () => {
  const { user } = useContext(UserContext);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my-products?email=${user?.email}`
      );

      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handelAdd = (id) => {
    fetch(``);
  };

  /**
   * On the "My Products" page, display sales status (available or sold), price, and any other relevant information you want to show. A seller will be able to delete any of his/her product. Please note there will be a special button for each unsold/available product where the seller can hit the button to advertise.
    
   */
  console.log(products);

  console.log();
  return (
    <div>
      <h2 className="text-cyan-500 text-4xl">
        Products Length :{products.length}
      </h2>
      <div className="">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Sl:</th>
              <th>Image</th>
              <th>name</th>
              <th>price</th>
              <th>Action</th>
              <th>Advertised</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, ind) => (
              <tr key={product._id}>
                <th>{ind + 1}</th>
                <td>
                  <img className="w-8" src={product.img} alt="" />
                </td>
                <td>
                  <span className="max-w-[200px]">
                    {product.name.substr(0, 50)}
                  </span>
                </td>
                <td>{product.sellingPrice}</td>
                <td>
                  <button className="btn btn-sm btn-warning">Delete</button>
                </td>
                <td>
                  {product.advertised && (
                    <button
                      onClick={() => handelAdd(product._id)}
                      className="btn btn-sm btn-success"
                    >
                      Advertise
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
