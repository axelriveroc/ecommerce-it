import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

    let isAutenticate = false; 
  return (
    <div>
        {
            isAutenticate ?  <Outlet /> : <Navigate to="/login" />
        }
       
    </div>
  )
}

export default ProtectedRoutes