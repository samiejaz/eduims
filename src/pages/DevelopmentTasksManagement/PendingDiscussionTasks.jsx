import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useContext, useEffect, useState } from "react"
import {
  MENU_KEYS,
  QUERY_KEYS,
  ROUTE_URLS,
  TABLE_NAMES,
} from "../../utils/enums"
import { Tag } from "primereact/tag"
import { FilterMatchMode } from "primereact/api"
import { useUserData } from "../../context/AuthContext"
import {
  fetchDevelopers,
  fetchDiscussionPendingTasks,
} from "../../api/DevelopmentTaskManagementData"
import {
  FormColumn,
  FormLabel,
  FormRow,
} from "../../components/Layout/LayoutComponents"
import CDropdown from "../../components/Forms/CDropdown"
import { useForm } from "react-hook-form"
import { CustomSpinner } from "../../components/CustomSpinner"
import { Button } from "primereact/button"
let queryKey = "taskmanagemetkey"
let selectqueryKey = "selectDeveloperkey"
let MENU_KEY = MENU_KEYS.GENERAL.BUSINESS_TYPE_FORM_KEY

const PendingDiscussionTasks = () => {
  document.title = "Task Management"
  const queryClient = useQueryClient()
  const user = useUserData()
  const [tasks, setTasks] = useState([])
  const method = useForm({
    defaultValues: {
      EmployeeID: "",
    },
  })

  const {
    data,
    refetch: getPendingDiscussionTasks,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: [queryKey, user.userID],
    queryFn: () =>
      fetchDiscussionPendingTasks(user.userID, method.getValues("EmployeeID")),
    initialData: [],
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (Array.isArray(data)) {
      setTasks(data)
    }
  }, [data, isRefetching])

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.PaymentType}
        style={{ fontSize: 10 }}
        severity={getSeverity(rowData.PaymentType)}
      />
    )
  }
  const [filters, setFilters] = useState({
    ClientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const approvalBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.IsApproved}
        style={{ fontSize: 10 }}
        severity={getSeverity(rowData.IsApproved)}
      />
    )
  }
  const getSeverity = (status) => {
    switch (status) {
      case "Unpaid":
        return "danger"

      case "Paid":
        return "success"

      case "Approved":
        return "success"

      case "Un-Approved":
        return "danger"

      case "":
        return null
    }
  }

  const developerSelectData = DeveloperSelectData()

  function DeveloperSelectData({ refetchOnWindowFocus = false } = {}) {
    const data = useQuery({
      queryKey: [selectqueryKey],
      queryFn: () => fetchDevelopers(),
      initialData: [],
      refetchOnWindowFocus: refetchOnWindowFocus,
    })
    return data
  }

  return (
    <div className="mt-5 px-3">
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
          <h1 className="text-3xl">Pending Discussion Tasks</h1>
        </div>
      </div>
      <FormRow>
        <FormColumn
          lg={12}
          xl={12}
          md={12}
          className="flex flex-column lg:flex-row xl:flex-row align-items-start lg:align-items-end xl:align-items-end  gap-5"
        >
          <div className="w-full lg:w-3 xl:w-3">
            <FormLabel labelFor="EmployeeID">Developer</FormLabel>
            <div className="mt-1">
              <CDropdown
                control={method.control}
                name={`EmployeeID`}
                optionLabel="EmployeeName"
                optionValue="EmployeeID"
                placeholder="Select a developer"
                options={developerSelectData.data}
                onChange={async (e) => {
                  getPendingDiscussionTasks()
                }}
              />
            </div>
          </div>
        </FormColumn>
      </FormRow>
      <div className="mt-3">
        {isLoading || isFetching ? (
          <>
            <CustomSpinner />
          </>
        ) : (
          <>
            <DataTable
              showGridlines
              value={tasks}
              dataKey="RequirementID"
              onRowReorder={(e) => setTasks(e.value)}
              // removableSort
              emptyMessage="No Tasks found!"
              filters={filters}
              // filterDisplay="row"
              //resizableColumns
              size="small"
              selectionMode="single"
              className={"thead"}

              //onRowClick={onRowClick}
            >
              <Column
                field="JobNo"
                header="Job No"
                style={{ width: "1rem", fontSize: 12, fontWeight: "600" }}
              ></Column>
              <Column
                field="JobDate"
                header="Job Date"
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>
              <Column
                field="DevelopmentType"
                header="Type"
                style={{ width: "1rem", fontSize: 12, fontWeight: "600" }}
              ></Column>
              <Column
                field="ClientName"
                filter
                filterPlaceholder="Search by country"
                header="Client"
                style={{
                  minWidth: "150px",
                  maxWidth: "150px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>
              <Column
                field="ProductTitle"
                header="Product"
                style={{
                  minWidth: "150px",
                  maxWidth: "150px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>
              <Column
                field="Description"
                header="Task Detail"
                filter
                filterPlaceholder="Search by task detail"
                style={{ fontSize: 12, fontWeight: "600" }}
              ></Column>
              <Column
                field="AssignedByTitle"
                header="Assigned By"
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>
              <Column
                field="DeveloperName"
                header="Developer Name"
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>

              <Column
                field="DevelopmentHours"
                header="Expected Development Hours"
                style={{ width: "3rem", fontSize: 12, fontWeight: "600" }}
              ></Column>
              <Column
                field="ExpectedDate"
                header="Expected Development Date"
                style={{
                  minWidth: "50px",
                  maxWidth: "100px",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              ></Column>
              <Column
                field="IsApproved"
                header="Approved"
                headerStyle={{ fontSize: 12 }}
                body={approvalBodyTemplate}
                style={{ minWidth: "100px", maxWidth: "100px" }}
              ></Column>
              <Column
                field="PaymentType"
                header="Payment"
                headerStyle={{ fontSize: 12 }}
                body={statusBodyTemplate}
                style={{ minWidth: "70px", maxWidth: "70px" }}
              ></Column>
            </DataTable>
          </>
        )}
      </div>
    </div>
  )
}

export default PendingDiscussionTasks
