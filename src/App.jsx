import { Route, Routes, useNavigate } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes"
import React, { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import SignUp from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import {
  AppConfiguration,
  CompanyInfo,
  BankAccountOpening,
  Country,
  Tehsil,
  Businessunit,
  BusinessNature,
  BusinessSegment,
  Session,
  Users,
  Departments,
  CustomerInvoice,
  ReceiptVoucher,
  CreditNote,
  DebitNote,
  ProductCategory,
  Product,
  LeadIntroduction,
  LeadSource,
  UserRights,
  Customers,
  OldCustomers,
  BusinessType,
} from "./pages"

import { ROUTE_URLS } from "./utils/enums"

import signalRConnectionManager from "./services/SignalRService"

import { ConfirmDialog } from "primereact/confirmdialog"
import { useUserData } from "./context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { GetAllMenus } from "./api/MenusData"
import { useRoutesData } from "./context/RoutesContext"
import Reports from "./pages/Reports/reports"
import LeadsDashboardWrapper from "./pages/Leads/LeadsDashboard/LeadsDashboardWrapper"
import AdminPages from "./pages/Admin/AdminPages"
import { PrimeReactProvider } from "primereact/api"
import { useThemeProvider } from "./context/ThemeContext"
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  NO_GROUP,
} from "kbar"

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  border: "none",
  background: "var(--background)",
  color: "var(--foreground)",
}

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--background)",
  color: "var(--foreground)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
}

const groupNameStyle = {
  padding: "8px 16px",
  fontSize: "10px",
  textTransform: "uppercase",
  opacity: 0.5,
}

const App = () => {
  const { theme: mode } = useThemeProvider()
  const navigate = useNavigate()

  useEffect(() => {
    signalRConnectionManager.startConnection()
  }, [])

  const kbarActions = [
    // General
    {
      id: "country",
      name: "Country",
      keywords: "general country",
      perform: () => navigate(ROUTE_URLS.COUNTRY_ROUTE),
    },
    {
      id: "tehsil",
      name: "Tehsil",
      keywords: "general tehsil",
      perform: () => navigate(ROUTE_URLS.TEHSIL_ROUTE),
    },
    {
      id: "companyInfo",
      name: "Company Info",
      keywords: "general company info",
      perform: () => navigate(ROUTE_URLS.GENERAL.COMPANY_INFO_ROUTE),
    },
    {
      id: "businessUnit",
      name: "Business Unit",
      keywords: "general business unit",
      perform: () => navigate(ROUTE_URLS.GENERAL.BUSINESS_UNITS),
    },
    {
      id: "businessNature",
      name: "Business Nature",
      keywords: "general business nature",
      perform: () => navigate(ROUTE_URLS.BUSINESS_NATURE_ROUTE),
    },
    {
      id: "businessType",
      name: "Business Type",
      keywords: "general business type",
      perform: () => navigate(ROUTE_URLS.BUSINESS_TYPE),
    },
    {
      id: "businessSegments",
      name: "Business Segments",
      keywords: "general business segments",
      perform: () => navigate(ROUTE_URLS.BUSINESS_SEGMENT_ROUTE),
    },
    {
      id: "sessionInfo",
      name: "Session Info",
      keywords: "general session info",
      perform: () => navigate(ROUTE_URLS.GENERAL.SESSION_INFO),
    },
    {
      id: "productCategory",
      name: "Product Category",
      keywords: "utilities product category",
      perform: () => navigate(ROUTE_URLS.UTILITIES.PRODUCT_CATEGORY_ROUTE),
    },
    {
      id: "productInfo",
      name: "Product Info",
      keywords: "utilities product info",
      perform: () => navigate(ROUTE_URLS.UTILITIES.PRODUCT_INFO_ROUTE),
    },
    // Customers
    {
      id: "customerEntry",
      name: "Customer Entry",
      keywords: "customers entry",
      perform: () => navigate(ROUTE_URLS.CUSTOMERS.CUSTOMER_ENTRY),
    },
    {
      id: "oldCustomerEntry",
      name: "Old Customer Entry",
      keywords: "customers old entry",
      perform: () => navigate(ROUTE_URLS.CUSTOMERS.OLD_CUSTOMER_ENTRY),
    },
    // Users
    {
      id: "users",
      name: "Users",
      keywords: "users",
      perform: () => navigate(ROUTE_URLS.USER_ROUTE),
    },
    {
      id: "departments",
      name: "Departments",
      keywords: "users departments",
      perform: () => navigate(ROUTE_URLS.DEPARTMENT),
    },
    // Accounts
    {
      id: "bankAccountOpening",
      name: "Bank Account Opening",
      keywords: "accounts bank account",
      perform: () => navigate(ROUTE_URLS.ACCOUNTS.BANK_ACCOUNT_OPENING),
    },
    {
      id: "customerInvoice",
      name: "Customer Invoice",
      keywords: "accounts customer invoice",
      perform: () => navigate(ROUTE_URLS.ACCOUNTS.NEW_CUSTOMER_INVOICE),
    },
    {
      id: "receiptVoucher",
      name: "Receipt Voucher",
      keywords: "accounts receipt voucher",
      perform: () => navigate(ROUTE_URLS.ACCOUNTS.RECIEPT_VOUCHER_ROUTE),
    },
    {
      id: "debitNote",
      name: "Debit Note",
      keywords: "accounts debit note",
      perform: () => navigate(ROUTE_URLS.ACCOUNTS.DEBIT_NODE_ROUTE),
    },
    {
      id: "creditNote",
      name: "Credit Note",
      keywords: "accounts credit note",
      perform: () => navigate(ROUTE_URLS.ACCOUNTS.CREDIT_NODE_ROUTE),
    },
    // Utilities
    {
      id: "appConfiguration",
      name: "App Configuration",
      keywords: "utilities app configuration",
      perform: () => navigate(ROUTE_URLS.GENERAL.APP_CONFIGURATION_ROUTE),
    },
    {
      id: "userRights",
      name: "User Rights",
      keywords: "configuration user rights",
      perform: () => navigate(ROUTE_URLS.CONFIGURATION.USER_RIGHTS_ROUTE),
    },
    // Leads
    {
      id: "leadsDashboard",
      name: "Leads Dashboard",
      keywords: "leads dashboard",
      perform: () => navigate(ROUTE_URLS.LEADS.LEADS_DASHBOARD),
    },
    {
      id: "userDashboard",
      name: "User Dashboard",
      keywords: "leads user dashboard",
      perform: () => navigate(ROUTE_URLS.LEADS.LEADS_USER_DASHBOARD),
    },
    {
      id: "leadsIntroduction",
      name: "Leads Introduction",
      keywords: "leads introduction",
      perform: () => navigate(ROUTE_URLS.LEAD_INTRODUCTION_ROUTE),
    },
    {
      id: "leadsSource",
      name: "Leads Source",
      keywords: "leads source",
      perform: () => navigate(ROUTE_URLS.LEED_SOURCE_ROUTE),
    },
    // Reports
    {
      id: "customerLedger",
      name: "Customer Ledger",
      keywords: "reports customer ledger",
      perform: () => navigate(ROUTE_URLS.REPORTS.ACCOUNT_LEDGER_REPORT_ROUTE),
    },
    {
      id: "customerDetailLedger",
      name: "Customer Detail Ledger",
      keywords: "reports customer detail ledger",
      perform: () =>
        navigate(
          ROUTE_URLS.REPORTS.BUSINESS_UNIT_AND_BALANCE_LEDGER_REPORT_ROUTE
        ),
    },
    {
      id: "subsidarySheet",
      name: "Subsidary Sheet",
      keywords: "reports subsidary sheet",
      perform: () => navigate(ROUTE_URLS.REPORTS.SUBSIDIARY_SHEET_REPORT_ROUTE),
    },
  ]

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <InitMenuNames />
      {/* <KBarProvider
        actions={kbarActions}
        options={{
          enableHistory: true,
        }}
      >
        <CommandBar /> */}
      <Routes>
        <Route path="auth" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route
            path={ROUTE_URLS.GENERAL.APP_CONFIGURATION_ROUTE + "/*"}
            element={<AppConfiguration />}
          />

          {/* General Routes */}
          <Route path={`${ROUTE_URLS.COUNTRY_ROUTE}/*`} element={<Country />} />
          <Route path={`${ROUTE_URLS.TEHSIL_ROUTE}/*`} element={<Tehsil />} />
          <Route
            path={`${ROUTE_URLS.GENERAL.BUSINESS_UNITS}/*`}
            element={<Businessunit />}
          />
          <Route
            path={`${ROUTE_URLS.BUSINESS_NATURE_ROUTE}/*`}
            element={<BusinessNature />}
          />
          <Route
            path={`${ROUTE_URLS.BUSINESS_TYPE}/*`}
            element={<BusinessType />}
          />
          <Route
            path={`${ROUTE_URLS.BUSINESS_SEGMENT_ROUTE}/*`}
            element={<BusinessSegment />}
          />
          <Route
            path={`${ROUTE_URLS.GENERAL.SESSION_INFO}/*`}
            element={<Session />}
          />
          {/* General Routes END*/}
          {/* Users Routes*/}

          <Route path={`${ROUTE_URLS.USER_ROUTE}/*`} element={<Users />} />
          <Route
            path={`${ROUTE_URLS.DEPARTMENT}/*`}
            element={<Departments />}
          />
          <Route
            path={`${ROUTE_URLS.CUSTOMERS.CUSTOMER_ENTRY}/*`}
            element={<Customers />}
          />
          <Route
            path={`${ROUTE_URLS.CUSTOMERS.OLD_CUSTOMER_ENTRY}/*`}
            element={<OldCustomers />}
          />

          {/* Users Routes END*/}

          {/* Lead Routes */}
          <Route
            path={`${ROUTE_URLS.LEAD_INTRODUCTION_ROUTE}/*`}
            element={<LeadIntroduction />}
          />
          <Route
            path={`${ROUTE_URLS.LEED_SOURCE_ROUTE}/*`}
            element={<LeadSource />}
          />
          {/* Lead Routes END */}

          {/* Account Routes*/}
          <Route
            path={`${ROUTE_URLS.ACCOUNTS.BANK_ACCOUNT_OPENING}/*`}
            element={<BankAccountOpening />}
          />
          <Route
            path={`${ROUTE_URLS.ACCOUNTS.NEW_CUSTOMER_INVOICE}/*`}
            element={<CustomerInvoice />}
          />
          <Route
            path={`${ROUTE_URLS.ACCOUNTS.RECIEPT_VOUCHER_ROUTE}/*`}
            element={<ReceiptVoucher />}
          />
          <Route
            path={`${ROUTE_URLS.ACCOUNTS.CREDIT_NODE_ROUTE}/*`}
            element={<CreditNote />}
          />
          <Route
            path={`${ROUTE_URLS.ACCOUNTS.DEBIT_NODE_ROUTE}/*`}
            element={<DebitNote />}
          />
          {/* Account Routes END*/}

          {/* Utils Routes */}
          <Route
            path={`${ROUTE_URLS.UTILITIES.PRODUCT_CATEGORY_ROUTE}/*`}
            element={<ProductCategory />}
          />
          <Route
            path={`${ROUTE_URLS.UTILITIES.PRODUCT_INFO_ROUTE}/*`}
            element={<Product />}
          />

          {/* Utils Routes END */}

          {/* Configuration Routes*/}
          <Route
            path={`${ROUTE_URLS.CONFIGURATION.USER_RIGHTS_ROUTE}/*`}
            element={<UserRights />}
          />
          {/* Configuration Routes END */}

          <Route
            path={`${ROUTE_URLS.GENERAL.COMPANY_INFO_ROUTE}/*`}
            element={<CompanyInfo />}
          />

          <Route path="/*" element={<LeadsDashboardWrapper />} />
          {/* Leads End */}

          {/* Reports */}
          <Route path={`/reports/*`} element={<Reports />} />

          {/* Admin */}
          <Route path={`/admin/*`} element={<AdminPages />} />

          {/* Reports End */}
        </Route>
      </Routes>
      {/* </KBarProvider> */}

      <ConfirmDialog id="EditDeleteDialog" draggable={false} />
      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        theme={mode}
        closeOnClick
        autoClose={1500}
        containerId={"autoClose"}
      />
    </PrimeReactProvider>
  )
}

export default App

export function InitMenuNames() {
  const user = useUserData()
  const { setAuthorizedRoutes, setOriginalRoutes } = useRoutesData()

  const { data: AllowedMenus } = useQuery({
    queryKey: ["allowRoutes", user?.userID],
    queryFn: () => GetAllMenus({ LoginUserID: user?.userID }),
    enabled: user != null,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (AllowedMenus) {
      setAuthorizedRoutes(AllowedMenus.groupedRoutes)
      setOriginalRoutes(AllowedMenus.orignalRoutes)
    }
  }, [AllowedMenus])

  return null
}

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

function RenderResults() {
  const { results, rootActionId } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  )
}

const ResultItem = React.forwardRef(
  ({ action, active, currentRootActionId }, ref) => {
    const ancestors = React.useMemo(() => {
      if (!currentRootActionId) return action.ancestors
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      )

      return action.ancestors.slice(index + 1)
    }, [action.ancestors, currentRootActionId])

    return (
      <div
        ref={ref}
        style={{
          padding: "12px 16px",
          background: active ? "var(--a1)" : "transparent",
          borderLeft: `2px solid ${
            active ? "var(--foreground)" : "transparent"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          {action.icon && action.icon}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span
                      style={{
                        opacity: 0.5,
                        marginRight: 8,
                      }}
                    >
                      {ancestor.name}
                    </span>
                    <span
                      style={{
                        marginRight: 8,
                      }}
                    >
                      &rsaquo;
                    </span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
          >
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                style={{
                  padding: "4px 6px",
                  background: "rgba(0 0 0 / .1)",
                  borderRadius: "4px",
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    )
  }
)

function HomeIcon() {
  return (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m19.681 10.406-7.09-6.179a.924.924 0 0 0-1.214.002l-7.06 6.179c-.642.561-.244 1.618.608 1.618.51 0 .924.414.924.924v5.395c0 .51.414.923.923.923h3.236V14.54c0-.289.234-.522.522-.522h2.94c.288 0 .522.233.522.522v4.728h3.073c.51 0 .924-.413.924-.923V12.95c0-.51.413-.924.923-.924h.163c.853 0 1.25-1.059.606-1.62Z"
        fill="var(--foreground)"
      />
    </svg>
  )
}
