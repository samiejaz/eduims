import React from "react"
import { useRoutesData } from "../../../context/RoutesContext"
import CustomerIcon from "../../../assets/new.png"
import { Link } from "react-router-dom"
import InvoiceIcon from "../../../assets/invoice.png"
import LeadsDashboardIcon from "../../../assets/speedometer.png"
import LedgerIcon from "../../../assets/payment.png"
import NewLeadEntryIcon from "../../../assets/leading.png"
import ReceiptIcon from "../../../assets/receipt.png"

const QuickActionSections = () => {
  const { originalRoutes } = useRoutesData()
  return (
    <div className="bg-white border-round-lg py-2 px-3 shadow-2">
      <span className="w-full inline-block text-3xl text-center font-bold">
        QUICK ACTIONS
      </span>
      <div className="flex gap-4 flex-wrap mt-1">
        <LinkCard
          item={originalRoutes.find((item) => item.menuKey === "mnuCustomers")}
          icon={CustomerIcon}
          backGroundColor={"#ECF2FF"}
          textColor={"#5D87FF"}
        />
        <LinkCard
          item={originalRoutes.find(
            (item) => item.menuKey === "mnuNewCustomerInvoice"
          )}
          icon={InvoiceIcon}
          backGroundColor={"#EAF6FF"}
          textColor={"#49BEFF"}
        />
        <LinkCard
          item={originalRoutes.find(
            (item) => item.menuKey === "mnuLeadsDashboard"
          )}
          icon={LeadsDashboardIcon}
          backGroundColor={"#FDEDE8"}
          textColor={"#FA8B6E"}
        />
        <LinkCard
          item={originalRoutes.find(
            (item) => item.menuKey === "mnuLeadIntroduction"
          )}
          icon={NewLeadEntryIcon}
          backGroundColor={"#FEF5E5"}
          textColor={"#FFAE1F"}
        />
        <LinkCard
          item={originalRoutes.find(
            (item) => item.menuKey === "mnuRecieptVoucher"
          )}
          icon={ReceiptIcon}
          backGroundColor={"#fce1c7"}
          textColor={"#E67E22"}
        />
        <LinkCard
          item={originalRoutes.find(
            (item) => item.menuKey === "mnuAccountLedgerReport"
          )}
          icon={LedgerIcon}
          backGroundColor={"#E6FFFA"}
          textColor={"#13DEB9"}
        />
      </div>
    </div>
  )
}

export default QuickActionSections

const LinkCard = ({ item, icon, textColor, backGroundColor }) => {
  return (
    <>
      {item?.menuKey && (
        <>
          <Link to={item?.routeUrl} style={{ flex: "40%", display: "block" }}>
            <div
              className="flex align-items-center justify-content-center flex-col px-5 py-3 rounded scaleOnHover"
              style={{
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
