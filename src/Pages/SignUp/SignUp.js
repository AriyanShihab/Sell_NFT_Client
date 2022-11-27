import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../Assets/bannerBG.webp";
import SmallSpinner from "../../Components/Loader/SmallSpinner";
import { UserContext } from "../../Context/Auth/AuthContext";

const SignUp = () => {
  const { createUser, updateUser, loginwithPopup } = useContext(UserContext);
  const [signupLoader, setSignUpLoader] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_KEY}`;

  const handelSignUp = (data) => {
    setSignUpLoader(true);
    createUser(data.email, data.password)
      .then((result) => {
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
              updateUser(userInfo)
                .then(() => {
                  const userForDb = {
                    name: data.name,
                    email: data.email,
                    photoURL: imgData.data.url,
                    role: data.signUpAs,
                    isVerified: false,
                  };
                  fetch(` https://sel-nft.vercel.app/users`, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(userForDb),
                  })
                    .then((res) => res.json())
                    .then((userData) => {
                      if (userData.acknowledged) {
                        getToken(userForDb.email);
                      }
                    })
                    .catch((err) => {
                      toast.error(err.message);
                      setSignUpLoader(false);
                    });

                  setSignUpLoader(false);
                })
                .catch((err) => {
                  toast.error(err.message);
                  setSignUpLoader(false);
                });
            }
          })
          .catch((err) => {
            toast.error(err.message);
            setSignUpLoader(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setSignUpLoader(false);
      });
  };

  const handelGoogleSignIn = () => {
    loginwithPopup()
      .then((result) => {
        const user = result.user;
        getToken(user?.email);
        const userForDB = {
          name: user?.displayName,
          email: user?.email,
          photoURL: user.photoURL,
          role: "buyer",
          isVerified: false,
        };
        console.log(userForDB);

        fetch(` https://sel-nft.vercel.app/googleUsers`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userForDB),
        })
          .then((res) => res.jsson())
          .then((data) => {
            if (data.message) {
              navigate("/");
            }
            if (data.acknowledged) {
              toast.success("login successfully");
              navigate("/");
            }
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getToken = (email) => {
    fetch(` https://sel-nft.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((tokenData) => {
        if (tokenData.accessToken) {
          localStorage.setItem("NFT_Token", tokenData.accessToken);
          toast.success("user created successfully");
          navigate("/");
          setSignUpLoader(false);
        }
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
              {...register("signUpAs")}
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
          <button
            className="  ml-0 myBtn w-full cursor-pointer text-center"
            type="submit"
          >
            {signupLoader ? <SmallSpinner></SmallSpinner> : "Sign Up"}
          </button>
        </div>
        <div>
          <button onClick={handelGoogleSignIn} className="  ml-0 myBtn w-full">
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
