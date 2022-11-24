import { createBrowserRouter } from "react-router-dom";
import MyProducts from "../layout/Dashboard/Components/MyProducts";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";
import Main from "../layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
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
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/categories/:category",

        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.category}`),
        element: <Category></Category>,
      },
      {
        element: <DashboardLayout></DashboardLayout>,
        path: "/dashboard",
      },
    ],
  },
  {
    path: "/dashboard/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/my-products",
        element: <MyProducts></MyProducts>,
      },
    ],
  },
]);

export default router;
