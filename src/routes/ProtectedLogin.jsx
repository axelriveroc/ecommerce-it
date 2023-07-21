import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLogin = () => {
	const { accessToken, isLogged } = useSelector((store) => store.authSlice);

	return <>{!isLogged && !accessToken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedLogin;
