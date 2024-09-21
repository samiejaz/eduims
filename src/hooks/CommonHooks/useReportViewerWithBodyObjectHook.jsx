import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { CustomSpinner } from "../../components/CustomSpinner"

const apiUrl = import.meta.env.VITE_APP_API_URL

const useReportViewerWithBodyObject = (
  { controllerName, ShowPrintInNewTab = false } = {
    controllerName: "",
    ShowPrintInNewTab: false,
  }
) => {
  const [data, setData] = useState(null)

  const mutation = useMutation({
    mutationFn: async ({ bodyObject }) => {
      try {
        const { data: base64String } = await axios.post(
          apiUrl + controllerName,
          bodyObject
        )
        setData(base64String)
      } catch (error) {
        console.error(error)
        return ""
      }
    },
  })

  function generateReport(payload) {
    mutation.mutate({ bodyObject: payload })
  }

  return {
    generateReport,
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

export default useReportViewerWithBodyObject
