import { Link } from "react-router-dom"

const DashboardIndex = () => {
  return (
    <div>
        <p>Dashboard Index</p>
        <Link to={"/dashboard-products"}>Products Dashboard</Link>
        <Link to={"/dashboard-users"}>Users Dashboard</Link>

    </div>
  )
}

export default DashboardIndex