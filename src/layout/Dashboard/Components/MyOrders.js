import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loader/Loading";
import { UserContext } from "../../../Context/Auth/AuthContext";

const MyOrders = () => {
  const { user } = useContext(UserContext);
  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    quryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        ` https://sel-nft.vercel.app/my-orders/${user?.email}`,
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
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (myOrders?.length < 1) {
    return (
      <>
        <h2 className="text-xl text-cyan-500">
          Hello {user?.displayName}, currently you have no order, <br></br>{" "}
          please book something from the{" "}
          <Link className="text-green-500" to={"/"}>
            home page
          </Link>
        </h2>
      </>
    );
  }

  return (
    <div className=" mx-3">
      <h1 className="text-cyan-500 font-bold ml-3 mb-4 text-3xl">
        welcome {user?.displayName}
      </h1>
      <table className="table table-zebra w-full mx-3 myTable">
        <thead>
          <tr>
            <th>Sl:</th>
            <th>Image</th>
            <th>name</th>
            <th>price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((product, ind) => (
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
                <Link to={`/dashboard/payment/${product._id}`}>
                  <button
                    // onClick={() => handelDelte(product._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Pay
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
