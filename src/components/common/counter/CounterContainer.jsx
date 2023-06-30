import { useState } from "react"
import Counter from "./Counter"

const CounterContainer = ({onAdd, product, /* cart */}) => {

    const [counter, setCounter] = useState(1)
  return (
    <Counter onAdd={onAdd} counter={counter} setCounter={setCounter} product={product} /* cart={cart} */ />
  )
}

export default CounterContainer