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
import { useAllUsersSelectData } from "../../hooks/SelectData/useSelectData"
import { useAppConfigurataionProvider } from "../../context/AppConfigurationContext"
import { useEffect } from "react"

export default function LeadInformationReport() {
  document.title = "Lead Information Report"

  const { sessionConfigData } = useAppConfigurataionProvider()

  const method = useForm({
    defaultValues: {
      DateFrom: sessionConfigData?.data?.SessionOpeningDate,
      DateTo: new Date(),
      UserID: [],
    },
  })

  const { generateReport, render } = useReportViewerHook({
    controllerName: "/Reports/GetLeadInformationReport",
  })

  function onSubmit(formData) {
    let UserStr = formData.UserID.length > 0 ? formData.UserID.join(",") : ""

    let UserIDQueryParam = UserStr !== "" ? "&DemoPersonID=" + UserStr : ""
    let queryParams = `?${UserIDQueryParam}&DateFrom=${formatDateWithSymbol(formData.DateFrom ?? new Date())}&DateTo=${formatDateWithSymbol(formData.DateTo ?? new Date())}&Export=p`
    generateReport(queryParams)
  }

  return (
    <>
      <div className="flex align-items-center justify-content-center ">
        <h1 className="text-3xl">Lead Information Report</h1>
      </div>
      <form onKeyDown={preventFormByEnterKeySubmission}>
        <FormRow className="mt-2">
          <FormProvider {...method}>
            <MultiSelectDemoPersonsField />
          </FormProvider>

          <FormColumn lg={2} xl={2} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Date From
            </FormLabel>
            <div>
              <CDatePicker control={method.control} name={"DateFrom"} />
            </div>
          </FormColumn>
          <FormColumn lg={2} xl={2} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Date To
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

const MultiSelectDemoPersonsField = () => {
  const usersSelectData = useAllUsersSelectData()
  const method = useFormContext()

  return (
    <>
      <FormColumn lg={4} xl={4} md={12}>
        <FormLabel>Demo Persons</FormLabel>
        <CMultiSelectField
          control={method.control}
          name="UserID"
          options={usersSelectData.data}
          optionLabel="UserName"
          optionValue="UserID"
          placeholder="Select demo persons..."
        />
      </FormColumn>
    </>
  )
}
