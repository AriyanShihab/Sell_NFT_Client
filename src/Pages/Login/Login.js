import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../Assets/bannerBG.webp";
import SmallSpinner from "../../Components/Loader/SmallSpinner";
import { UserContext } from "../../Context/Auth/AuthContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [loginLoader, setLoginLoader] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handelLogin = (data) => {
    setLoginLoader(true);
    login(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user?.uid) {
          toast.success("Login successfully");
          setLoginLoader(false);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        setLoginLoader(false);
        toast.error(err.message);
      });
  };
  return (
    <div
      className="min-h-screen px-3 relative detailsBanner z-10 flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <form
        onSubmit={handleSubmit(handelLogin)}
        className="w-96 bg-slate-800 bg-opacity-50 p-4 rounded border border-slate-200 border-opacity-20 grid gap-y-2 "
      >
        <h2 className="text-center py-3 text-2xl font-bold text-cyan-500">
          Login
        </h2>

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
            New To NFT?{" "}
            <Link className="text-cyan-500" to={"/signup"}>
              Sign Up Here
            </Link>
          </p>
        </div>
        <div>
          <button
            className="  ml-0 myBtn w-full cursor-pointer text-center"
            type="submit"
          >
            {loginLoader ? <SmallSpinner></SmallSpinner> : "Login"}
          </button>
        </div>
        <div>
          <button className="  ml-0 myBtn w-full">Sign Up with Google</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
