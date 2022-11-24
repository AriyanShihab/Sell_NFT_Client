import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bg from "../../../Assets/bannerBG.webp";
import { UserContext } from "../../../Context/Auth/AuthContext";

const AddProducts = () => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/only-categories`);
      const data = await res.json();
      return data;
    },
  });
  const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_KEY}`;

  const handelAddProduct = (data) => {
    const formData = new FormData();
    const profilePicture = data.img[0];
    formData.append("image", profilePicture);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            name: data.name,
            img: imgData.data.url,
            sellingPrice: data.sellingPrice,
            originalPrice: data.originalPrice,
            category: data.category,
            location: data.location,
            timeOfOwnerShip: data.timeOfOwnerShip,
            sellerName: user?.displayName ? user?.displayName : "Mr.Example",
            sellerEmail: user?.email,
            reported: false,
            available: true,
            advertised: false,
            postTime: new Date().getTime(),
            conatctNumber: data.conatctNumber,
            conditionType: data.conditionType,
            description: data.description,
            sellerverified: false,
          };

          fetch(`http://localhost:5000/add-products`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Product Added");
                navigate("/dashboard");
              }
            });
        }
      });
  };

  return (
    <div
      className="min-h-screen px-3 relative detailsBanner z-10 flex justify-center items-center w-full"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <form
        onSubmit={handleSubmit(handelAddProduct)}
        className=" bg-slate-800 bg-opacity-50 p-4 rounded border border-slate-200 border-opacity-20 "
      >
        <h2 className="text-center py-3 text-2xl font-bold text-cyan-500">
          Add Product
        </h2>

        <div>
          {/* product name and image */}
          <div className="grid md:grid-cols-2 gap-x-2 my-3">
            <div>
              <p className="text-xs text-teal-100 mb-2">Product Name</p>
              {errors.name && (
                <p className="text-sm text-red-300">{errors.name?.message}</p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="text"
                {...register("name", {
                  required: "Hello Sir, Name is Reuired",
                })}
                placeholder="product Name"
              />
            </div>

            <div>
              <p className="text-xs text-teal-100 mb-2">
                Upload Product Picture
              </p>
              {errors.img && (
                <p className="text-sm text-red-300">{errors.img?.message}</p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="file"
                {...register("img", {
                  required: "Hello Sir, product picture is Reuired",
                })}
                placeholder="Your location"
              />
            </div>
          </div>
          {/* product prices */}
          <div className="grid md:grid-cols-2 gap-x-2 my-3">
            <div>
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="number"
                {...register("originalPrice", {
                  required: "Hello Sir, originalPrice is Reuired",
                })}
                placeholder="Product Original Price"
              />
            </div>
            <div>
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="number"
                {...register("sellingPrice", {
                  required: "Hello Sir, sellingPrice is Reuired",
                })}
                placeholder="Product Original Price"
              />
            </div>
          </div>
          {/* product category and location */}
          <div className="grid md:grid-cols-2 gap-x-2 my-3">
            <div>
              <p className="text-sm text-slate-200 mb-1">Add Your Location</p>
              {errors.location && (
                <p className="text-sm text-red-300">
                  {errors.location?.message}
                </p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="location"
                {...register("location", {
                  required: "Hello Sir, location is Reuired",
                })}
                placeholder="Your location"
              />
            </div>

            <div>
              <p className="text-sm text-slate-200 mb-1">
                select product category
              </p>
              <select
                {...register("category")}
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-2 my-3">
            <div>
              {errors.timeOfOwnerShip && (
                <p className="text-sm text-red-300">
                  {errors.timeOfOwnerShip?.message}
                </p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="timeOfOwnerShip"
                {...register("timeOfOwnerShip", {
                  required: "Hello Sir, timeOfOwnerShip is Reuired",
                })}
                placeholder="Your timeOfOwnerShip"
              />
            </div>
            <div>
              {errors.description && (
                <p className="text-sm text-red-300">
                  {errors.description?.message}
                </p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="description"
                {...register("description", {
                  required: "Hello Sir, description is Reuired",
                })}
                placeholder="Your description"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-2 my-3">
            <div>
              {errors.conditionType && (
                <p className="text-sm text-red-300">
                  {errors.conditionType?.message}
                </p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="text"
                {...register("conditionType", {
                  required: "Hello Sir, conditionType is Reuired",
                })}
                placeholder="Your conditionType"
              />
            </div>
            <div>
              {errors.contactNumber && (
                <p className="text-sm text-red-300">
                  {errors.contactNumber?.message}
                </p>
              )}
              <input
                className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
                type="number"
                {...register("contactNumber", {
                  required: "Hello Sir, contactNumber is Reuired",
                })}
                placeholder="Your contactNumber"
              />
            </div>
          </div>

          <div>
            <button
              className="  ml-0 myBtn w-full cursor-pointer text-center"
              type="submit"
            >
              Add Product
              {/* {signupLoader ? <SmallSpinner></SmallSpinner> : "Sign Up"} */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
