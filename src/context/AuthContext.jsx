import { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { LOCAL_STORAGE_KEYS } from "../utils/enums"
import { decryptedObject, encrptyObject } from "../utils/crypto"

export const AuthContext = createContext()
export const AuthProvier = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  function loginUser(data, navigateToDashBoard = true) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_KEY, encrptyObject(data))
    setUser(data)
    if (navigateToDashBoard) {
      navigate("/", { replace: true })
    }
  }

  function updateUserName(username) {
    let existingUserObj = decryptedObject(
      localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY)
    )
    existingUserObj.username = username
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_KEY,
      encrptyObject(existingUserObj)
    )
    setUser(existingUserObj)
  }

  function logoutUser() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_KEY)
    setUser(null)
    navigate("/auth")
  }

  useEffect(() => {
    function checkUser() {
      if (!user) {
        const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY)
        if (userData !== null) {
          setUser(decryptedObject(userData))
          navigate(location.pathname + location.search)
        } else {
          setUser(null)
          navigate("/auth")
        }
      }
    }
    checkUser()
  }, [user, navigate])

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, setUser, updateUserName }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export function useUserData() {
  const { user } = useContext(AuthContext)
  return user
}

export function useAuthProvider() {
  const { user, loginUser, logoutUser, setUser, updateUserName } =
    useContext(AuthContext)
  return {
    user,
    loginUser,
    logoutUser,
    setUser,
    updateUserName,
  }
}
