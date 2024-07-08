import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import RootLayout from "../layout/RootLayout"
import { useContext } from "react"
// import { CommandBar } from "../App"

function ProtectedRoutes() {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  function CurrentRoutes() {
    if (!location.pathname.includes("pub")) {
      return <Navigate to={"/auth"} />
    } else {
      return <Navigate to={location.pathname} />
    }
  }

  return (
    <>
      {user !== null ? (
        <>
          <RootLayout />
        </>
      ) : (
        <>
          <CurrentRoutes />
        </>
      )}
    </>
  )
}

export default ProtectedRoutes
