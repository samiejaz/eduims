import React from "react"
import { SalesPercentageCard } from "./AmountPercentageCards"
import { GetSaleReceiptAnalysisData } from "../dashboard.api"
import { useQuery } from "@tanstack/react-query"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import { useAuthProvider } from "../../../context/AuthContext"

const SaleAndReceiptsPercentageSections = () => {
  const { user } = useAuthProvider()
  const { appConfigData } = useAppConfigurataionProvider()
  const data = useQuery({
    queryKey: ["SaleAndReceiptsPercentageSectionsData", user?.userID],
    queryFn: () =>
      GetSaleReceiptAnalysisData({
        LoginUserID: user?.userID,
      }),
    initialData: {
      message: "",
      success: false,
      InvoiceAmount: 0,
      InvoiceCount: 0,
      InvoiceChangePercentage: 0,
      ReceiptAmount: 0,
      ReceiptCount: 0,
      ReceiptChangePercentage: 0,
    },
    refetchOnWindowFocus: true,
  })

  return (
    <div className="flex gap-2 py-3 px-2 bg-white flex flex-column shadow-2 border-round-lg">
      <span className="w-full inline-block text-3xl text-center font-bold">
        Invoice and Receipt Analysis
      </span>
      <div className="flex gap-2">
        <SalesPercentageCard
          amount={data.data?.InvoiceAmount}
          percentage={data.data?.InvoiceChangePercentage}
          title={"Today Invoices"}
          loading={data.isLoading || data.isFetching}
          currency={appConfigData.data?.Currency}
          count={data.data?.InvoiceCount}
        />
        <SalesPercentageCard
          amount={data.data?.ReceiptAmount}
          percentage={data.data?.ReceiptChangePercentage}
          title={"Today Receipts"}
          loading={data.isLoading || data.isFetching}
          currency={appConfigData.data?.Currency}
          count={data.data?.ReceiptCount}
        />
      </div>
    </div>
  )
}

export default SaleAndReceiptsPercentageSections
