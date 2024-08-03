import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import {
  fetchAllCustomerAccountsForSelect,
  fetchAllOldCustomersForSelect,
} from "../../../api/SelectData"
import { QUERY_KEYS } from "../../../utils/enums"
import {
  FormColumn,
  FormLabel,
} from "../../../components/Layout/LayoutComponents"
import {
  CDropDownField,
  CMultiSelectField,
} from "../../../components/Forms/form"

export const CustomerAndLedgerComponent = ({
  isCustomerRequired = true,
  isLedgerRequired = false,
  showCustomerClearIcon = false,
}) => {
  const method = useFormContext()
  const [CustomerID, setCustomerID] = useState(0)

  const { data: customerSelectData } = useQuery({
    queryKey: [QUERY_KEYS.ALL_CUSTOMER_QUERY_KEY],
    queryFn: fetchAllOldCustomersForSelect,
    refetchOnWindowFocus: false,
    staleTime: 600000,
    refetchInterval: 600000,
  })

  const { data: CustomerAccounts } = useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_ACCOUNTS_QUERY_KEY, CustomerID],
    queryFn: () => fetchAllCustomerAccountsForSelect(CustomerID),
    refetchOnWindowFocus: false,
    staleTime: 600000,
    refetchInterval: 600000,
  })

  return (
    <>
      <FormColumn lg={4} xl={4} md={12}>
        <FormLabel style={{ fontSize: "14px", fontWeight: "bold" }}>
          Customer
          <span className="text-red-700 fw-bold ">*</span>
        </FormLabel>
        <div>
          <CDropDownField
            control={method.control}
            name={`CustomerID`}
            optionLabel="CustomerName"
            optionValue="CustomerID"
            placeholder="Select a customer"
            options={customerSelectData}
            focusOptions={() => method.setFocus("AccountID")}
            required={isCustomerRequired}
            showClear={showCustomerClearIcon}
            onChange={(e) => {
              setCustomerID(e.value)
            }}
          />
        </div>
      </FormColumn>
      <FormColumn lg={4} xl={4} md={12}>
        <FormLabel>Ledger</FormLabel>
        <div>
          <CMultiSelectField
            control={method.control}
            name={`AccountID`}
            optionLabel="AccountTitle"
            optionValue="AccountID"
            placeholder="Select an account"
            options={CustomerAccounts}
            required={isLedgerRequired}
          />
        </div>
      </FormColumn>
    </>
  )
}
