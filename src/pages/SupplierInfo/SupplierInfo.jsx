import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { FilterMatchMode } from "primereact/api"
import { useEffect, useRef, useState } from "react"
import { CustomSpinner } from "../../components/CustomSpinner"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import ActionButtons from "../../components/ActionButtons"
import { FormProvider, useForm } from "react-hook-form"
import ButtonToolBar from "../../components/ActionsToolbar"
import TextInput from "../../components/Forms/TextInput"
import CheckBox from "../../components/Forms/CheckBox"
import { useAuthProvider } from "../../context/AuthContext"
import {
  addNewSupplier,
  deleteSupplierByID,
  fetchAllSuppliers,
  fetchSupplierId,
} from "./supplierinfo.api"
import {
  MENU_KEYS,
  QUERY_KEYS,
  ROUTE_URLS,
  TABLE_NAMES,
} from "../../utils/enums"
import {
  FormRow,
  FormColumn,
  FormLabel,
} from "../../components/Layout/LayoutComponents"
import useConfirmationModal from "../../hooks/useConfirmationModalHook"
import { encryptID } from "../../utils/crypto"
import { FormRightsWrapper } from "../../components/Wrappers/wrappers"
import { DetailPageTilteAndActionsComponent } from "../../components"
import { usePreviousAndNextID } from "../../hooks/api/usePreviousAndNextIDHook"
import CountryDependentFields from "../../components/CommonFormFields/CountryDependantFields"

let parentRoute = ROUTE_URLS.CUSTOMERS.SUPPLIER_INFO_ROUTE
let editRoute = `${parentRoute}/edit/`
let newRoute = `${parentRoute}/new`
let viewRoute = `${parentRoute}/`
let queryKey = QUERY_KEYS.SUPPLIER_INFO_QUERY_KEY
let IDENTITY = "CustomerID"
let MENU_KEY = MENU_KEYS.CUSTOMERS.SUPPLIER_FORM_KEY

export default function SessionInfo() {
  return (
    <FormRightsWrapper
      FormComponent={FormComponent}
      DetailComponent={DetailComponent}
      menuKey={MENU_KEY}
      identity={IDENTITY}
    />
  )
}
function DetailComponent({ userRights }) {
  document.title = "Customers"

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { showDeleteDialog, showEditDialog } = useConfirmationModal({
    handleDelete,
    handleEdit,
  })

  const [filters, setFilters] = useState({
    CustomerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ContactPerson1Name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ContactPerson1No: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ContactPerson1Email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const { user } = useAuthProvider()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchAllSuppliers(user.userID),
    initialData: [],
  })

  const deleteMutation = useMutation({
    mutationFn: deleteSupplierByID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  function handleDelete(id) {
    deleteMutation.mutate({ CustomerID: id, LoginUserID: user.userID })
  }

  function handleEdit(id) {
    navigate(editRoute + id)
  }

  function handleView(id) {
    navigate(parentRoute + "/" + id)
  }

  const onRowClick = (e) => {
    navigate(viewRoute + encryptID(e?.data?.CustomerID))
  }

  return (
    <div className="mt-4">
      {isLoading || isFetching ? (
        <>
          <div className="h-100 w-100">
            <div className="d-flex align-content-center justify-content-center ">
              <CustomSpinner />
            </div>
          </div>
        </>
      ) : (
        <>
          <DetailPageTilteAndActionsComponent
            title="Suppliers"
            onAddNewClick={() => navigate(newRoute)}
            showAddNewButton={userRights[0]?.RoleNew}
            buttonLabel="Add New Supplier"
          />
          <DataTable
            showGridlines
            value={data}
            dataKey="CustomerID"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            emptyMessage="No Suppliers found!"
            filters={filters}
            filterDisplay="row"
            resizableColumns
            size="small"
            selectionMode="single"
            className={"thead"}
            tableStyle={{ minWidth: "50rem" }}
            onRowClick={onRowClick}
          >
            <Column
              body={(rowData) =>
                ActionButtons({
                  ID: encryptID(rowData.CustomerID),
                  handleDelete: () =>
                    showDeleteDialog(encryptID(rowData.CustomerID)),
                  handleEdit: () =>
                    showEditDialog(encryptID(rowData.CustomerID)),
                  handleView: handleView,
                  showEditButton: userRights[0]?.RoleEdit,
                  showDeleteButton: false,
                  viewBtnRoute: viewRoute + encryptID(rowData.CustomerID),
                })
              }
              header="Actions"
              resizeable={false}
              style={{ minWidth: "7rem", maxWidth: "10rem", width: "7rem" }}
            ></Column>
            <Column
              field="CustomerName"
              filter
              filterPlaceholder="Search by Customer"
              sortable
              header="Customer"
            ></Column>
            <Column
              field="ContactPerson1Name"
              filter
              filterPlaceholder="Search by contact person"
              sortable
              header="Contact Person"
            ></Column>
            <Column
              field="ContactPerson1No"
              filter
              filterPlaceholder="Search by contact person no"
              sortable
              header="Contact Person No"
            ></Column>
            <Column
              field="ContactPerson1Email"
              filter
              filterPlaceholder="Search by contact person email"
              sortable
              header="Contact Person Email"
            ></Column>
          </DataTable>
        </>
      )}
    </div>
  )
}
function FormComponent({ mode, userRights }) {
  document.title = "Supplier Entry"
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { CustomerID } = useParams()
  const countryRef = useRef()
  const method = useForm({
    defaultValues: {
      CustomerName: "",
      CustomerBusinessAddress: "",
      CountryID: null,
      TehsilID: null,
      ContactPerson1Name: "",
      ContactPerson1No: "",
      ContactPerson1Email: "",
      Description: "",
      PartyType: 1,
      InActive: false,
    },
  })
  const { user } = useAuthProvider()
  const { data: PreviousAndNextIDs } = usePreviousAndNextID({
    TableName: TABLE_NAMES.Customer,
    IDName: IDENTITY,
    LoginUserID: user?.userID,
    RecordID: CustomerID,
  })

  const CustomerData = useQuery({
    queryKey: [queryKey, CustomerID],
    queryFn: () => fetchSupplierId(CustomerID, user?.userID),
    enabled: CustomerID !== undefined,
    initialData: [],
  })

  useEffect(() => {
    if (Array.isArray(CustomerData.data) && CustomerData.data.length > 0) {
      method.setValue("CustomerName", CustomerData?.data[0]?.CustomerName)
      method.setValue("CountryID", CustomerData.data[0].CountryID ?? null)
      countryRef.current?.setCountryID(CustomerData.data[0].CountryID ?? null)
      method.setValue("TehsilID", CustomerData.data[0].TehsilID)
      method.setValue(
        "CustomerBusinessAddress",
        CustomerData?.data[0]?.CustomerBusinessAddress ?? ""
      )
      method.setValue(
        "ContactPerson1Name",
        CustomerData?.data[0]?.ContactPerson1Name ?? ""
      )
      method.setValue(
        "ContactPerson1No",
        CustomerData?.data[0]?.ContactPerson1No ?? ""
      )
      method.setValue(
        "ContactPerson1Email",
        CustomerData?.data[0]?.ContactPerson1Email ?? ""
      )
      method.setValue("Description", CustomerData?.data[0]?.Description ?? "")
      method.setValue("InActive", CustomerData?.data[0]?.InActive ?? "")
    }
  }, [CustomerData])

  const mutation = useMutation({
    mutationFn: addNewSupplier,
    onSuccess: ({ success, RecordID }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        navigate(`${parentRoute}/${RecordID}`)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteSupplierByID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      navigate(parentRoute)
    },
  })

  function handleDelete() {
    deleteMutation.mutate({ CustomerID: CustomerID, LoginUserID: user.userID })
  }

  function handleAddNew() {
    reset()
    navigate(newRoute)
  }
  function handleCancel() {
    if (mode === "new") {
      navigate(parentRoute)
    } else if (mode === "edit") {
      navigate(viewRoute + CustomerID)
    }
  }
  function handleEdit() {
    navigate(editRoute + CustomerID)
  }

  function onSubmit(data) {
    mutation.mutate({
      formData: data,
      userID: user.userID,
      CustomerID: CustomerID,
    })
  }

  return (
    <>
      {CustomerData.isLoading ? (
        <>
          <CustomSpinner />
        </>
      ) : (
        <>
          <div className="mt-4">
            <ButtonToolBar
              mode={mode}
              saveLoading={mutation.isPending}
              handleGoBack={() => navigate(parentRoute)}
              handleEdit={() => handleEdit()}
              handleCancel={() => {
                handleCancel()
              }}
              handleAddNew={() => {
                handleAddNew()
              }}
              handleDelete={handleDelete}
              handleSave={() => method.handleSubmit(onSubmit)()}
              GoBackLabel="Suppliers"
              showAddNewButton={userRights[0]?.RoleNew}
              showEditButton={userRights[0]?.RoleEdit}
              showDelete={false}
              PreviousAndNextIDs={PreviousAndNextIDs}
              handlePrevious={() =>
                navigate(
                  `${parentRoute}/${PreviousAndNextIDs.PreviousRecordID}`
                )
              }
              handleNext={() =>
                navigate(`${parentRoute}/${PreviousAndNextIDs.NextRecordID}`)
              }
              currentRecordId={CustomerID}
              handleFirstRecord={() => {
                navigate(`${parentRoute}/${PreviousAndNextIDs.FirstRecordID}`)
              }}
              handleLastRecord={() => {
                navigate(`${parentRoute}/${PreviousAndNextIDs.LastRecordID}`)
              }}
            />
          </div>
          <form className="mt-4">
            <FormProvider {...method}>
              <input type="hidden" {...method.register("PartyType")} />
              <FormRow>
                <FormColumn lg={4} xl={4} md={6}>
                  <FormLabel labelFor="CustomerName">
                    Supplier
                    <span className="text-red-700 fw-bold ">*</span>
                  </FormLabel>

                  <div>
                    <TextInput
                      control={method.control}
                      ID={"CustomerName"}
                      required={true}
                      focusOptions={() => method.setFocus("Country")}
                      isEnable={mode !== "view"}
                      autoFocus
                    />
                  </div>
                </FormColumn>
                <CountryDependentFields
                  mode={mode}
                  col={4}
                  required={false}
                  ref={countryRef}
                />
              </FormRow>

              <FormRow>
                <FormColumn lg={12} xl={12} md={6}>
                  <FormLabel>Supplier Business Address</FormLabel>

                  <div>
                    <TextInput
                      control={method.control}
                      ID={"CustomerBusinessAddress"}
                      focusOptions={() => method.setFocus("ContactPerson1Name")}
                      isEnable={mode !== "view"}
                    />
                  </div>
                </FormColumn>
              </FormRow>

              <FormRow>
                <FormColumn lg={4} xl={4} md={6}>
                  <FormLabel>Contact Name</FormLabel>
                  <div>
                    <TextInput
                      control={method.control}
                      ID={"ContactPerson1Name"}
                      focusOptions={() => method.setFocus("ContactPerson1No")}
                      isEnable={mode !== "view"}
                    />
                  </div>
                </FormColumn>

                <FormColumn lg={4} xl={4} md={6}>
                  <FormLabel>Contact No</FormLabel>
                  <div>
                    <TextInput
                      control={method.control}
                      ID={"ContactPerson1No"}
                      focusOptions={() =>
                        method.setFocus("ContactPerson1Email")
                      }
                      isEnable={mode !== "view"}
                    />
                  </div>
                </FormColumn>

                <FormColumn lg={4} xl={4} md={6}>
                  <FormLabel> Email</FormLabel>
                  <div>
                    <TextInput
                      control={method.control}
                      ID={"ContactPerson1Email"}
                      focusOptions={() => method.setFocus("Description")}
                      isEnable={mode !== "view"}
                    />
                  </div>
                </FormColumn>
              </FormRow>

              <FormRow>
                <FormColumn lg={12} xl={12} md={6}>
                  <FormLabel>Descripiton</FormLabel>
                  <div>
                    <textarea
                      rows={"1"}
                      disabled={mode === "view"}
                      className="p-inputtext"
                      style={{
                        padding: "0.3rem 0.4rem",
                        fontSize: "0.8em",
                        width: "100%",
                      }}
                      {...method.register("Description")}
                    />
                  </div>
                </FormColumn>
              </FormRow>
              <FormRow>
                <FormColumn lg={6} xl={6} md={6}>
                  <div className="mt-2">
                    <CheckBox
                      control={method.control}
                      ID={"InActive"}
                      Label={"InActive"}
                      isEnable={mode !== "view"}
                    />
                  </div>
                </FormColumn>
              </FormRow>
            </FormProvider>
          </form>
        </>
      )}
    </>
  )
}
