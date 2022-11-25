import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loader/Loading";

const AllSeller = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allSeller"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all-seller`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handelVerify = (email) => {
    fetch(`http://localhost:5000/verifySeller/${email}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.products.acknowledged && data.verifyed.acknowledged) {
          toast.success("User Verifyed Successfully");
          refetch();
        }
      });
  };

  const handelDelete = (email) => {};

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
            <th>Verification</th>
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
                {user.isVerified ? (
                  <>
                    <button className="btn btn-sm bg-green-500 text-slate-900">
                      Verifyed
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handelVerify(user.email)}
                      className="btn btn-sm btn-warning"
                    >
                      Verify
                    </button>
                  </>
                )}
              </td>
              <td>
                <button
                  onClick={() => handelDelete(user.eamil)}
                  className="btn btn-error btn-sm"
                >
                  delete
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
