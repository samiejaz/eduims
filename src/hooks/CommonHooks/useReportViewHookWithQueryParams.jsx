import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { CustomSpinner } from "../../components/CustomSpinner"
import { PrintReportInNewTabWithLoadingToast } from "../../utils/CommonFunctions"

const apiUrl = import.meta.env.VITE_APP_API_URL

const useReportViewerWithQueryParams = (
  { controllerName, ShowPrintInNewTab = false } = {
    controllerName: "",
    ShowPrintInNewTab: false,
  }
) => {
  const [data, setData] = useState(null)
  const [onReportGenerated, setOnReportGenerated] = useState(() => null)

  const mutation = useMutation({
    mutationFn: async ({ queryParams }) => {
      try {
        const { data: base64String } = await axios.post(
          apiUrl + controllerName + queryParams
        )
        setData(base64String)

        if (onReportGenerated) {
          onReportGenerated()
        }
      } catch (error) {
        console.error(error)
        return ""
      }
    },
  })

  function generateReport(payload) {
    if (ShowPrintInNewTab) {
      PrintReportInNewTabWithLoadingToast({
        fullUrl: apiUrl + controllerName + payload,
        onReportGenerated: onReportGenerated,
      })
    } else {
      mutation.mutate({ queryParams: payload })
    }
  }

  return {
    generateReport,
    setOnReportGenerated,
    render: (
      <>
        {mutation.isPending && (
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

export default useReportViewerWithQueryParams
