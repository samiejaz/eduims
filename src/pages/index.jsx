// export { default as AppConfiguration } from "./AppConfiguration/AppConfguration"
// export { default as CompanyInfo } from "./CompanyInfo/CompanyInfo"

// // Configuration
// export { default as UserRights } from "./UserRights/UserRightsInfo"

// // General Routes
// export { default as BankAccountOpening } from "./BankAccountOpening/BankAccountOpening"
// export { default as Country } from "./Country/Country"
// export { default as Tehsil } from "./Tehsil/Tehsil"
// export { default as Businessunit } from "./BusinessUnits/BusinessUnits"
// export { default as BusinessNature } from "./BusinessNature/BusinessNature"
// export { default as BusinessSegment } from "./BusinessSegment/BusinessSegment"
// export { default as BusinessType } from "./BusinessType/BusinessType"
// export { default as Session } from "./SessionInfo/SessionInfo"

// // User Routes
// export { default as Users } from "./GenUsers/Users"
// export { default as Departments } from "./Departments/Department"
// export { default as Customers } from "./CustomerEntry/GenCustomerEntry"
// export { default as OldCustomers } from "./GenOldCustomers/GenOldCustomerEntry"

// // Account Routes
// export { default as CustomerInvoice } from "./CustomerInvoice/NewCustomerInvoice"
// export { default as ReceiptVoucher } from "./RecieptEntry/RecieptEntry"
// export { default as CreditNote } from "./CreditNote/CreditNote"
// export { default as DebitNote } from "./DebitNote/DebitNode"

// // Util
// export { default as ProductCategory } from "./ProductCategory/ProductCategory"
// export { default as Product } from "./ProductInfo/ProductInfo"

// // Leads
// export { default as LeadIntroduction } from "./LeadsIntroduction/LeadsIntroduction"
// export { default as LeadSource } from "./LeadSource/LeadSource"
// Import using lazyImport
import React, { lazy, Suspense } from "react"

const lazyImport = (importFunction) => {
  const LazyComponent = lazy(importFunction)

  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const AppConfiguration = lazyImport(
  () => import("./AppConfiguration/AppConfguration")
)
export const CompanyInfo = lazyImport(() => import("./CompanyInfo/CompanyInfo"))
export const BankAccountOpening = lazyImport(
  () => import("./BankAccountOpening/BankAccountOpening")
)
export const Country = lazyImport(() => import("./Country/Country"))
export const Tehsil = lazyImport(() => import("./Tehsil/Tehsil"))
export const Businessunit = lazyImport(
  () => import("./BusinessUnits/BusinessUnits")
)
export const BusinessNature = lazyImport(
  () => import("./BusinessNature/BusinessNature")
)
export const BusinessSegment = lazyImport(
  () => import("./BusinessSegment/BusinessSegment")
)
export const BusinessType = lazyImport(
  () => import("./BusinessType/BusinessType")
)
export const Session = lazyImport(() => import("./SessionInfo/SessionInfo"))
export const Users = lazyImport(() => import("./GenUsers/Users"))
export const Departments = lazyImport(() => import("./Departments/Department"))
export const Customers = lazyImport(
  () => import("./CustomerEntry/GenCustomerEntry")
)
export const OldCustomers = lazyImport(
  () => import("./GenOldCustomers/GenOldCustomerEntry")
)
export const CustomerInvoice = lazyImport(
  () => import("./CustomerInvoice/NewCustomerInvoice")
)
export const ReceiptVoucher = lazyImport(
  () => import("./RecieptEntry/RecieptEntry")
)
export const CreditNote = lazyImport(() => import("./CreditNote/CreditNote"))
export const DebitNote = lazyImport(() => import("./DebitNote/DebitNode"))
export const ProductCategory = lazyImport(
  () => import("./ProductCategory/ProductCategory")
)
export const Product = lazyImport(() => import("./ProductInfo/ProductInfo"))
export const LeadIntroduction = lazyImport(
  () => import("./LeadsIntroduction/LeadsIntroduction")
)
export const LeadSource = lazyImport(() => import("./LeadSource/LeadSource"))
export const UserRights = lazyImport(
  () => import("./UserRights/UserRightsInfo")
)
export const SupplierInfoPage = lazyImport(
  () => import("./SupplierInfo/SupplierInfo")
)

export const PendingInvoicesDetailPage = lazyImport(
  () => import("./Dashboard/pages/PendingInvoicesDetail")
)
export const PendingReceiptsDetailPage = lazyImport(
  () => import("./Dashboard/pages/PendingReceiptsDetail")
)
export const DevelopmentTasksManagementPage = lazyImport(
  () => import("./DevelopmentTasksManagement/DevelopmentTasksManagement")
)

export const PendingDiscussionTasksPage = lazyImport(
  () => import("./DevelopmentTasksManagement/PendingDiscussionTasks")
)
