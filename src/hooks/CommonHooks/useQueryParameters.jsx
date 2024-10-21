import { useSearchParams } from "react-router-dom"

const useQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query_params = new URLSearchParams(searchParams)

  const getQueryParameterOrEmpty = (key) => {
    try {
      return query_params.get(key) ?? ""
    } catch (error) {
      return ""
    }
  }

  return {
    query_params,
    setSearchParams,
    getQueryParameterOrEmpty,
  }
}

export default useQueryParameters
