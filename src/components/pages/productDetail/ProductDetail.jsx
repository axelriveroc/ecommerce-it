import CardAlsoLikeContainer from "../../common/cardAlsoLike/CardAlsoLikeContainer";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";
import CardFeaturesProductContainer from "../../common/cardFeaturesProduct/CardFeaturesProductContainer"
import CardOneProductDetailContainer from "../../common/cardOneProductDetail/CardOneProductDetailContainer"
import CardTripleContainer from "../../common/cardTriple/CardTripleContainer";
import GaleryOneProductContainer from "../../common/galeryOneProduct/GaleryOneProductContainer"
import ScrollToTopButton from "../../common/scrollToTop/ScrollToTop";

const ProductDetail = ({product, onAdd, quantityInCart  }) => {
  return (
    <div>
			<ScrollToTopButton />

      <CardOneProductDetailContainer
        product={product}
        onAdd={onAdd}
        quantityInCart={quantityInCart}
      />
      <CardFeaturesProductContainer product={product} />
      <GaleryOneProductContainer product={product} />
      <CardAlsoLikeContainer />
      <CardTripleContainer />
      <CardBringingContainer />
    </div>
  );
}

export default ProductDetail