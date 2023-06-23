import { useParams } from "react-router-dom"
import ProductDetail from "./ProductDetail"
import { useEffect, useState } from "react";
import { getProductByID } from "../../../services/productsServices";

const ProductDetailContainer = () => {

  const {id} = useParams();
  const [product, setProduct] = useState({})
  console.log(product)

  useEffect(()=>{
    (async() => {
      const data  = await getProductByID(id);
      setProduct(data)
      
    })()
  }, [id]);

  const onAdd = (cantidad)=>{
    let data = {
      ...product, 
      quantity: cantidad
    }

    console.log(data)
  }

  return (
    <ProductDetail product={product} onAdd={onAdd} />
  )
}

export default ProductDetailContainer