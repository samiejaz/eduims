import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { CDatePicker, CMultiSelectField } from "../../components/Forms/form"
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
import { useBusinessUnitsSelectData } from "../../hooks/SelectData/useSelectData"
import { CustomerAndLedgerComponent } from "./common"

export default function AccountLedgerReport() {
  document.title = "Account Ledger"
  const method = useForm({
    defaultValues: {
      AccountID: [],
      BusinessUnitID: [],
      CustomerID: null,
    },
  })
  const { generateReport, render } = useReportViewerHook({
    controllerName: "/Reports/CustomerLedgerReport",
  })

  function onSubmit(formData) {
    let BusinessUnitStr =
      formData.BusinessUnitID.length > 0
        ? formData.BusinessUnitID.join(",")
        : ""
    let AccountStr =
      formData.AccountID.length > 0 ? formData.AccountID.join(",") : ""
    let businessUnitQueryParam =
      BusinessUnitStr !== "" ? "&BusinessUnitID=" + BusinessUnitStr : ""
    let AccountIDQueryParam =
      AccountStr !== "" ? "&AccountID=" + AccountStr : ""
    let queryParams = `?CustomerID=${formData.CustomerID}${businessUnitQueryParam}${AccountIDQueryParam}&DateFrom=${formatDateWithSymbol(formData.DateFrom ?? new Date())}&DateTo=${formatDateWithSymbol(formData.DateTo ?? new Date())}&Export=p`
    generateReport(queryParams)
  }

  return (
    <>
      <div className="flex align-items-center justify-content-center ">
        <h1 className="text-3xl">Account Ledger</h1>
      </div>
      <form onKeyDown={preventFormByEnterKeySubmission}>
        <FormRow>
          <FormProvider {...method}>
            <MultiSelectBusinessUnitField col={4} />
            <CustomerAndLedgerComponent />
          </FormProvider>
          <FormColumn lg={2} xl={2} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Date From
              <span className="text-red-700 fw-bold ">*</span>
            </FormLabel>
            <div>
              <CDatePicker control={method.control} name={"DateFrom"} />
            </div>
          </FormColumn>
          <FormColumn lg={2} xl={2} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Date To
              <span className="text-red-700 fw-bold ">*</span>
            </FormLabel>
            <div>
              <CDatePicker control={method.control} name={"DateTo"} />
            </div>
          </FormColumn>
          <div className="ml-2 mb-2" style={{ alignSelf: "end" }}>
            <Button
              label="View"
              severity="primary"
              pt={{
                root: {
                  style: {
                    padding: ".4rem 1rem",
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
    </>
  )
}

const MultiSelectBusinessUnitField = ({ col = 3 }) => {
  const businessUnitSelectData = useBusinessUnitsSelectData()
  const method = useFormContext()

  return (
    <>
      <FormColumn lg={col} xl={col} md={12}>
        <FormLabel>Business Unit</FormLabel>
        <CMultiSelectField
          control={method.control}
          name="BusinessUnitID"
          options={businessUnitSelectData.data}
          optionLabel="BusinessUnitName"
          optionValue="BusinessUnitID"
          placeholder="Select a business unit"
        />
      </FormColumn>
    </>
  )
}
