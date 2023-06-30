import CardOneProductDetail from "./CardOneProductDetail"

const CardOneProductDetailContainer = ({product, onAdd, /* cart */}) => {
  return (
    <CardOneProductDetail product={product} onAdd={onAdd} /* cart={cart} */ />
  )
}

export default CardOneProductDetailContainer