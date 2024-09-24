import { useSearchParams } from "react-router-dom"
import { getNavigatedFrom } from "../../utils/enums"

const useNavigatedRouteConfig = ({ title, parentRoute }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = new URLSearchParams(searchParams)
  const from = queryParams.get("f") ?? ""

  function getGoBackRoute() {
    const navigated_from = getNavigatedFrom(from)
    const navigate_from_obj = {
      ...navigated_from,
      isNavigatedFromOtherRoute: false,
    }
    if (from) {
      if (navigated_from) {
        navigate_from_obj.routeUrl = navigated_from.routeUrl
        navigate_from_obj.title = navigated_from.title
        navigate_from_obj.isNavigatedFromOtherRoute = true
      }
    } else {
      navigate_from_obj.routeUrl = parentRoute
      navigate_from_obj.title = title
    }

    return navigate_from_obj
  }
  const getRouteConfig = getGoBackRoute()
  return {
    routeConfig: getRouteConfig,
    queryParams,
  }
}

export default useNavigatedRouteConfig
