import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuthProvider } from "../../../context/AuthContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  GetPendingReceiptsCountData,
  UpdateInstallmentDueDate,
} from "../dashboard.api"
import React, { useState } from "react"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useAppConfigurataionProvider } from "../../../context/AppConfigurationContext"
import {
  formatDateWithSymbol,
  ShowErrorToast,
  ShowSuccessToast,
} from "../../../utils/CommonFunctions"
import { Dialog } from "primereact/dialog"
import { Calendar } from "primereact/calendar"
import { ROUTE_URLS } from "../../../utils/enums"
import { encryptID } from "../../../utils/crypto"
import useReportViewerWithQueryParams from "../../../hooks/CommonHooks/useReportViewHookWithQueryParams"
import { FilterMatchMode } from "primereact/api"
import { useAllowFormHook } from "../../../hooks/CommonHooks/commonhooks"

const PendingReceiptCardSectionDetail = () => {
  const { user } = useAuthProvider()
  const { render, setVisible, setAccountID, setCustomerID } =
    useChooseDatesForLedger()
  const {
    render: DueDateRender,
    setVisible: setDueDateDialogVisible,
    setInvoiceInstallmentID,
  } = useChooseDateForDueDateUpdate(user?.userID)
  const { userConfigData } = useAppConfigurataionProvider()

  const [filters, setFilters] = useState({
    CustomerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    AccountTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = new URLSearchParams(searchParams)
  const params_type = queryParams.get("type") ?? ""

  const data = useQuery({
    queryKey: ["pendingRecetipsDetailData", user?.userID],
    queryFn: () =>
      GetPendingReceiptsCountData({
        LoginUserID: user?.userID,
        Type: "Table",
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
            tooltip="Make Receipt"
            tooltipOptions={{
              position: "left",
            }}
            onClick={() => navigateToInvoice(rowData)}
          />
          <Button
            icon="pi pi-refresh"
            rounded
            severity="info"
            outlined
            size="small"
            className="p-0"
            tooltip="Update Due Date"
            tooltipOptions={{
              position: "left",
            }}
            onClick={() => {
              setInvoiceInstallmentID(rowData.InvoiceInstallmentID)
              setDueDateDialogVisible(true)
            }}
          />
        </div>
      </React.Fragment>
    )
  }

  const AmountTemplate = (rowData) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      currency: "USD",
    }).format(rowData.Amount < 0 ? -1 * rowData.Amount : rowData.Amount)

    return (
      <>
        <span>{formattedAmount}</span>
      </>
    )
  }

  const columns = [
    {
      field: "CustomerName",
      header: "Customer Name",
      filter: true,
    },
    {
      field: "AccountTitle",
      header: "Account Title",
      filter: true,
    },
    {
      field: "DueDate",
      header: "Installment Due Date",
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
    const queryParams = `?CustomerID=${encryptID(params.CustomerID)}&AccountID=${encryptID(params.AccountID)}&f=pending_receipts`
    navigate(`${ROUTE_URLS.ACCOUNTS.RECIEPT_VOUCHER_ROUTE}/new${queryParams}`)
  }

  const TITLES = {
    UpComing: "Up Coming",
    Due: "Due",
    Pending: "Pending",
    Total: "Total",
  }

  useAllowFormHook(userConfigData.data?.ShowAccountAnalysisOnMainDashboard)

  if (data.isLoading || data.isFetching) {
    return <span>Loading...</span>
  }

  if (params_type === "") {
    return (
      <div className="flex align-items-center justify-content-center w-full min-h-90vh">
        <span>404 Not Found!</span>
      </div>
    )
  }

  function renderDataTable() {
    if (params_type === "Total") {
      return (
        <>
          <div>
            <span className="font-bold text-lg mb-2">Pending</span>
            <DataTable
              filters={filters}
              filterDisplay="row"
              size="small"
              paginator
              rows={10}
              scrollHeight="400px"
              scrollable
              rowsPerPageOptions={[5, 10, 50, 100]}
              dataKey="InvoiceInstallmentID"
              value={data.data["Pending"] || []}
            >
              {columns.map((item) => {
                return (
                  <Column
                    key={item.field}
                    field={item.field}
                    header={item.header}
                    filter={item?.filter ?? false}
                    headerStyle={{
                      background: "#10B981",
                      color: "white",
                    }}
                    body={item?.template}
                  ></Column>
                )
              })}
            </DataTable>
          </div>
          <div className="mt-2">
            <span className="font-bold text-lg mb-2">Due</span>
            <DataTable
              filters={filters}
              filterDisplay="row"
              size="small"
              paginator
              rows={10}
              scrollHeight="400px"
              scrollable
              rowsPerPageOptions={[5, 10, 50, 100]}
              dataKey="InvoiceInstallmentID"
              value={data.data["Due"] || []}
            >
              {columns.map((item) => {
                return (
                  <Column
                    key={item.field}
                    field={item.field}
                    header={item.header}
                    filter={item?.filter ?? false}
                    headerStyle={{
                      background: "#10B981",
                      color: "white",
                    }}
                    body={item?.template}
                  ></Column>
                )
              })}
            </DataTable>
          </div>
          <div className="mt-2">
            <span className="font-bold text-lg mb-2">Up Coming</span>
            <DataTable
              filters={filters}
              size="small"
              filterDisplay="row"
              paginator
              rows={10}
              scrollHeight="400px"
              scrollable
              rowsPerPageOptions={[5, 10, 50, 100]}
              dataKey="InvoiceInstallmentID"
              value={data.data["UpComing"] || []}
            >
              {columns.map((item) => {
                return (
                  <Column
                    field={item.field}
                    header={item.header}
                    filter={item?.filter ?? false}
                    headerStyle={{
                      background: "#10B981",
                      color: "white",
                    }}
                    body={item?.template}
                  ></Column>
                )
              })}
            </DataTable>
          </div>
        </>
      )
    } else {
      return (
        <DataTable
          filters={filters}
          filterDisplay="row"
          size="small"
          dataKey="InvoiceInstallmentID"
          paginator
          rows={10}
          scrollHeight="75vh"
          scrollable
          rowsPerPageOptions={[5, 10, 50, 100]}
          value={data.data[params_type] || []}
        >
          {columns.map((item) => {
            return (
              <Column
                key={item.field}
                field={item.field}
                header={item.header}
                filter={item?.filter ?? false}
                headerStyle={{
                  background: "#10B981",
                  color: "white",
                }}
                body={item?.template}
              ></Column>
            )
          })}
        </DataTable>
      )
    }
  }

  return (
    <>
      <div className="py-2 flex align-items-center justify-content-between w-full">
        <Button
          text
          link
          icon="pi pi-arrow-left"
          onClick={() => navigate(-1)}
          label="Dashboard"
          type="button"
          style={{
            justifySelf: "start",
          }}
        />

        <span className="font-bold text-lg">{TITLES[params_type]}</span>
        <span className="font-bold text-lg">Pending Receipts</span>
      </div>
      {renderDataTable()}
      {render}
      {DueDateRender}
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

const useChooseDateForDueDateUpdate = (UserId) => {
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)
  const [dueDate, setDueDate] = useState(new Date())
  const [InvoiceInstallmentID, setInvoiceInstallmentID] = useState(null)

  const mutation = useMutation({
    mutationFn: UpdateInstallmentDueDate,
    onSuccess: ({ success, message }) => {
      setVisible(false)
      setDueDate(new Date())
      setInvoiceInstallmentID(null)
      if (success == true) {
        ShowSuccessToast(message)
        queryClient.invalidateQueries({
          queryKey: ["pendingRecetipsDetailData", UserId],
        })
      } else {
        ShowErrorToast(message)
      }
    },
  })

  function updateDueDate() {
    if (InvoiceInstallmentID !== null) {
      mutation.mutate({
        LoginUserID: UserId,
        InvoiceInstallmentID,
        DueDate: dueDate,
      })
    }
  }

  return {
    setVisible,
    setInvoiceInstallmentID,
    render: (
      <>
        <Dialog
          header="Update Installment Due Date"
          visible={visible}
          draggable={false}
          onHide={() => {
            setVisible(false)
          }}
        >
          <div className="flex align-items-center gap-2">
            <div className="flex flex-column gap-2 w-full">
              <label htmlFor="AccountLedgerDateFrom" className="font-bold">
                Date <span className="font-bold text-red-700">*</span>
              </label>
              <Calendar
                id="AccountLedgerDateFrom"
                name="AccountLedgerDateFrom"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.value)
                }}
                dateFormat={"dd-M-yy"}
                style={{ width: "100%" }}
                hourFormat="12"
                required
                placeholder="Choose date from"
                selectOtherMonths
              />
            </div>
          </div>
          <div className="mt-5 flex align-items-center justify-content-end">
            <Button
              label={"Update"}
              type="button"
              className="rounded"
              loading={mutation.isPending}
              onClick={updateDueDate}
            />
          </div>
        </Dialog>
      </>
    ),
  }
}
export default PendingReceiptCardSectionDetail
