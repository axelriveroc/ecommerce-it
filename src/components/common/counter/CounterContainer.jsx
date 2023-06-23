import { useState } from "react"
import Counter from "./Counter"

const CounterContainer = ({onAdd}) => {

    const [counter, setCounter] = useState(0)
  return (
    <Counter onAdd={onAdd} counter={counter} setCounter={setCounter} />
  )
}

export default CounterContainer