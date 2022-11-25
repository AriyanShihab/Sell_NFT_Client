import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loader/Loading";

const ReportedProducts = () => {
  const {
    data: reportedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/getReported`);
      const data = await res.json();
      return data;
    },
  });
  const handelDelte = (id) => {
    fetch(`http://localhost:5000/deleteReportedProduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.info("Product Deleted");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h3 className="font-bold text-cyan-500 text-3xl mb-8">Hello Admin</h3>
      <table className="table table-zebra w-full mx-3 myTable">
        <thead>
          <tr>
            <th>Sl:</th>
            <th>Image</th>
            <th>name</th>
            <th>Seller</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reportedProducts.map((product, ind) => (
            <tr key={product._id}>
              <td>{ind + 1}</td>
              <td>
                <img className="w-8" src={product.img} alt="" />
              </td>
              <td>
                <span>{product.name.substr(0, 50)}</span>
              </td>
              <td>{product.sellerEmail}</td>

              <td>
                <button
                  onClick={() => handelDelte(product._id)}
                  className="btn btn-sm btn-warning"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedProducts;
