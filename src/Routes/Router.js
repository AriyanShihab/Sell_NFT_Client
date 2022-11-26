import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../layout/Dashboard/Components/AddProducts";
import AllBuyer from "../layout/Dashboard/Components/AllBuyer";
import AllSeller from "../layout/Dashboard/Components/AllSeller";
import MyOrders from "../layout/Dashboard/Components/MyOrders";
import ReportedProducts from "../layout/Dashboard/Components/ReportedProducts";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";
import Main from "../layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <p className="">Welcome To dashbord</p>,
      },
      {
        path: "dashboard/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "dashboard/add-product",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "dashboard/reported-product",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "dashboard/all-seller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "dashboard/all-buyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
