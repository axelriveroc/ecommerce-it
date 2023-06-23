import CounterContainer from "../../common/counter/CounterContainer"

const ProductDetail = ({product, onAdd}) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <CounterContainer onAdd={onAdd} />
    </div>
  )
}

export default ProductDetail