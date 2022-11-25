import React from "react";
import { useQuery } from "@tanstack/react-query";

const AllSeller = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBuyer"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all-buyer`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h3 className="font-bold text-cyan-500 text-3xl mb-8">Hello Admin</h3>
      <table className="table table-zebra w-full mx-3 myTable">
        <thead>
          <tr>
            <th>Sl:</th>
            <th>Image</th>
            <th>Name</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, ind) => (
            <tr key={user._id}>
              <td>{ind + 1}</td>
              <td>
                <img className="w-12" src={user.photoURL} alt="" />
              </td>
              <td>
                <span>{user.name}</span>
              </td>
              <td>{user.email}</td>

              <td>
                <button
                  // onClick={() => handelDelte(product._id)}
                  className="btn btn-sm btn-warning"
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSeller;
