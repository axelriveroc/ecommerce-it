import { Route, Routes } from "react-router-dom";
import { menuRoutes } from "./routes";
import Layout from "../components/layout/layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardContainer from "../components/pages/dashboard/productsDashboard/DashboardContainer";
import UsersDashboardContainer from "../components/pages/dashboard/usersDashboard/UsersDashboardContainer";
import DashboardHomeContainer from "../components/pages/dashboard/dashboardHome/DashboardHomeContainer";
import DashboardIndex from "../components/pages/dashboard/dashboardIndex/DashboardIndex";

const AppRouter = () => {
  return (
    <Routes>
      <Route  element={<Layout />}>
        {menuRoutes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardHomeContainer />}>
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/dashboard-products" element={<DashboardContainer />} />
          <Route path="/dashboard-users" element={<UsersDashboardContainer />} />
        </Route>
      </Route>
      
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
