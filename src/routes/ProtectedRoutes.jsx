import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/pages/loading/Loading";
import NavBarContainer from "../components/layout/navbar/NavBarContainer";

const ProtectedRoutes = () => {
  const { accessToken, isLogged, user } = useSelector(
    (store) => store.authSlice
  );
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Comprueba si los datos de autenticación se han cargado
    if (accessToken && isLogged && user) {
      setIsInitializing(false);
    }
  }, [accessToken, isLogged, user]);

  if (isInitializing && user) {
    return <Loading />;
  }

 

  return (
    <>
      {isLogged && accessToken && user.rol === "admin" ? (
        <>
        <NavBarContainer />
        <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoutes;
