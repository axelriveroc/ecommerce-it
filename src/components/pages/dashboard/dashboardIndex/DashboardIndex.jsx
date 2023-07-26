import { Typography } from "@mui/material"
import { useSelector } from "react-redux"


const DashboardIndex = () => {
  const {user} = useSelector(store => store.authSlice)
  
  return (
    <div>
      <Typography variant="body1" color={"white"}>Dashboard Index </Typography>        
      <Typography variant="body1" color={"white"}>Bienvenido {user.displayName} </Typography>        

    </div>
  )
}

export default DashboardIndex