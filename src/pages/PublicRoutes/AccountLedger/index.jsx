import React from "react"
import { useParams } from "react-router-dom"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import { formatDateWithSymbol } from "../../../utils/CommonFunctions"
import { decryptID } from "../../../utils/crypto"

function transformData(data = [], openingBalance) {
  let calculatedBalance = 0
  let updatedData = [
    {
      key: "opening_balance",
      CustomerInvoiceID: 0,
      Cr: "",
      Dr: "",
      AccountID: 0,
      Description: "Opening Balance",
      InvoiceNo: 0,
      VNo: "",
      InvoiceDate: "",
      AccountTitle: "",
      Balance: openingBalance,
    },
  ]
  let crTotal = 0
  let dtRotal = 0
  for (const [i, item] of data.entries()) {
    if (i == 0) {
      calculatedBalance = openingBalance + item.Dr - item.Cr
    } else {
      calculatedBalance = calculatedBalance + item.Dr - item.Cr
    }
    crTotal += item.Cr
    dtRotal += item.Dr
    item.key = "ledger_balance_row_" + i
    item.Balance = calculatedBalance

    updatedData.push(item)
  }

  let totalsRow = {
    key: "total_balances",
    CustomerInvoiceID: 0,
    Cr: crTotal,
    Dr: dtRotal,
    AccountID: 0,
    Description: "",
    InvoiceNo: 0,
    VNo: "",
    InvoiceDate: "",
    AccountTitle: "",
    Balance: calculatedBalance,
  }

  updatedData.push(totalsRow)

  return updatedData
}

export default () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL
  const { id } = useParams()

  const ledgerData = useQuery({
    queryKey: ["ledgerData", id],
    queryFn: async () => {
      try {
        let sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const decriptedId = decryptID(id)

        const { data } = await axios.post(
          apiUrl +
            `/Common/GetCustomerLedger?AccountID=${decriptedId}&DateFrom=${formatDateWithSymbol(sixMonthsAgo)}&DateTo=${formatDateWithSymbol(new Date())}`
        )

        if (data.success == true) {
          const dataWithBalanceColumn = transformData(
            data.dt,
            data.dt2[0].OpeningAmount
          )

          return dataWithBalanceColumn
        } else {
          return []
        }
      } catch (error) {
        console.error(error)
        return []
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  })

  return (
    <>
      <div className="mx-auto py-2 max-w-90">
        <div className="flex flex-column gap-4 w-full">
          <div>
            <h1>Account Ledger</h1>
          </div>
          <div>
            <LedgerDataTable data={ledgerData} />
          </div>
        </div>
      </div>
    </>
  )
}

function LedgerDataTable({ data = {} }) {
  const columns = [
    {
      heading: "Date",
      field: "FormatedDate",
    },
    {
      heading: "V #",
      field: "VNo",
    },
    {
      heading: "Description",
      field: "Description",
    },
    {
      heading: "Debit",
      field: "Dr",
    },
    {
      heading: "Credit",
      field: "Cr",
    },
  ]

  function balanceBodyTemplate(rowData) {
    let formattedNumber = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: "2",
      maximumFractionDigits: "4",
    }).format(rowData?.Balance)

    let formattedNegativeNumber = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: "2",
      maximumFractionDigits: "4",
    }).format(-1 * rowData?.Balance)

    return (
      <span>
        {rowData?.Balance >= 0
          ? formattedNumber
          : `(${formattedNegativeNumber})`}
      </span>
    )
  }

  return (
    <DataTable
      showGridlines
      removableSort
      dataKey="key"
      emptyMessage="No ledgers found!"
      resizableColumns
      size="small"
      selectionMode="single"
      className={"thead"}
      loading={data.isFetching || data.isLoading}
      tableStyle={{ minWidth: "50rem" }}
      value={data.data ?? []}
    >
      {columns.map((item, i) => (
        <Column
          headerStyle={{
            background: "#10B981",
            color: "white",
          }}
          key={item.key + i}
          field={item.field}
          header={item.heading}
        ></Column>
      ))}
      <Column
        headerStyle={{
          background: "#10B981",
          color: "white",
        }}
        key={"_balance_col"}
        field={"Balance"}
        header={"Balance"}
        body={balanceBodyTemplate}
      ></Column>
    </DataTable>
  )
}
