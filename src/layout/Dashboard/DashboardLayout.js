import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navber from "../../Components/Header/Navber";
import Loading from "../../Components/Loader/Loading";
import { UserContext } from "../../Context/Auth/AuthContext";
import useRole from "../../Hooks/useRole";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const [userRole, roleLoading] = useRole(user?.email);

  if (roleLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Navber></Navber>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-slate-800 shadow-xl">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-cyan-500 dashboard-menu">
            {userRole === "seller" && (
              <>
                <li className="bg-transparent">
                  <NavLink
                    end
                    to="/dashboard/add-product"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    Add A Product
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    to={"/dashboard/my-products"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    My Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to={"/dashboard/my-orders"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
            {userRole === "buyer" && (
              <>
                <li>
                  <NavLink
                    end
                    to={"/dashboard/my-orders"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    My Orders
                  </NavLink>
                </li>
              </>
            )}

            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    end
                    to={"/dashboard/reported-product"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    Reported prodcut
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to={"/dashboard/all-seller"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    All Seller
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to={"/dashboard/all-buyer"}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#06b6d4" : "#efefef",
                      };
                    }}
                  >
                    All Buyer
                  </NavLink>
                </li>
              </>
            )}

            {
              <li className="absolute bottom-20">
                {user.displayName} sign in as {userRole}
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
