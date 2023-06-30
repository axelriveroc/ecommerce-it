import { useParams } from "react-router-dom"
import ProductDetail from "./ProductDetail"
import { useEffect, useState } from "react";
import { getProductByID } from "../../../services/productsServices";
import { useDispatch, /* useSelector */ } from "react-redux";
import { addToCart } from "../../../store/cartSlice";

const ProductDetailContainer = () => {

  const {id} = useParams();
  const [product, setProduct] = useState({})
  const dispatch = useDispatch();
/*   const { cart } = useSelector(store => store.cartSlice)
 */

  useEffect(()=>{
    (async() => {
      const data  = await getProductByID(id);
      setProduct(data)
    })()
    
    
  }, [id]);


// me tengo que traer el estado global de car
// averiguar cuanta cantidad tiene ese producto del carrito y en base a eso pasarle al counter la info
//acceder a la cantidad de ese producto en el carrito
// para desp en el counter permitirle sumar hasta: el stock menos la cantidad del carrito

  const onAdd = (cantidad)=>{
    let data = {
      ...product, 
      quantity: cantidad
    }

    dispatch( addToCart(data) )

  }

  return (
    <ProductDetail product={product} onAdd={onAdd} /* cart={cart} */ />
  )
}

export default ProductDetailContainer