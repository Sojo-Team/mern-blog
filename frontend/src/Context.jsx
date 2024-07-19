import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null)

export default function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0)

  const handleIncrement = () => setCounter(prev => prev + 1)

  const handleDecrement = () => setCounter(counter - 1)

  return (
    <CounterContext.Provider
      value={{ counter, handleDecrement, handleIncrement }}>
      {children}
    </CounterContext.Provider>
  )
}

export const useCounter = () => useContext(CounterContext)
