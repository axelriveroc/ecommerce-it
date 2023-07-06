import { Button } from "@mui/material"

const Dashboard = ({generarDocumentos}) => {
  return (
    <div>
      <h1>Dashborad</h1>
      <Button onClick={generarDocumentos}>Generar Docs</Button>

    </div>
  )
}

export default Dashboard