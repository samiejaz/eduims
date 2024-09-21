import { useNavigate } from "react-router-dom"
import { useAuthProvider } from "../../../context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { GetToInvoiceData } from "../dashboard.api"
import React, { useState } from "react"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import { useReportViewerHook } from "../../../hooks/CommonHooks/commonhooks"
import { formatDateWithSymbol } from "../../../utils/CommonFunctions"
import { Dialog } from "primereact/dialog"
import { Calendar } from "primereact/calendar"
import { ROUTE_URLS } from "../../../utils/enums"
import { encryptID } from "../../../utils/crypto"
import useReportViewerWithQueryParams from "../../../hooks/CommonHooks/useReportViewHookWithQueryParams"

const PendingInvoiceCardSectionDetail = () => {
  const { user } = useAuthProvider()
  const { render, setVisible, setAccountID, setCustomerID } =
    useChooseDatesForLedger()

  const navigate = useNavigate()

  const data = useQuery({
    queryKey: ["pendingInvoiceDataDetail", user?.userID],
    queryFn: () =>
      GetToInvoiceData({
        LoginUserID: user?.userID,
      }),
    initialData: [],
  })

  const ActionTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="flex align-items-center gap-2">
          <Button
            icon="pi pi-file"
            rounded
            severity="success"
            outlined
            className="p-0"
            tooltip="View Ledger"
            tooltipOptions={{
              position: "left",
            }}
            size="small"
            onClick={() => {
              setCustomerID(rowData.CustomerID)
              setAccountID(rowData.AccountID)
              setVisible(true)
            }}
          />
          <Button
            icon="pi pi-pencil"
            rounded
            severity="secondary"
            outlined
            size="small"
            className="p-0"
            tooltip="Make Invoice"
            tooltipOptions={{
              position: "left",
            }}
            onClick={() => navigateToInvoice(rowData)}
          />
        </div>
      </React.Fragment>
    )
  }

  const AmountTemplate = (rowData) => {
    return (
      <>
        {rowData.Amount < 0 ? (
          <span>({-1 * rowData.Amount})</span>
        ) : (
          <span>{rowData.Amount}</span>
        )}
      </>
    )
  }

  if (data.isLoading || data.isFetching) {
    return <span>Loading...</span>
  }

  const columns = [
    {
      field: "CustomerName",
      header: "Customer Name",
    },
    {
      field: "AccountTitle",
      header: "Account Title",
    },
    {
      field: "Amount",
      header: "Amount",
      template: AmountTemplate,
    },
    {
      field: "AccountID",
      header: "Actions",
      template: ActionTemplate,
    },
  ]

  function navigateToInvoice(params) {
    const queryParams = `?CustomerID=${encryptID(params.CustomerID)}&AccountID=${encryptID(params.AccountID)}`
    navigate(`${ROUTE_URLS.ACCOUNTS.NEW_CUSTOMER_INVOICE}/new${queryParams}`)
  }
  return (
    <>
      <div className="py-2">
        <Button
          text
          link
          icon="pi pi-arrow-left"
          onClick={() => navigate(-1)}
          label="Dashboard"
          type="button"
        />
      </div>
      <DataTable dataKey="AccountID" value={data.data || []}>
        {columns.map((item) => {
          return (
            <Column
              key={item.field}
              field={item.field}
              header={item.header}
              headerStyle={{
                background: "#10B981",
                color: "white",
              }}
              body={item?.template}
            ></Column>
          )
        })}
      </DataTable>
      {render}
    </>
  )
}

const useChooseDatesForLedger = () => {
  const { sessionConfigData } = useAppConfigurataionProvider()

  const [visible, setVisible] = useState(false)
  const [dateFrom, setDateFrom] = useState(
    sessionConfigData?.data?.SessionOpeningDate
  )
  const [dateTo, setDateTo] = useState(new Date())
  const [CustomerID, setCustomerID] = useState("")
  const [AccountID, setAccountID] = useState("")

  const { generateReport, setOnReportGenerated } =
    useReportViewerWithQueryParams({
      controllerName: "/Reports/CustomerLedgerReport",
      ShowPrintInNewTab: true,
    })

  function printReport() {
    let reportQueryParams = `?CustomerID=${CustomerID}&AccountID=${AccountID}&DateFrom=${formatDateWithSymbol(dateFrom ?? new Date())}&DateTo=${formatDateWithSymbol(dateTo ?? new Date())}&Export=p`
    setOnReportGenerated(() => () => {
      setVisible(false)
      setCustomerID("")
      setAccountID("")
      setDateFrom(sessionConfigData?.data?.SessionOpeningDate)
      setDateTo(new Date())
    })

    generateReport(reportQueryParams)
  }

  return {
    setVisible,
    setCustomerID,
    setAccountID,
    render: (
      <>
        <Dialog
          header="View Account Ledger"
          visible={visible}
          draggable={false}
          onHide={() => {
            setVisible(false)
          }}
        >
          <div className="flex align-items-center justify-content-start gap-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="AccountLedgerDateFrom" className="font-bold">
                Date From
              </label>
              <Calendar
                id="AccountLedgerDateFrom"
                name="AccountLedgerDateFrom"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.value)
                }}
                dateFormat={"dd-M-yy"}
                style={{ width: "100%" }}
                hourFormat="12"
                placeholder="Choose date from"
                selectOtherMonths
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="AccountLedgerDateTo" className="font-bold">
                Date To
              </label>
              <Calendar
                id="AccountLedgerDateTo"
                name="AccountLedgerDateTo"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.value)
                }}
                dateFormat={"dd-M-yy"}
                style={{ width: "100%" }}
                hourFormat="12"
                placeholder="Choose date to"
                selectOtherMonths
              />
            </div>
          </div>
          <div className="mt-2 flex align-items-center justify-content-end">
            <Button
              label={"Print"}
              icon="pi pi-arrow-right"
              iconPos="right"
              type="button"
              className="rounded"
              onClick={printReport}
            />
          </div>
        </Dialog>
      </>
    ),
  }
}
export default PendingInvoiceCardSectionDetail
