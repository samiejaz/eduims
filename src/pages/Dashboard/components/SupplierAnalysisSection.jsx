import React from "react"
import {
  GetSupplierPayableCountData,
  GetSupplierReceiveableCountData,
} from "../dashboard.api"
import { useQuery } from "@tanstack/react-query"
import { useAuthProvider } from "../../../context/AuthContext"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import { ROUTE_URLS } from "../../../utils/enums"
import AmountCard from "./AmountCard"
import { useNavigate } from "react-router-dom"

const SupplierAnalysisSection = () => {
  const { user } = useAuthProvider()
  const { appConfigData } = useAppConfigurataionProvider()
  const navigate = useNavigate()

  const pendingCountsData = useQuery({
    queryKey: ["pendingSupplierPayableData", user?.userID],
    queryFn: () =>
      GetSupplierPayableCountData({
        LoginUserID: user?.userID,
      }),
    initialData: {
      Balance: 0,
      Count: 0,
    },
    refetchOnWindowFocus: true,
  })
  const receviableCountsData = useQuery({
    queryKey: ["pendingSupplierReceivableData", user?.userID],
    queryFn: () =>
      GetSupplierReceiveableCountData({
        LoginUserID: user?.userID,
      }),
    initialData: {
      Balance: 0,
      Count: 0,
    },
    refetchOnWindowFocus: true,
  })

  return (
    <div className="px-3 py-2 bg-white shadow-2 border-round-lg">
      <span className="w-full inline-block text-3xl text-center font-bold">
        SUPPLIER ANALYSIS
      </span>
      <div className="flex gap-2 w-full h-full mt-3">
        <div className="flex flex-column xl:flex-column lg:flex-column w-full gap-2">
          <AmountCard
            amount={pendingCountsData.data?.Balance}
            title="Payable (Cr.)"
            count={pendingCountsData.data?.Count}
            icon={"pi pi-dollar"}
            currency={appConfigData.data?.Currency}
            onClick={() =>
              navigate(
                ROUTE_URLS.DASHBOARD.SUPPLIER_ANALYSIS_DETAIL_ROUTE +
                  "?type=payable"
              )
            }
            variant="orange"
            loading={
              pendingCountsData.isFetching || pendingCountsData.isLoading
            }
          />
        </div>
        <div className="flex flex-column xl:flex-column lg:flex-column w-full gap-2">
          <AmountCard
            amount={receviableCountsData.data?.Balance}
            title="Receivable (Dr.)"
            count={receviableCountsData.data?.Count}
            icon={"pi pi-dollar"}
            currency={appConfigData.data?.Currency}
            onClick={() =>
              navigate(
                ROUTE_URLS.DASHBOARD.SUPPLIER_ANALYSIS_DETAIL_ROUTE +
                  "?type=receivable"
              )
            }
            loading={
              receviableCountsData.isFetching || receviableCountsData.isLoading
            }
            variant="yellow"
          />
        </div>
      </div>
    </div>
  )
}

export default SupplierAnalysisSection
