import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import "./GeneralStadisticsStyle.css";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import Face6Icon from "@mui/icons-material/Face6";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from "@mui/icons-material/Category";

const GeneralStadistics = ({ users, products }) => {
  const [categoriesCount, setCategoriesCount] = useState({}); // Objeto para mantener el recuento de categorías

  useEffect(() => {
    // Una vez que tengas los productos, realiza el procesamiento para obtener el recuento de categorías
    const updateCategoriesCount = () => {
      const categories = {};
      products?.forEach((product) => {
        if (product.category) {
          categories[product.category] =
            (categories[product.category] || 0) + 1;
        }
      });
      setCategoriesCount(categories);
    };

    updateCategoriesCount();
  }, [products]);

  console.log("categoriesCount: ", categoriesCount);

  return (
    <Box>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-around",
          gap: 3,
        }}
        className="dashboardContainer"
      >
        <Card className="cardContainer importantCard">
          <CardContent className="cardContent">
            <HeadphonesIcon className="cardIcon" />
            <Typography className="cardTitle">
              Total de Productos:{" "}
              <span className="spanloco">{products.length}</span>
            </Typography>
          </CardContent>
        </Card>
        <Card className="cardContainer importantCard">
          <CardContent className="cardContent">
            <Face6Icon className="cardIcon" />
            <Typography className="cardTitle">
              Total de Usuarios Registrados:{" "}
              <span className="spanloco">{users.length}</span>
            </Typography>
          </CardContent>
        </Card>
        <Card className="cardContainer importantCard">
          <CardContent className="cardContent">
            <PointOfSaleIcon className="cardIcon" />
            <Typography className="cardTitle">
              Total de ventas realizadasss: <span className="spanloco">25</span>
            </Typography>
          </CardContent>
        </Card>
        <Card className="cardContainer importantCard">
          <CardContent className="cardContent">
            <CategoryIcon className="cardIcon" />
            <Typography variant="body1" color="black" className="cardTitle">
              Número total de tipos de categorías:{" "}
              <span className="spanloco">
                {" "}
                {Object.keys(categoriesCount).length}
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Box>
   {/*    <ul>
        {Object.entries(categoriesCount).map(([category, count]) => (
          <li key={category}>
            {category}: {count}
          </li>
        ))}
      </ul> */}
    </Box>
  );
};

export default GeneralStadistics;
