
const Counter = ({onAdd, counter, setCounter}) => {
  return (
    <div>
        <button onClick={()=> setCounter(counter - 1)}>-</button>
        <h5>{counter}</h5>
        <button onClick={()=> setCounter(counter + 1)}>+</button>

        <button onClick={()=> onAdd(counter)}> Agregar al carrito </button>
    </div>
  )
}

export default Counter