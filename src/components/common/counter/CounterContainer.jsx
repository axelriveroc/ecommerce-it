import { useState } from "react"
import Counter from "./Counter"

const CounterContainer = ({onAdd, product, quantityInCart=1 }) => {

    const [counter, setCounter] = useState(quantityInCart)
    
  return (
    <Counter
      onAdd={onAdd}
      counter={counter}
      setCounter={setCounter}
      product={product}
    />
  );
}

export default CounterContainer