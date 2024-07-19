import { useCounter } from './Context'

const ChildTwo = () => {
  const { counter, handleIncrement, handleDecrement } = useCounter()
  return (
    <div>
      <h1>From Child Two</h1>
      <h1>{counter}</h1>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}
export default ChildTwo
