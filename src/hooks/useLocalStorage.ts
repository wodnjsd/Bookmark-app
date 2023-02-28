import { useState, useEffect } from 'react'

//using Local storage to store list of bookmarks 

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