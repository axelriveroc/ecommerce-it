import CardUnique from "./CardUnique"
import { cardsTripleHome } from "../infoCards"


const CardUniqueContainer = () => {
  return (
    <>
        {
            cardsTripleHome.map( (product) => <CardUnique key={product.id} product={product} /> )
        }
    </>
    
  )
}

export default CardUniqueContainer