import CardFeaturesProductContainer from "../../common/cardFeaturesProduct/CardFeaturesProductContainer"
import CardOneProductDetailContainer from "../../common/cardOneProductDetail/CardOneProductDetailContainer"
import GaleryOneProductContainer from "../../common/galeryOneProduct/GaleryOneProductContainer"

const ProductDetail = ({product, onAdd}) => {
  return (
    <div>
      <CardOneProductDetailContainer product={product} onAdd={onAdd} />
      <CardFeaturesProductContainer product={product} />
      <GaleryOneProductContainer product={product} />
    </div>
  );
}

export default ProductDetail