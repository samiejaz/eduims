import {
  FormColumn,
  FormRow,
  FormLabel,
} from "../../components/Layout/LayoutComponents"
import { DataTable } from "primereact/datatable"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import {
  useForm,
  useFieldArray,
  useFormContext,
  FormProvider,
  useWatch,
} from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ActionButtons from "../../components/ActionButtons"
import { FilterMatchMode } from "primereact/api"
import React, { useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

import TextInput from "../../components/Forms/TextInput"
import NumberInput from "../../components/Forms/NumberInput"

import DetailHeaderActionButtons from "../../components/DetailHeaderActionButtons"
import CDropdown from "../../components/Forms/CDropdown"
import {
  addNewCreditNote,
  fetchAllCreditNotees,
  fetchMonthlyMaxCreditNoteNo,
  fetchCreditNoteById,
  deleteCreditNoteByID,
} from "../../api/CreditNoteData"
import ButtonToolBar from "../../components/ActionsToolbar"
import {
  MENU_KEYS,
  QUERY_KEYS,
  ROUTE_URLS,
  SELECT_QUERY_KEYS,
} from "../../utils/enums"
import {
  fetchAllBusinessUnitsForSelect,
  fetchAllCustomerAccountsForSelect,
  fetchAllOldCustomersForSelect,
  fetchAllSessionsForSelect,
} from "../../api/SelectData"
import CDatePicker from "../../components/Forms/CDatePicker"
import CNumberInput from "../../components/Forms/CNumberInput"
import { CustomSpinner } from "../../components/CustomSpinner"
import useConfirmationModal from "../../hooks/useConfirmationModalHook"
import { decryptID, encryptID } from "../../utils/crypto"

import { FormRightsWrapper } from "../../components/Wrappers/wrappers"
import { TextAreaField } from "../../components/Forms/form"
import { DetailPageTilteAndActionsComponent } from "../../components"
import { usePreviousAndNextID } from "../../hooks/api/usePreviousAndNextIDHook"
import {
  useNavigatedRouteConfigHook,
  useQueryParametersHook,
} from "../../hooks/CommonHooks/commonhooks"
let parentRoute = ROUTE_URLS.ACCOUNTS.CREDIT_NODE_ROUTE
let editRoute = `${parentRoute}/edit/`
let newRoute = `${parentRoute}/new`
let viewRoute = `${parentRoute}/`
let ddDetailColor = "#8f48d2"
let queryKey = QUERY_KEYS.CREDIT_NODE_QUERY_KEY
let IDENTITY = "CreditNoteID"
let MENU_KEY = MENU_KEYS.ACCOUNTS.CREDIT_NOTE_FORM_KEY

export default function CreditNotes() {
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
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { showDeleteDialog, showEditDialog } = useConfirmationModal({
    handleDelete,
    handleEdit,
  })

  const [filters, setFilters] = useState({
    VoucherNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    CustomerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    AccountTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
    CreditNoteMode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    TotalNetAmount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const { user } = useContext(AuthContext)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchAllCreditNotees(user.userID),
    initialData: [],
    refetchOnWindowFocus: false,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCreditNoteByID,
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      }
    },
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  function handleDelete(id) {
    deleteMutation.mutate({ CreditNoteID: id, LoginUserID: user.userID })
  }

  function handleEdit(id) {
    navigate(editRoute + id)
  }

  function handleView(id) {
    navigate(parentRoute + "/" + id)
  }

  const onRowClick = (e) => {
    navigate(viewRoute + encryptID(e?.data?.CreditNoteID))
  }

  return (
    <>
      {isLoading || isFetching ? (
        <>
          <CustomSpinner />
        </>
      ) : (
        <>
          <DetailPageTilteAndActionsComponent
            title="Credit Notes"
            onAddNewClick={() => navigate(newRoute)}
            showAddNewButton={userRights[0]?.RoleNew}
            buttonLabel="Add New Credit Note"
          />
          <DataTable
            showGridlines
            value={data}
            dataKey="CreditNoteID"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            emptyMessage="No Credit Notes found!"
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
                  ID: encryptID(rowData.CreditNoteID),
                  handleDelete: () =>
                    showDeleteDialog(encryptID(rowData.CreditNoteID)),
                  handleEdit: () =>
                    showEditDialog(encryptID(rowData.CreditNoteID)),
                  handleView: handleView,
                  showEditButton: userRights[0]?.RoleEdit,
                  showDeleteButton: userRights[0]?.RoleDelete,
                  viewBtnRoute: viewRoute + encryptID(rowData.CreditNoteID),
                })
              }
              header="Actions"
              resizeable={false}
              style={{ minWidth: "7rem", maxWidth: "7rem", width: "7rem" }}
            ></Column>
            <Column
              field="VoucherNo"
              filter
              filterPlaceholder="Search by voucher no"
              sortable
              header="Voucher No"
            ></Column>
            <Column field="VoucherDate" sortable header="Voucher Date"></Column>
            <Column
              field="TotalNetAmount"
              sortable
              header="Total Reciept Amount"
              filter
              filterPlaceholder="Search by CreditNote amount"
            ></Column>
            <Column
              field="CustomerName"
              sortable
              header="Customer Name"
              filter
              filterPlaceholder="Search by Customer"
            ></Column>
            <Column
              field="AccountTitle"
              sortable
              header="Ledger"
              filter
              filterPlaceholder="Search by ledger"
            ></Column>
          </DataTable>
        </>
      )}
    </>
  )
}

const defaultValues = {
  VoucherDate: new Date(),
  Description: "",
  CreditNoteDetail: [],
}

function FormComponent({ mode, userRights }) {
  document.title = "Credit Note Entry"
  const queryClient = useQueryClient()
  const { CreditNoteID } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { data: PreviousAndNextIDs } = usePreviousAndNextID({
    TableName: "data_CreditNote",
    IDName: IDENTITY,
    LoginUserID: user?.userID,
    RecordID: CreditNoteID,
  })

  const { routeConfig } = useNavigatedRouteConfigHook({
    title: "Credit Notes",
    parentRoute,
  })
  // Ref
  const detailTableRef = useRef()
  const customerCompRef = useRef()
  // Form
  const method = useForm({
    defaultValues,
  })

  const { data: CreditNoteData } = useQuery({
    queryKey: [QUERY_KEYS.CREDIT_NODE_QUERY_KEY, CreditNoteID],
    queryFn: () => fetchCreditNoteById(CreditNoteID, user.userID),
    enabled: CreditNoteID !== undefined,
    initialData: [],
  })

  const { data: BusinessUnitSelectData } = useQuery({
    queryKey: [QUERY_KEYS.BUSINESS_UNIT_QUERY_KEY],
    queryFn: fetchAllBusinessUnitsForSelect,
    initialData: [],
    enabled: mode !== "",
  })

  const CreditNoteMutation = useMutation({
    mutationFn: addNewCreditNote,
    onSuccess: ({ success, RecordID }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        if (routeConfig.isNavigatedFromOtherRoute == true) {
          navigate(routeConfig.routeUrl)
        } else {
          navigate(`${parentRoute}/${RecordID}`)
        }
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCreditNoteByID,
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      }
    },
  })

  useEffect(() => {
    if (CreditNoteID !== undefined && CreditNoteData?.Master?.length > 0) {
      // Setting Values
      method.setValue("SessionID", CreditNoteData?.Master[0]?.SessionID)
      method.setValue(
        "BusinessUnitID",
        CreditNoteData?.Master[0]?.BusinessUnitID
      )
      method.setValue("Customer", CreditNoteData?.Master[0]?.CustomerID)

      customerCompRef.current.setCustomerID(
        CreditNoteData?.Master[0]?.CustomerID
      )

      method.setValue("CustomerLedgers", CreditNoteData?.Master[0]?.AccountID)
      method.setValue("DocumentNo", CreditNoteData?.Master[0]?.DocumentNo)
      method.setValue("VoucherNo", CreditNoteData?.Master[0]?.VoucherNo)
      method.setValue(
        "SessionBasedVoucherNo",
        CreditNoteData?.Master[0]?.SessionBasedVoucherNo
      )
      method.setValue(
        "SessionBasedVoucherNo",
        CreditNoteData?.Master[0]?.SessionBasedVoucherNo
      )
      method.setValue(
        "CreditNoteMode",
        CreditNoteData?.Master[0]?.CreditNoteMode
      )
      method.setValue("Description", CreditNoteData?.Master[0]?.Description)
      method.setValue(
        "VoucherDate",
        new Date(CreditNoteData?.Master[0]?.VoucherDate)
      )
      method.setValue(
        "CreditNoteDetail",
        CreditNoteData.Detail?.map((item) => {
          return {
            BusinessUnitID: item.DetailBusinessUnitID,
            Amount: item.Amount,
            Description: item.DetailDescription,
            Balance: item.Balance,
          }
        })
      )
    }
  }, [CreditNoteID, CreditNoteData])

  function handleEdit() {
    navigate(`${editRoute}${CreditNoteID}`)
  }

  function handleAddNew() {
    method.reset()
    navigate(newRoute)
  }

  function handleCancel() {
    if (mode === "new") {
      navigate(parentRoute)
    } else if (mode === "edit") {
      navigate(`${parentRoute}/${CreditNoteID}`)
    }
  }

  function handleDelete() {
    deleteMutation.mutate({
      CreditNoteID: CreditNoteID,
      LoginUserID: user.userID,
    })
    navigate(parentRoute)
  }

  function onSubmit(data) {
    CreditNoteMutation.mutate({
      formData: data,
      userID: user.userID,
      CreditNoteID: CreditNoteID,
    })
  }

  return (
    <>
      {isLoading ? (
        <>
          <CustomSpinner />
        </>
      ) : (
        <>
          <div className="mt-4">
            <ButtonToolBar
              mode={mode}
              handleGoBack={() => navigate(routeConfig.routeUrl)}
              handleEdit={() => handleEdit()}
              handleCancel={() => {
                handleCancel()
              }}
              handleAddNew={() => {
                handleAddNew()
              }}
              handleSave={() => method.handleSubmit(onSubmit)()}
              GoBackLabel={routeConfig.title}
              saveLoading={CreditNoteMutation.isPending}
              handleDelete={handleDelete}
              showAddNewButton={userRights[0]?.RoleNew}
              showEditButton={userRights[0]?.RoleEdit}
              showDelete={userRights[0]?.RoleDelete}
              PreviousAndNextIDs={PreviousAndNextIDs}
              handlePrevious={() =>
                navigate(
                  `${parentRoute}/${PreviousAndNextIDs.PreviousRecordID}`
                )
              }
              handleNext={() =>
                navigate(`${parentRoute}/${PreviousAndNextIDs.NextRecordID}`)
              }
              currentRecordId={CreditNoteID}
              handleFirstRecord={() => {
                navigate(`${parentRoute}/${PreviousAndNextIDs.FirstRecordID}`)
              }}
              handleLastRecord={() => {
                navigate(`${parentRoute}/${PreviousAndNextIDs.LastRecordID}`)
              }}
            />
          </div>
          <form id="CreditNote" className="mt-4">
            <FormProvider {...method}>
              <FormRow>
                <SessionSelect mode={mode} />
                <BusinessUnitDependantFields mode={mode} />
                <FormColumn lg={2} xl={2} md={6}>
                  <FormLabel>Date</FormLabel>
                  <div>
                    <CDatePicker
                      control={method.control}
                      name="VoucherDate"
                      disabled={mode === "view"}
                    />
                  </div>
                </FormColumn>
              </FormRow>
              <FormRow>
                <CustomerDependentFields
                  mode={mode}
                  removeAllRows={detailTableRef.current?.removeAllRows}
                  ref={customerCompRef}
                />
              </FormRow>
            </FormProvider>

            <FormRow>
              <FormColumn lg={12} xl={12}>
                <FormLabel>Description</FormLabel>
                <TextAreaField
                  control={method.control}
                  name={"Description"}
                  autoResize={false}
                  disabled={mode === "view"}
                />
              </FormColumn>
            </FormRow>
          </form>

          {mode !== "view" && (
            <>
              <div className="card p-2 bg-light mt-2 ">
                <CreditNoteDetailHeaderForm
                  appendSingleRow={detailTableRef.current?.appendSingleRow}
                />
              </div>
            </>
          )}

          <FormProvider {...method}>
            <CreditNoteDetailTable
              mode={mode}
              BusinessUnitSelectData={BusinessUnitSelectData}
              ref={detailTableRef}
            />
          </FormProvider>
          <hr />
          <FormProvider {...method}>
            <CreditNoteDetailTotal />
          </FormProvider>
          <FormColumn style={{ marginBottom: "1rem" }}>
            <FormLabel>Total</FormLabel>

            <div>
              <NumberInput
                control={method.control}
                id={"TotalNetAmount"}
                disabled={true}
              />
            </div>
          </FormColumn>
        </>
      )}
    </>
  )
}

// New Master Fields
function SessionSelect({ mode }) {
  const { data } = useQuery({
    queryKey: [SELECT_QUERY_KEYS.SESSION_SELECT_QUERY_KEY],
    queryFn: fetchAllSessionsForSelect,
    initialData: [],
  })

  const method = useFormContext()

  useEffect(() => {
    if (data.length > 0 && mode === "new") {
      method.setValue("SessionID", data[0]?.SessionID)
    }
  }, [data, mode])

  return (
    <>
      <FormColumn lg={2} xl={2} md={6}>
        <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
          Session
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>
        <div>
          <CDropdown
            control={method.control}
            name={`SessionID`}
            filter={false}
            optionLabel="SessionTitle"
            optionValue="SessionID"
            placeholder="Select a session"
            options={data}
            required={true}
            disabled={mode === "view"}
            focusOptions={() => method.setFocus("BusinessUnitID")}
          />
        </div>
      </FormColumn>
    </>
  )
}

const CustomerDependentFields = React.forwardRef(
  ({ mode, removeAllRows }, ref) => {
    const [CustomerID, setCustomerID] = useState(0)

    React.useImperativeHandle(ref, () => ({
      setCustomerID,
    }))

    const { data: customerSelectData } = useQuery({
      queryKey: [QUERY_KEYS.ALL_CUSTOMER_QUERY_KEY],
      queryFn: fetchAllOldCustomersForSelect,
      initialData: [],
      refetchOnWindowFocus: true,
    })

    const { data: CustomerAccounts } = useQuery({
      queryKey: [QUERY_KEYS.CUSTOMER_ACCOUNTS_QUERY_KEY, CustomerID],
      queryFn: () => fetchAllCustomerAccountsForSelect(CustomerID),
      initialData: [],
      refetchOnWindowFocus: true,
    })

    const method = useFormContext()

    const { getQueryParameterOrEmpty, setSearchParams } =
      useQueryParametersHook()
    const params_customer_id = getQueryParameterOrEmpty("CustomerID")
    const params_account_id = getQueryParameterOrEmpty("AccountID")
    const f = getQueryParameterOrEmpty("f")

    useEffect(() => {
      if (
        CustomerAccounts &&
        customerSelectData &&
        params_customer_id !== "" &&
        params_account_id !== ""
      ) {
        initCustomerAndAccount()
      }
    }, [params_account_id, params_customer_id, customerSelectData])

    useEffect(() => {
      if (
        CustomerID &&
        Array.isArray(CustomerAccounts) &&
        CustomerAccounts.length > 0
      ) {
        if (f == "" && params_account_id === "") {
          method.setValue("CustomerLedgers", CustomerAccounts[0].AccountID)
        }
      }
    }, [params_account_id, CustomerAccounts])

    function initCustomerAndAccount() {
      method.setValue("Customer", parseInt(decryptID(params_customer_id)))
      method.setValue("CustomerLedgers", parseInt(decryptID(params_account_id)))
      setCustomerID(decryptID(params_customer_id))

      setSearchParams({ f })
    }

    return (
      <>
        <FormColumn lg={6} xl={6} md={6}>
          <FormLabel>
            Customer Name
            <span className="text-red-700 fw-bold ">*</span>
          </FormLabel>

          <div>
            <CDropdown
              control={method.control}
              name={"Customer"}
              optionLabel="CustomerName"
              optionValue="CustomerID"
              placeholder="Select a customer"
              options={customerSelectData}
              disabled={mode === "view"}
              required={true}
              filter={true}
              onChange={(e) => {
                setCustomerID(e.value)
                removeAllRows()
              }}
              focusOptions={() => method.setFocus("CustomerLedgers")}
            />
          </div>
        </FormColumn>
        <FormColumn lg={6} xl={6} md={6}>
          <FormLabel>
            Customer Ledgers
            <span className="text-red-700 fw-bold ">*</span>
          </FormLabel>

          <div>
            <CDropdown
              control={method.control}
              name={`CustomerLedgers`}
              optionLabel="AccountTitle"
              optionValue="AccountID"
              placeholder="Select a ledger"
              options={CustomerAccounts}
              disabled={mode === "view"}
              required={true}
              filter={true}
              onChange={() => {
                removeAllRows()
              }}
              focusOptions={() => method.setFocus("Description")}
            />
          </div>
        </FormColumn>
      </>
    )
  }
)

function BusinessUnitDependantFields({ mode }) {
  const [BusinesssUnitID, setBusinessUnitID] = useState(0)

  const { data: BusinessUnitSelectData } = useQuery({
    queryKey: [QUERY_KEYS.BUSINESS_UNIT_QUERY_KEY],
    queryFn: fetchAllBusinessUnitsForSelect,
    initialData: [],
    enabled: mode !== "",
  })
  useEffect(() => {
    if (BusinessUnitSelectData.length > 0) {
      method.setValue(
        "BusinessUnitID",
        BusinessUnitSelectData[0].BusinessUnitID
      )
      setBusinessUnitID(BusinessUnitSelectData[0].BusinessUnitID)
    }
  }, [BusinessUnitSelectData])

  useEffect(() => {
    async function fetchCreditNoteNo() {
      const data = await fetchMonthlyMaxCreditNoteNo(BusinesssUnitID)
      method.setValue("BusinessUnitID", BusinesssUnitID)
      method.setValue("VoucherNo", data.data[0]?.VoucherNo)
      method.setValue(
        "SessionBasedVoucherNo",
        data.data[0]?.SessionBasedVoucherNo
      )
    }

    if (BusinesssUnitID !== 0 && mode === "new") {
      fetchCreditNoteNo()
    }
  }, [BusinesssUnitID, mode])

  const method = useFormContext()

  return (
    <>
      <FormColumn lg={2} xl={2} md={6}>
        <FormLabel>
          Business Unit
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>

        <div>
          <CDropdown
            control={method.control}
            name={`BusinessUnitID`}
            optionLabel="BusinessUnitName"
            optionValue="BusinessUnitID"
            placeholder="Select a business unit"
            options={BusinessUnitSelectData}
            disabled={mode === "view"}
            required={true}
            focusOptions={() => method.setFocus("DocumentNo")}
            onChange={(e) => {
              setBusinessUnitID(e.value)
            }}
          />
        </div>
      </FormColumn>
      <FormColumn lg={2} xl={2} md={6}>
        <FormLabel>Debit Note No(Monthly)</FormLabel>

        <div>
          <TextInput
            control={method.control}
            ID={"VoucherNo"}
            isEnable={false}
          />
        </div>
      </FormColumn>
      <FormColumn lg={2} xl={2} md={6}>
        <FormLabel>Debit Note No(Yearly)</FormLabel>

        <div>
          <TextInput
            control={method.control}
            ID={"SessionBasedVoucherNo"}
            isEnable={false}
          />
        </div>
      </FormColumn>
      <FormColumn lg={2} xl={2} md={6}>
        <FormLabel>Document No</FormLabel>

        <div>
          <TextInput
            control={method.control}
            ID={"DocumentNo"}
            isEnable={mode !== "view"}
          />
        </div>
      </FormColumn>
    </>
  )
}

// New Detail Header Form
function CreditNoteDetailHeaderForm({ appendSingleRow }) {
  const method = useForm({
    defaultValues: {
      BalanceAmount: "",
      Amount: 0,
      Description: "",
    },
  })

  function onSubmit(data) {
    appendSingleRow(data)
    method.reset()
  }

  return (
    <>
      <form>
        <FormRow>
          <FormProvider {...method}>
            <DetailHeaderBusinessUnitDependents />
          </FormProvider>
        </FormRow>
        <FormRow>
          <FormColumn lg={9} xl={9}>
            <FormLabel>Description</FormLabel>
            <TextAreaField
              control={method.control}
              name={"Description"}
              autoResize={true}
            />
          </FormColumn>
          <FormColumn lg={3} xl={3} md={6}>
            <FormLabel></FormLabel>
            <DetailHeaderActionButtons
              handleAdd={() => method.handleSubmit(onSubmit)()}
              handleClear={() => method.reset()}
            />
          </FormColumn>
        </FormRow>
      </form>
    </>
  )
}

function DetailHeaderBusinessUnitDependents() {
  const { data: BusinessUnitSelectData } = useQuery({
    queryKey: [QUERY_KEYS.BUSINESS_UNIT_QUERY_KEY],
    queryFn: fetchAllBusinessUnitsForSelect,
    initialData: [],
  })

  const method = useFormContext()

  return (
    <>
      <FormColumn lg={3} xl={3} md={6} className="col-3">
        <FormLabel>
          Business Unit
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>

        <div>
          <CDropdown
            control={method.control}
            name={`BusinessUnitID`}
            optionLabel="BusinessUnitName"
            optionValue="BusinessUnitID"
            placeholder="Select a business unit"
            options={BusinessUnitSelectData}
            required={true}
            focusOptions={() => method.setFocus("Amount")}
          />
        </div>
      </FormColumn>
      <FormColumn lg={3} xl={3} md={6}>
        <FormLabel>
          Balance
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>

        <div>
          <CNumberInput
            control={method.control}
            name="BalanceAmount"
            disabled={true}
          />
        </div>
      </FormColumn>
      <FormColumn lg={3} xl={3} md={6}>
        <FormLabel>
          Amount
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>

        <div>
          <NumberInput control={method.control} id={"Amount"} required={true} />
        </div>
      </FormColumn>
    </>
  )
}

const CreditNoteDetailTable = React.forwardRef(
  ({ mode, BusinessUnitSelectData }, ref) => {
    const method = useFormContext()

    const { fields, append, remove } = useFieldArray({
      control: method.control,
      name: "CreditNoteDetail",
      rules: {
        required: true,
      },
    })

    React.useImperativeHandle(ref, () => ({
      appendSingleRow(data) {
        append(data)
      },
      removeAllRows() {
        remove()
      },
    }))

    return (
      <div className="overflow-x-auto">
        <table className="table table-responsive mt-2">
          <thead>
            <tr>
              <th
                className="p-2 text-white text-center "
                style={{ width: "2%", background: ddDetailColor }}
              >
                Sr No.
              </th>
              <th
                className="p-2 text-white text-center "
                style={{ width: "5%", background: ddDetailColor }}
              >
                Business Unit
              </th>

              <th
                className="p-2 text-white text-center "
                style={{ width: "4%", background: ddDetailColor }}
              >
                Balance
              </th>

              <th
                className="p-2 text-white text-center "
                style={{ width: "4%", background: ddDetailColor }}
              >
                Amount
              </th>

              <th
                className="p-2 text-white text-center "
                style={{ width: "10%", background: ddDetailColor }}
              >
                Description
              </th>
              <th
                className="p-2 text-white text-center "
                style={{ width: "4%", background: ddDetailColor }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <FormProvider {...method}>
              {fields.map((item, index) => {
                return (
                  <CreditNoteDetailTableRow
                    key={item.id}
                    item={item}
                    index={index}
                    disable={mode === "view"}
                    BusinessUnitSelectData={BusinessUnitSelectData}
                    remove={remove}
                  />
                )
              })}
            </FormProvider>
          </tbody>
        </table>
      </div>
    )
  }
)

function CreditNoteDetailTableRow({
  item,
  index,
  BusinessUnitSelectData,
  remove,
  disable = false,
}) {
  const method = useFormContext()

  return (
    <>
      <tr key={item.id}>
        <td>
          <input
            id="RowID"
            readOnly
            className="p-inputtext w-full"
            style={{ padding: "0.25rem 0.4rem", fontSize: "0.9em" }}
            value={index + 1}
            disabled={disable}
          />
        </td>
        <td>
          <CDropdown
            control={method.control}
            options={BusinessUnitSelectData}
            name={`CreditNoteDetail.${index}.BusinessUnitID`}
            placeholder="Select a business unit"
            optionLabel="BusinessUnitName"
            optionValue="BusinessUnitID"
            required={true}
            showOnFocus={true}
            disabled={disable}
          />
        </td>

        <td>
          <CNumberInput
            name={`CreditNoteDetail.${index}.Balance`}
            control={method.control}
            enterKeyOptions={() =>
              method.setFocus(`CreditNoteDetail.${index}.Amount`)
            }
            disabled={disable}
          />
        </td>
        <td>
          <CNumberInput
            name={`CreditNoteDetail.${index}.Amount`}
            control={method.control}
            enterKeyOptions={() =>
              method.setFocus(`CreditNoteDetail.${index}.Description`)
            }
            required={true}
            disabled={disable}
          />
        </td>

        <td>
          <TextAreaField
            control={method.control}
            name={`DebitNoteDetail.${index}.Description`}
            autoResize={false}
            disabled={disable}
          />
        </td>
        <td>
          <Button
            icon="pi pi-minus"
            severity="danger"
            size="sm"
            type="button"
            style={{
              padding: "0.25rem .7rem",
              borderRadius: "16px",
              fontSize: "0.9em",
            }}
            onClick={() => remove(index)}
          />
        </td>
      </tr>
    </>
  )
}

// Total
function CreditNoteDetailTotal() {
  const method = useFormContext()

  const details = useWatch({
    control: method.control,
    name: "CreditNoteDetail",
  })

  useEffect(() => {
    calculateTotal(details)
  }, [details])

  function calculateTotal(details) {
    let total = details?.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.Amount)
    }, 0)
    method.setValue("TotalNetAmount", total)
  }

  return null
}
