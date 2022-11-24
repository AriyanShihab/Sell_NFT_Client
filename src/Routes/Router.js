import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/categories/:category",

        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.category}`),
        element: <Category></Category>,
      },
    ],
  },
]);

export default router;
