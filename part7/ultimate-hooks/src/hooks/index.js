import axios from 'axios'
import deepFreeze from 'deep-freeze'
import { useEffect, useState } from 'react'

export const useResource = baseUrl => {
  //* Creando un estado y manejador de este
  const [resources, setResources] = useState([])
  deepFreeze(resources)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(baseUrl)
        setResources(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [baseUrl, setResources])

  const create = async resource => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  //* Objeto conteniendo los servicios de mi hook
  const service = {
    create,
  }

  return [resources, service]
}

//* === Input Field ===
export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    reset,
    type,
    value,
    onChange,
  }
}
