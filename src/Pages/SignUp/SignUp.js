import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import bg from "../../Assets/bannerBG.webp";
import { UserContext } from "../../Context/Auth/AuthContext";

const SignUp = () => {
  const { createUser, updateUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_KEY}`;

  const handelSignUp = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      const formData = new FormData();
      const profilePicture = data.profileImage[0];
      formData.append("image", profilePicture);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            const userInfo = {
              displayName: data.name,
              photoURL: imgData.data.url,
            };
            updateUser(userInfo).then(() => {
              console.log(" Updated User");
            });
          }
        });
    });
  };
  return (
    <div
      className="min-h-screen px-3 relative detailsBanner z-10 flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <form
        onSubmit={handleSubmit(handelSignUp)}
        className="w-96 bg-slate-800 bg-opacity-50 p-4 rounded border border-slate-200 border-opacity-20 grid gap-y-2 "
      >
        <h2 className="text-center py-3 text-2xl font-bold text-cyan-500">
          Sign Up
        </h2>
        <div>
          {errors.name && (
            <p className="text-sm text-red-300">{errors.name?.message}</p>
          )}
          <input
            className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
            type="text"
            {...register("name", { required: "Hello Sir, Name is Reuired" })}
            placeholder="Your Name"
          />
        </div>
        <div>
          {errors.email && (
            <p className="text-sm text-red-300">{errors.email?.message}</p>
          )}
          <input
            className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
            type="email"
            {...register("email", { required: "Hello Sir, Email is Reuired" })}
            placeholder="Your Email"
          />
        </div>
        <div>
          <p className="text-xs text-teal-100 mb-2">Upload Profle Picture</p>
          {errors.profileImage && (
            <p className="text-sm text-red-300">
              {errors.profileImage?.message}
            </p>
          )}
          <input
            className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
            type="file"
            {...register("profileImage", {
              required: "Hello Sir, Profile picture is Reuired",
            })}
            placeholder="Your Email"
          />
        </div>
        <div>
          {errors.password && (
            <p className="text-sm text-red-300">{errors.password?.message}</p>
          )}
          <input
            className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
            type="password"
            {...register("password", {
              required: "Hello Sir, Password is Reuired",
            })}
            placeholder="Your password"
          />
        </div>

        <div>
          <p className="text-sm text-slate-100">
            Signup as a (by deafult you will signup as buyer, if you want to
            sell your NFT, select seller from option bellow)
            <select
              {...register("signupAs")}
              className="p-3 rounded w-full text-slate-200 bg-slate-800 border border-slate-200 border-opacity-20"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-100">
            All ready Have an Account?{" "}
            <Link className="text-cyan-500" to={"/login"}>
              Login Here
            </Link>
          </p>
        </div>
        <div>
          <input
            className="  ml-0 myBtn w-full cursor-pointer"
            type="submit"
            value={"Sign Up"}
          />
        </div>
        <div>
          <button className="  ml-0 myBtn w-full">Sign Up with Google</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
