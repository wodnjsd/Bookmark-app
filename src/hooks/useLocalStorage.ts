import { useState, useEffect } from 'react'

// type ReturnType<T> =[
//   T | undefined,
//   React.Dispatch<React.SetStateAction<T>

// ]

export const useLocalStorage = <T, >(key: string, initialValue?: T | (() => T)) => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [T, typeof setValue]
}