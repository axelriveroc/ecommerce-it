import Category from "./Category"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
/* import { getAllProducts } from "../../../services/productsServices";
 */
import { db } from "../../../firebaseConfig";
import { collection , getDocs, query, where } from "firebase/firestore"


const CategoryContainer = () => {
  
  const { categoryName } = useParams();

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    (async () => {
    /*   const data = await getAllProducts();
      const productsFiltered = data.filter(p => p.category === categoryName)
      setProductsList(productsFiltered);
      console.log(categoryName); */
      let refCollection = collection(db, "products"); 
      let consultaFiltrada = query(refCollection, where("category", "==", categoryName))

      let res = await getDocs(consultaFiltrada);

      let productosFinales = res.docs.map((p)=> {
        return {
          ...p.data(),
          id: p.id
        }
      } );
      setProductsList(productosFinales);
      //let obj = {...res.docs[0].data() , id: res.docs[0].id}
    })();
  }, [categoryName]);

  console.log(productsList)

  return <Category productsList={productsList} categoryName={categoryName} />;
}

export default CategoryContainer