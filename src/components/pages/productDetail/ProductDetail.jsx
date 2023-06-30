import CardAlsoLikeContainer from "../../common/cardAlsoLike/CardAlsoLikeContainer";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";
import CardFeaturesProductContainer from "../../common/cardFeaturesProduct/CardFeaturesProductContainer"
import CardOneProductDetailContainer from "../../common/cardOneProductDetail/CardOneProductDetailContainer"
import CardTripleContainer from "../../common/cardTriple/CardTripleContainer";
import GaleryOneProductContainer from "../../common/galeryOneProduct/GaleryOneProductContainer"

const ProductDetail = ({product, onAdd,/*  cart */}) => {
  return (
    <div>
      <CardOneProductDetailContainer product={product} onAdd={onAdd} /* cart={cart} */ />
      <CardFeaturesProductContainer product={product} />
      <GaleryOneProductContainer product={product} />
      <CardAlsoLikeContainer />
      <CardTripleContainer />
      <CardBringingContainer />
    </div>
  );
}

export default ProductDetail