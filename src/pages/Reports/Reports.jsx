import React from "react"
import { Route, Routes } from "react-router-dom"
import { ReportRightsWrapper } from "../../components/Wrappers/wrappers"
import { MENU_KEYS, ROUTE_URLS } from "../../utils/enums"
import {
  BusinessUnitAndBalanceWiseAccountLedgersReprot,
  AccountLedgerReport,
  SubsidiarySheetReport,
  SubsidiarySheetSummary,
  CustomerAgingReport,
  LeadInformationReport,
} from "./index"

const Reports = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_URLS.REPORTS.ACCOUNT_LEDGER_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={MENU_KEYS.REPORTS.ACCOUNT_LEDGER_REPORT_FORM_KEY}
            ReportComponent={AccountLedgerReport}
          />
        }
      />
      <Route
        path={ROUTE_URLS.REPORTS.BUSINESS_UNIT_AND_BALANCE_LEDGER_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={
              MENU_KEYS.REPORTS.BUSINESS_UNIT_AND_BALANCE_LEDGER_REPORT_FORM_KEY
            }
            ReportComponent={BusinessUnitAndBalanceWiseAccountLedgersReprot}
          />
        }
      />
      <Route
        path={ROUTE_URLS.REPORTS.SUBSIDIARY_SHEET_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={MENU_KEYS.REPORTS.SUBSIDIARY_REPORT_FORM_KEY}
            ReportComponent={SubsidiarySheetReport}
          />
        }
      />
      <Route
        path={ROUTE_URLS.REPORTS.SUBSIDIARY_SHEET_SUMMARY_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={MENU_KEYS.REPORTS.SUBSIDIARY_REPORT_FORM_KEY}
            ReportComponent={SubsidiarySheetSummary}
          />
        }
      />
      <Route
        path={ROUTE_URLS.REPORTS.CUSTOMER_AGING_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={MENU_KEYS.REPORTS.CUSTOMER_AGING_FORM_KEY}
            ReportComponent={CustomerAgingReport}
          />
        }
      />
      <Route
        path={ROUTE_URLS.REPORTS.LEADS_INFORMATION_REPORT_ROUTE.replaceAll(
          "/reports",
          ""
        )}
        element={
          <ReportRightsWrapper
            menuKey={MENU_KEYS.REPORTS.LEADS_INFORMATION_FORM_KEY}
            ReportComponent={LeadInformationReport}
          />
        }
      />
    </Routes>
  )
}

export default Reports
