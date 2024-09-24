import { useQuery } from "@tanstack/react-query"
import { useAuthProvider } from "../../../context/AuthContext"
import { GetToInvoiceCountData } from "../dashboard.api"
import { Button } from "primereact/button"

import React from "react"

import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import { useNavigate } from "react-router-dom"
import { ROUTE_URLS } from "../../../utils/enums"

const PendingInvoiceCardSection = () => {
  const { user } = useAuthProvider()
  const { appConfigData } = useAppConfigurataionProvider()
  const navigate = useNavigate()

  const data = useQuery({
    queryKey: ["pendingInvoiceData", user?.userID],
    queryFn: () =>
      GetToInvoiceCountData({
        LoginUserID: user?.userID,
      }),
    initialData: {
      Balance: 0,
      Count: 0,
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: 60000,
  })

  if (data.isFetching || data.isLoading) {
    return <>Loading....</>
  }

  return (
    <div
      style={{
        background: "#E6F4FF",
        width: "100%",
        border: "none",
        outline: "none",
        borderRadius: "16px",
        height: "11rem",
      }}
    >
      <div className="flex align-items-start justify-content-between w-full py-5 px-4">
        <div className="flex flex-column gap-1">
          <span className="font-bold text-sm">Pending Invoices</span>
          <span className="font-bold text-3xl" style={{ color: "#1D4CB7" }}>
            {appConfigData.data?.Currency}
            {data.data.Balance}{" "}
            <span className="text-lg" style={{ color: "#1B97F5" }}>
              ({data.data.Count})
            </span>
          </span>
          <div className="mt-2">
            <Button
              label="View More"
              type="button"
              size="small"
              onClick={() =>
                navigate(ROUTE_URLS.DASHBOARD.PENDING_INVOICES_ROUTE)
              }
              pt={{
                root: {
                  style: {
                    background: "#1B97F5",
                    border: "none",
                    outline: "none",
                  },
                },
              }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              background: "#1D4CB7",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <span style={{ color: "white" }} className="pi pi-dollar"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingInvoiceCardSection
