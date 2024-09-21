import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { CustomSpinner } from "../../components/CustomSpinner"
import { PrintReportInNewTabWithLoadingToast } from "../../utils/CommonFunctions"

const apiUrl = import.meta.env.VITE_APP_API_URL

const useReportViewer = ({ controllerName, ShowPrintInNewTab = false }) => {
  const queryclient = useQueryClient()
  const [queryParams, setQueryParams] = useState(null)
  const [reload, setReload] = useState(false)
  const [onReportGenerated, setOnReportGenerated] = useState(() => null)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["accountLedgerReport", reload],
    queryFn: async () => {
      const { data: base64String } = await axios.post(
        apiUrl + controllerName + queryParams
      )

      // TODO make query as mutation
      if (onReportGenerated) {
        onReportGenerated()
      }

      return base64String
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: queryParams !== null,
    staleTime: 0,
  })

  function generateReport(reportQueyrParams) {
    setReload((previous) => !previous)
    queryclient.removeQueries({ queryKey: ["accountLedgerReport"] })
    if (!ShowPrintInNewTab) {
      setQueryParams(reportQueyrParams)
    } else {
      PrintReportInNewTabWithLoadingToast({
        fullUrl: apiUrl + controllerName + reportQueyrParams,
      })
    }
  }

  return {
    generateReport,
    setOnReportGenerated,
    render: (
      <>
        {(isLoading || isFetching) && (
          <>
            <CustomSpinner message="Generating report..." />
          </>
        )}
        {data && (
          <>
            <div className="w-full h-full">
              <embed
                width="100%"
                height="100%"
                src={`data:application/pdf;base64,${data}`}
                type="application/pdf"
              />
            </div>
          </>
        )}
      </>
    ),
  }
}

export default useReportViewer
