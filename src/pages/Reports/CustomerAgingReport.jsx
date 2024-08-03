import { FormProvider, useForm } from "react-hook-form"
import { CDatePicker, CDropDownField } from "../../components/Forms/form"
import {
  FormRow,
  FormColumn,
  FormLabel,
} from "../../components/Layout/LayoutComponents"
import { Button } from "primereact/button"
import {
  formatDateWithSymbol,
  preventFormByEnterKeySubmission,
} from "../../utils/CommonFunctions"
import { useReportViewerHook } from "../../hooks/CommonHooks/commonhooks"
import { CustomerAndLedgerComponent } from "./common"

export default function CustomerAgingReport() {
  document.title = "Customer Aging Report"
  const method = useForm({
    defaultValues: {
      DateTo: new Date(),
      ReportType: "0",
      ReportStyle: "Summary",
      AccountID: [],
      CustomerID: null,
    },
  })
  const { generateReport, render } = useReportViewerHook({
    controllerName: "/Reports/GetCustomerAgingReport",
  })

  function onSubmit(formData) {
    let queryParams = ""

    if (formData.DateTo) {
      queryParams += `?AsOnDate=${formatDateWithSymbol(formData.DateTo ?? new Date())}`
    }

    if (formData.ReportType) {
      queryParams += `&ReportType=${formData.ReportType}`
    }

    if (Array.isArray(formData.AccountID) && formData.AccountID.length > 0) {
      let ids = formData.AccountID.join(",")
      queryParams += `&AccountID=${ids}`
    }

    if (formData.CustomerID) {
      queryParams += `&CustomerID=${formData.CustomerID}`
    }

    if (formData.ReportStyle) {
      queryParams += `&ReportStyle=${formData.ReportStyle}`
    }
    generateReport(queryParams)
  }

  return (
    <div className="px-4 py-2">
      <div
        className="flex align-items-center justify-content-center w-full mb-2"
        style={{
          color: "black",
          padding: "1rem",
          border: "1px solid #d1d5db",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <div>
          <h1 className="text-3xl">Customer Aging Report</h1>
        </div>
      </div>
      <form onKeyDown={preventFormByEnterKeySubmission} className="mt-4">
        <FormRow>
          <FormColumn lg={4} xl={4} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              As On Date
              <span className="text-red-700 fw-bold ">*</span>
            </FormLabel>
            <div>
              <CDatePicker control={method.control} name={"DateTo"} required />
            </div>
          </FormColumn>
          <FormProvider {...method}>
            <CustomerAndLedgerComponent
              showCustomerClearIcon
              isCustomerRequired={false}
            />
          </FormProvider>
        </FormRow>
        <FormRow className="mt-">
          <FormColumn className="col-xl-3" lg={3} xl={3} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Report Type
            </FormLabel>
            <div>
              <CDropDownField
                control={method.control}
                name={"ReportType"}
                options={[
                  { label: "Receivable", value: "1" },
                  { label: "Payable", value: "2" },
                  { label: "Both", value: "0" },
                ]}
              />
            </div>
          </FormColumn>
          <FormColumn className="col-xl-3" lg={3} xl={3} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Report Type
            </FormLabel>
            <div>
              <CDropDownField
                control={method.control}
                name={"ReportStyle"}
                options={[
                  { label: "Summary", value: "Summary" },
                  { label: "Detail", value: "Detail" },
                ]}
              />
            </div>
          </FormColumn>
          <div
            className="flex align-items-center gap-2 mb-2"
            style={{ alignSelf: "end" }}
          >
            <Button
              label="View"
              severity="primary"
              pt={{
                root: {
                  style: {
                    padding: ".4rem 2rem",
                  },
                },
              }}
              onClick={() => method.handleSubmit(onSubmit)()}
              type="button"
            />
          </div>
          <div className="ml-2 mr-2 min-h-screen w-full mt-2"> {render}</div>
        </FormRow>
      </form>
    </div>
  )
}
