import CardOneProductDetail from "./CardOneProductDetail"

const CardOneProductDetailContainer = ({product, onAdd, quantityInCart}) => {
  return (
    <CardOneProductDetail
      product={product}
      onAdd={onAdd}
      quantityInCart={quantityInCart}
    />
  );
}

export default CardOneProductDetailContainer