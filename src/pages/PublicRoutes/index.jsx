import { Route, Routes } from "react-router-dom"
import { ROUTE_URLS } from "../../utils/enums"
import { CustomerInvoiceFormCompoent } from "../CustomerInvoice/NewCustomerInvoice"
import { ReceiptEntryFormComponent } from "../RecieptEntry/RecieptEntry"

const PublicePageWrapper = ({ children }) => {
  return <div className="px-4 py-2">{children}</div>
}

export default function PublicPages() {
  return (
    <Routes>
      <Route
        path={`${ROUTE_URLS.PUBLIC.CUSTOMER_INVOICE_ROUTE.replaceAll(
          "/pub",
          ""
        )}/:CustomerInvoiceID`}
        element={
          <PublicePageWrapper>
            <CustomerInvoiceFormCompoent
              mode={"view"}
              userRights={[
                {
                  RoleEdit: false,
                  RoleDelete: false,
                  RoleNew: false,
                  RolePrint: false,
                  ShowForm: true,
                },
              ]}
              isPublicRoute={true}
            />
          </PublicePageWrapper>
        }
      />
      <Route
        path={`${ROUTE_URLS.PUBLIC.RECEIPT_VOUCHER_ROUTE.replaceAll(
          "/pub",
          ""
        )}/:ReceiptVoucherID`}
        element={
          <PublicePageWrapper>
            <ReceiptEntryFormComponent
              mode={"view"}
              userRights={[
                {
                  RoleEdit: false,
                  RoleDelete: false,
                  RoleNew: false,
                  RolePrint: false,
                  ShowForm: true,
                },
              ]}
              isPublicRoute={true}
            />
          </PublicePageWrapper>
        }
      />
    </Routes>
  )
}
