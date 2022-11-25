import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loader/Loading";
import { UserContext } from "../../../Context/Auth/AuthContext";

const MyProducts = () => {
  const { user, loading } = useContext(UserContext);
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
  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handelAdvertised = (id) => {
    fetch(`http://localhost:5000/makeAdvertised/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Advertised Successfull");
          refetch();
        }
      });
  };

  const handelDelte = (id) => {
    fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.info("Product Deleted Successfull");
          refetch();
        }
      });
  };

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
              <th className="hidden lg:block">name</th>
              <th>price</th>
              <th>Availaibility</th>
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
                <td className="hidden lg:block">
                  <span>{product.name.substr(0, 50)}</span>
                </td>
                <td>{product.sellingPrice}</td>
                <td>
                  {product.available ? (
                    <button className="btn btn-sm btn-success">
                      Available
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-warning">Sold</button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handelDelte(product._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {!product.advertised && product.available && (
                    <button
                      onClick={() => handelAdvertised(product._id)}
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
