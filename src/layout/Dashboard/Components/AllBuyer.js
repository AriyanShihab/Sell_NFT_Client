import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loader/Loading";

const AllSeller = () => {
  const [deleteLoader, setDeleteLoader] = useState(false);

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
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handelDelete = (email) => {
    setDeleteLoader(true);
    fetch(`http://localhost:5000/delete-user/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.info("user Deleted");
          refetch();
          setDeleteLoader(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setDeleteLoader(false);
      });
  };

  const handelVerify = (email) => {
    fetch(`http://localhost:5000/verifyBuyer/${email}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("User Verifyed Successfully");
          refetch();
        }
      });
  };

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
            <th>Verificatio</th>
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
                  onClick={() => handelDelete(user.email)}
                  className="btn btn-sm btn-error"
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

export default AllSeller;