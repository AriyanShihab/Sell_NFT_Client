import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Components/WelcomePage/WelcomePage";
import AddProducts from "../layout/Dashboard/Components/AddProducts";
import AllBuyer from "../layout/Dashboard/Components/AllBuyer";
import AllSeller from "../layout/Dashboard/Components/AllSeller";
import MyOrders from "../layout/Dashboard/Components/MyOrders";
import MyProducts from "../layout/Dashboard/Components/MyProducts";
import Payment from "../layout/Dashboard/Components/Payment";
import ReportedProducts from "../layout/Dashboard/Components/ReportedProducts";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";
import Main from "../layout/Main";
import AllAvd from "../Pages/AllAvd";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blog from "../Pages/Blog/Bolg";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/all-adv",
        element: <AllAvd></AllAvd>,
      },
      {
        path: "/categories/:category",

        loader: ({ params }) =>
          fetch(` https://sel-nft.vercel.app/categories/${params.category}`),
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <NotFound></NotFound>,
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
        element: <WelcomePage></WelcomePage>,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`https://sel-nft.vercel.app/booking/${params.id}`),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <SellerRoute>
            <AddProducts></AddProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/reported-product",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-seller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
    ],
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
