import Category from "./Category"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../../services/productsServices";


const CategoryContainer = () => {
  
  const { categoryName } = useParams();

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();
      const productsFiltered = data.filter(p => p.category === categoryName)
      setProductsList(productsFiltered);
      console.log(categoryName);
    })();
  }, [categoryName]);

  console.log(productsList)

  return <Category productsList={productsList} categoryName={categoryName} />;
}

export default CategoryContainer