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
import {
  useReportViewerHook,
  useReportViewerWithBodyObjectHook,
} from "../../hooks/CommonHooks/commonhooks"
import { useAllUsersSelectData } from "../../hooks/SelectData/useSelectData"
import { useAppConfigurataionProvider } from "../../context/AppConfigurationContext"

export default function LeadInformationReport() {
  const leadStatusOptions = [
    {
      label: "New Lead",
      value: "newlead",
    },
    {
      label: "Closed",
      value: "closed",
    },
    {
      label: "Quoted",
      value: "quoted",
    },
    {
      label: "Finalized",
      value: "finalized",
    },
    {
      label: "Forwarded",
      value: "forwarded",
    },
    {
      label: "Acknowledged",
      value: "acknowledged",
    },
    {
      label: "Meeting Done",
      value: "meetingdone",
    },
    {
      label: "Pending",
      value: "pending",
    },
  ]

  document.title = "Lead Information Report"

  const { sessionConfigData } = useAppConfigurataionProvider()

  const method = useForm({
    defaultValues: {
      DateFrom: sessionConfigData?.data?.SessionOpeningDate,
      DateTo: new Date(),
      UserID: [],
      Status: [],
    },
  })

  const { generateReport, render } = useReportViewerWithBodyObjectHook({
    controllerName: "/Reports/GetLeadInformationReport",
    ShowPrintInNewTab: false,
  })

  function onSubmit(formData) {
    let dataToSend = {
      DateFrom: formatDateWithSymbol(formData.DateFrom ?? new Date()),
      DateTo: formatDateWithSymbol(formData.DateTo ?? new Date()),
      DemoPersonID:
        formData.UserID.length > 0 ? formData.UserID.join(",") : "0",
      Status:
        formData.Status.length > 0
          ? JSON.stringify(
              formData.Status.map((item) => {
                return {
                  Status: item,
                }
              })
            )
          : null,
      Export: "p",
    }
    generateReport(dataToSend)
    // let UserStr = formData.UserID.length > 0 ? formData.UserID.join(",") : ""
    // let StatusStr = formData.Status.length > 0 ? formData.Status.join(",") : ""
    // let UserIDQueryParam = UserStr !== "" ? "&DemoPersonID=" + UserStr : ""
    // let StatusStrQueryParams = StatusStr !== "" ? "&Status=" + StatusStr : ""
    // let queryParams = `?${UserIDQueryParam}${StatusStrQueryParams}&DateFrom=${formatDateWithSymbol(formData.DateFrom ?? new Date())}&DateTo=${formatDateWithSymbol(formData.DateTo ?? new Date())}&Export=p`

    // generateReport(queryParams)
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
          <FormColumn lg={4} xl={4} md={6}>
            <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
              Status
            </FormLabel>
            <div>
              <CMultiSelectField
                control={method.control}
                name="Status"
                options={leadStatusOptions}
                placeholder="Select statuses..."
              />
            </div>
          </FormColumn>
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
          <div className="mb-2 ml-2" style={{ alignSelf: "end" }}>
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
