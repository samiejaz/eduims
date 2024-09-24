import { Button } from "primereact/button"
import React from "react"
import { GetPendingReceiptsCountData } from "../dashboard.api"
import { useQuery } from "@tanstack/react-query"
import { useAuthProvider } from "../../../context/AuthContext"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import { useNavigate } from "react-router-dom"
import { ROUTE_URLS } from "../../../utils/enums"
import {} from "lucide-react"
const PendingReceiptsCardSection = () => {
  const { user } = useAuthProvider()
  const { appConfigData } = useAppConfigurataionProvider()
  const navigate = useNavigate()

  const pendingCountsData = useQuery({
    queryKey: ["pendingReceiptCountData", user?.userID],
    queryFn: () =>
      GetPendingReceiptsCountData({
        LoginUserID: user?.userID,
        Type: "Count",
      }),
    initialData: {
      Balance: 0,
      Count: 0,
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: 60000,
  })

  if (pendingCountsData.isFetching || pendingCountsData.isLoading) {
    return <>Loading....</>
  }

  return (
    <div
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        borderRadius: "16px",
        background: "white",
      }}
      className="h-full lg:h-11rem xl:h-11rem flex flex-column gap-2 border-solid border-gray-100"
    >
      <span className="text-start font-bold mt-2 px-4">Pending Receipts</span>
      <div className="flex align-items-start justify-content-evenly flex-column xl:flex-row lg:flex-row w-full">
        <SingleSection
          amount={pendingCountsData.data.PendingAmount}
          title="Pending"
          className={
            "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
          }
          count={pendingCountsData.data.PendingCount}
          icon={
            <div
              style={{
                background: "red",
                borderRadius: "16px",
                padding: "1rem",
              }}
            >
              <span style={{ color: "white" }} className="pi pi-dollar"></span>{" "}
            </div>
          }
          currency={appConfigData.data?.Currency}
          onClick={() =>
            navigate(
              ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Pending"
            )
          }
        />
        <SingleSection
          amount={pendingCountsData.data.DueAmount}
          title="Due Today"
          className={
            "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
          }
          count={pendingCountsData.data.DueCount}
          icon={
            <div
              style={{
                background: "yellow",
                borderRadius: "16px",
                padding: "1rem",
              }}
            >
              <span style={{ color: "black" }} className="pi pi-dollar"></span>{" "}
            </div>
          }
          currency={appConfigData.data?.Currency}
          onClick={() =>
            navigate(ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Due")
          }
        />

        <SingleSection
          amount={pendingCountsData.data.UpcomingAmount}
          title="Upcoming"
          className={
            "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
          }
          count={pendingCountsData.data.UpcomingCount}
          icon={
            <div
              style={{
                background: "green",
                borderRadius: "16px",
                padding: "1rem",
              }}
            >
              <span style={{ color: "white" }} className="pi pi-dollar"></span>{" "}
            </div>
          }
          currency={appConfigData.data?.Currency}
          onClick={() =>
            navigate(
              ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=UpComing"
            )
          }
        />
        <SingleSection
          amount={pendingCountsData.data.TotalAmount}
          title="Total"
          count={pendingCountsData.data.TotalCount}
          icon={
            <div
              style={{
                background: "#1D4CB7",
                borderRadius: "16px",
                padding: "1rem",
              }}
            >
              <span style={{ color: "white" }} className="pi pi-dollar"></span>{" "}
            </div>
          }
          currency={appConfigData.data?.Currency}
          onClick={() =>
            navigate(
              ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Total"
            )
          }
        />
      </div>
    </div>
  )
}

export default PendingReceiptsCardSection

const SingleSection = ({
  icon = (
    <div
      style={{
        background: "#1D4CB7",
        borderRadius: "16px",
        padding: "1rem",
      }}
    >
      <span style={{ color: "white" }} className="pi pi-dollar"></span>{" "}
    </div>
  ),
  amount,
  title = "",
  className = {},
  count,
  currency,
  onClick = () => null,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex-1 h-full flex flex-column align-items-start pl-4 justify-content-center gap-2 hover bg-white hover:bg-blue-100 w-full py-4 lg:py-2 xl:py-2 ${className}`}
    >
      {icon}
      <span className="font-bold">
        {currency}
        {amount} <span className="font-semibold text-sm">({count})</span>
      </span>

      <span className="font-light text-md">{title}</span>
    </div>
  )
}
