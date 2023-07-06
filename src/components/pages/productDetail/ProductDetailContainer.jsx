import { useParams } from "react-router-dom"
import ProductDetail from "./ProductDetail"
import { useEffect, useState } from "react";
//import { getProductByID } from "../../../services/productsServices";
import { useDispatch, useSelector, /* useSelector */ } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { db } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

const ProductDetailContainer = () => {

  const {id} = useParams();
  const [product, setProduct] = useState({})
  const dispatch = useDispatch();
  const { cart } = useSelector(store => store.cartSlice);
  const productInCart = cart.find( p => p.id === +id); //para eritl contador, encontrar la Q en el caro de ese Product
  let quantityInCart = productInCart?.quantity //si el prod está en el carrito se lo paso, sino será undefined

  useEffect(()=>{
    (async() => {
      /* const data  = await getProductByID(id);
      setProduct(data) */
      let refCollection = collection(db, "products"); 
      let refDoc = doc(refCollection, id);
      let res = await getDoc(refDoc)
      console.log(res)
      setProduct({
        ...res.data() ,
        id: res.id 
      })
    })()
  }, [id]);

  const onAdd = (cantidad)=>{
    let data = {
      ...product, 
      quantity: cantidad
    }
    dispatch( addToCart(data) )
  }

  return (
    <ProductDetail
      product={product}
      onAdd={onAdd}
      quantityInCart={quantityInCart}
    />
  );
}

export default ProductDetailContainer