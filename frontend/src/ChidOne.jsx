import { useCounter } from './Context'

const ChildOne = () => {
  const { counter, handleIncrement, handleDecrement } = useCounter()
  return (
    <div>
      <h1>From Child One</h1>
      <h1>{counter}</h1>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}
export default ChildOne
