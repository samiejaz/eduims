import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { LOCAL_STORAGE_KEYS } from "../utils/enums"
import { decryptedObject } from "../utils/crypto"
import { useQuery } from "@tanstack/react-query"
const apiUrl = import.meta.env.VITE_APP_API_URL

export const AppConfigurationContext = createContext()

export const AppConfigurationProivder = ({ children }) => {
  const [pageTitles, setPagesTitle] = useState()
  const user = decryptedObject(
    localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY)
  )

  const sessionConfigData = useQuery({
    queryKey: ["sessionConfigData"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/Common/GetSessionInformation?LoginUserID=${user?.userID}`
        )
        if (data.success === true) {
          return {
            SessionOpeningDate: new Date(data.data[0].SessionOpeningDate),
          }
        } else {
          return {
            SessionOpeningDate: new Date(),
          }
        }
      } catch (error) {
        console.error(error)
        return {
          SessionOpeningDate: new Date(),
        }
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  const userConfigData = useQuery({
    queryKey: ["userConfigData", user],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/Common/GetUserConfig?LoginUserID=${user?.userID}`
        )
        if (data.success === true) {
          return {
            ShowAccountAnalysisOnMainDashboard:
              data.data[0].ShowAccountAnalysisOnMainDashboard,
          }
        } else {
          return {
            ShowAccountAnalysisOnMainDashboard: false,
          }
        }
      } catch (error) {
        console.error(error)
        return {
          ShowAccountAnalysisOnMainDashboard: false,
        }
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  const appConfigData = useQuery({
    queryKey: ["appconfigData"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/EduIMS/GetConfigInfo?LoginUserID=${user?.userID}`
        )

        setPagesTitle({
          product: data?.data[0]?.ProductTitle,
          branch: data?.data[0]?.CustomerBranchTitle,
          ShowTimelineInsideLeadsForm:
            data?.data[0]?.ShowTimelineInsideLeadsForm,
          Currency: data?.data[0]?.Currency,
        })
        if (data.success === true) {
          return {
            product: data?.data[0]?.ProductTitle,
            branch: data?.data[0]?.CustomerBranchTitle,
            ShowTimelineInsideLeadsForm:
              data?.data[0]?.ShowTimelineInsideLeadsForm,
            Currency: data?.data[0]?.Currency,
          }
        } else {
          return {
            product: "Product",
            branch: "Branch",
            ShowTimelineInsideLeadsForm: false,
            Currency: "Rs ",
          }
        }
      } catch (error) {
        console.error(error)
        return {
          product: "Product",
          branch: "Branch",
          ShowTimelineInsideLeadsForm: false,
          Currency: "Rs ",
        }
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return (
    <AppConfigurationContext.Provider
      value={{
        setPagesTitle,
        sessionConfigData,
        appConfigData,
        userConfigData,
      }}
    >
      {children}
    </AppConfigurationContext.Provider>
  )
}

export const useAppConfigurataionProvider = () => {
  const { setPagesTitle, sessionConfigData, appConfigData, userConfigData } =
    useContext(AppConfigurationContext)

  return {
    pageTitles: appConfigData.data,
    setPagesTitle,
    sessionConfigData,
    appConfigData,
    userConfigData,
  }
}
