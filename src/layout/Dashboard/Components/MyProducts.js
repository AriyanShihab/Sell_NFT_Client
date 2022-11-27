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
        ` https://sel-nft.vercel.app/my-products?email=${user?.email}`,
        {
          headers: {
            authtoken: `bearar ${localStorage.getItem("NFT_Token")}`,
          },
        }
      );

      const data = await res.json();
      return data;
    },
  });
  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handelAdvertised = (id) => {
    fetch(` https://sel-nft.vercel.app/makeAdvertised/${id}`, {
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

  const handelDelete = (id) => {
    fetch(` https://sel-nft.vercel.app/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        authtoken: `bearar ${localStorage.getItem("NFT_Token")}`,
      },
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
      <h2 className="text-cyan-500 text-4xl font-bold mb-5 ml-3">
        Products Length:{products.length}
      </h2>
      <div className="">
        <table className="table myTable table-zebra w-full">
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
                <td>{ind + 1}</td>
                <td>
                  <img className="w-8" src={product.img} alt="" />
                </td>
                <td>
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
                    onClick={() => handelDelete(product._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
                {!product.advertised && product.available && (
                  <td>
                    {
                      <button
                        onClick={() => handelAdvertised(product._id)}
                        className="btn btn-sm btn-success"
                      >
                        Advertise
                      </button>
                    }
                  </td>
                )}
                {product.advertised && product.available && (
                  <td>
                    <button className="btn btn-sm btn-warning">
                      Add running
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
