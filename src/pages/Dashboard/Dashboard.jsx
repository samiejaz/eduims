import React from "react"
import { FormColumn, FormRow } from "../../components/Layout/LayoutComponents"
import { Link } from "react-router-dom"
import PendingInvoiceCardSection from "./components/PendingInvoiceCardSection"
import { useAppConfigurataionProvider } from "../../context/AppConfigurationContext"
import SupplierAnalysisSection from "./components/SupplierAnalysisSection"
import QuickActionSections from "./components/QuickActionSections"
import CustomerAnalysisSection from "./components/CustomerAnalysisSection"
import { SalesPercentageCard } from "./components/AmountPercentageCards"
import SaleAndReceiptsPercentageSections from "./components/SaleAndReceiptsPercentageSections"

function Dashboard() {
  document.title = "Dashboard"

  return (
    <div className="flex flex-column gap-1 mt-4">
      <div className="w-full">
        {/* <div className="flex align-items-center justify-content-between">
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <hr /> */}
        <LinksContainer />
      </div>
    </div>
  )
}

const LinkCard = ({ item, icon, textColor, backGroundColor }) => {
  return (
    <>
      {item?.menuKey && (
        <>
          <Link to={item?.routeUrl}>
            <div
              className="flex align-items-center justify-content-center flex-col p-5 rounded scaleOnHover"
              style={{
                minHeight: "10rem",
                maxHeight: "10rem",
                background: backGroundColor,
              }}
            >
              <div className="text-center flex align-items-center flex-column  gap-3 ">
                <div>
                  <img
                    src={icon}
                    alt="Dashboard Cards"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="fw-bold"
                    style={{
                      color: textColor,
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {item?.menuName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  )
}

const LinksContainer = () => {
  const { userConfigData } = useAppConfigurataionProvider()

  function renderCounters() {
    if (userConfigData.data?.ShowAccountAnalysisOnMainDashboard == true) {
      return (
        <FormRow>
          <FormColumn xl={6} lg={6} md={12}>
            <div className="flex flex-column gap-2 h-full w-full">
              <div className="flex-1 flex flex-column gap-2 py-2">
                <QuickActionSections />
                <SaleAndReceiptsPercentageSections />
              </div>
            </div>
          </FormColumn>
          <FormColumn xl={6} lg={6} md={12}>
            <div className="flex flex-column gap-2">
              <CustomerAnalysisSection />
              <SupplierAnalysisSection />
            </div>
          </FormColumn>
        </FormRow>
      )
    }
  }

  return (
    <>
      {/* <FormRow>
        {originalRoutes.find((item) => item.menuKey === "mnuCustomers")
          ?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuCustomers"
                )}
                icon={CustomerIcon}
                backGroundColor={"#ECF2FF"}
                textColor={"#5D87FF"}
              />
            </FormColumn>
          </>
        )}
        {originalRoutes.find((item) => item.menuKey === "mnuNewCustomerInvoice")
          ?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuNewCustomerInvoice"
                )}
                icon={InvoiceIcon}
                backGroundColor={"#EAF6FF"}
                textColor={"#49BEFF"}
              />
            </FormColumn>
          </>
        )}
        {originalRoutes.find((item) => item.menuKey === "mnuLeadsDashboard")
          ?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuLeadsDashboard"
                )}
                icon={LeadsDashboardIcon}
                backGroundColor={"#FDEDE8"}
                textColor={"#FA8B6E"}
              />
            </FormColumn>
          </>
        )}
        {originalRoutes.find((item) => item.menuKey === "mnuLeadIntroduction")
          ?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuLeadIntroduction"
                )}
                icon={NewLeadEntryIcon}
                backGroundColor={"#FEF5E5"}
                textColor={"#FFAE1F"}
              />
            </FormColumn>
          </>
        )}
        {originalRoutes.find((item) => item.menuKey === "mnuRecieptVoucher")
          ?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuRecieptVoucher"
                )}
                icon={ReceiptIcon}
                backGroundColor={"#fce1c7"}
                textColor={"#E67E22"}
              />
            </FormColumn>
          </>
        )}
        {originalRoutes.find(
          (item) => item.menuKey === "mnuAccountLedgerReport"
        )?.menuKey && (
          <>
            <FormColumn xl={2} lg={4} md={4}>
              <LinkCard
                item={originalRoutes.find(
                  (item) => item.menuKey === "mnuAccountLedgerReport"
                )}
                icon={LedgerIcon}
                backGroundColor={"#E6FFFA"}
                textColor={"#13DEB9"}
              />
            </FormColumn>
          </>
        )}
      </FormRow> */}
      {renderCounters()}
    </>
  )
}
export default Dashboard
