import React from "react"
import {
  GetPendingReceiptsCountData,
  GetToInvoiceCountData,
} from "../dashboard.api"
import { useQuery } from "@tanstack/react-query"
import { useAuthProvider } from "../../../context/AuthContext"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"

import { ROUTE_URLS } from "../../../utils/enums"

import AmountCard from "./AmountCard"
import { useNavigate } from "react-router-dom"
const CustomerAnalysisSection = () => {
  const { user } = useAuthProvider()
  const { appConfigData } = useAppConfigurataionProvider()
  const navigate = useNavigate()

  return (
    <div className="px-3 py-2 bg-white shadow-2 border-round-lg">
      <span className="w-full inline-block text-3xl text-center font-bold">
        CUSTOMER ANALYSIS
      </span>
      <div className="flex gap-2 w-full h-full mt-3">
        <PendingInvoiceSection
          appConfigData={appConfigData}
          user={user}
          navigate={navigate}
        />
        <PendingReceiptSection
          appConfigData={appConfigData}
          user={user}
          navigate={navigate}
        />
      </div>
    </div>
  )
}

export default CustomerAnalysisSection

function PendingInvoiceSection({ appConfigData, user, navigate }) {
  const pendingCountsData = useQuery({
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
  })

  return (
    <div className="flex flex-column xl:flex-column lg:flex-column w-full gap-2">
      <span className="text-lg font-bold">Pending Invoices</span>
      <AmountCard
        amount={pendingCountsData.data?.LastWeekCustomerBalance}
        title="Last 7 Days"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.LastWeekCustomerCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() => navigate(ROUTE_URLS.DASHBOARD.PENDING_INVOICES_ROUTE)}
        variant="yellow"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />
      <AmountCard
        amount={pendingCountsData.data?.LastMonthCustomerBalance}
        title="Last 30 Days"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.LastMonthCustomerCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() => navigate(ROUTE_URLS.DASHBOARD.PENDING_INVOICES_ROUTE)}
        variant="green"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />

      <AmountCard
        amount={pendingCountsData.data?.OverallCustomerBalance}
        title="Overall"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.OverallCustomerCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() => navigate(ROUTE_URLS.DASHBOARD.PENDING_INVOICES_ROUTE)}
        variant="pink"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />
    </div>
  )
}

const PendingReceiptSection = ({ appConfigData, user, navigate }) => {
  const pendingCountsData = useQuery({
    queryKey: ["pendingReceiptsData", user?.userID],
    queryFn: () =>
      GetPendingReceiptsCountData({
        LoginUserID: user?.userID,
      }),
    initialData: {
      Balance: 0,
      Count: 0,
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: 60000,
  })

  return (
    <div className="flex flex-column xl:flex-column lg:flex-column w-full gap-2">
      <span className="text-lg font-bold">Pending Receipts</span>
      <AmountCard
        amount={pendingCountsData.data?.PendingAmount}
        title="Overdue"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.PendingCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() =>
          navigate(
            ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Pending"
          )
        }
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
        variant="yellow"
      />
      <AmountCard
        amount={pendingCountsData.data?.DueAmount}
        title="Due Today"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.DueCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() =>
          navigate(ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Due")
        }
        variant="green"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />

      <AmountCard
        amount={pendingCountsData.data?.UpcomingAmount}
        title="Upcoming"
        className={
          "border-none  lg:border-right-1 xl:border-right-1 border-solid border-gray-200 "
        }
        count={pendingCountsData.data?.UpcomingCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() =>
          navigate(
            ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=UpComing"
          )
        }
        variant="pink"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />
      <AmountCard
        amount={pendingCountsData.data?.TotalAmount}
        title="Total"
        count={pendingCountsData.data?.TotalCount}
        icon={"pi pi-dollar"}
        currency={appConfigData.data?.Currency}
        onClick={() =>
          navigate(ROUTE_URLS.DASHBOARD.PENDING_RECEIPTS_ROUTE + "?type=Total")
        }
        variant="purple"
        loading={pendingCountsData.isFetching || pendingCountsData.isLoading}
      />
    </div>
  )
}
