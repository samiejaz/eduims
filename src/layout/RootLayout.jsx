import { Outlet } from "react-router-dom"

import CSidebar, { SignOut } from "./Sidebar/CSidebar"
import { useContext, useEffect, useRef } from "react"

import useKeyCombination from "../hooks/useKeyCombinationHook"
import useUserProfile from "../hooks/useUserProfile"
import { useCheckDeviceHook } from "../hooks/hooks"
import { useThemeProvider } from "../context/ThemeContext"
import { PrimeReactContext } from "primereact/api"

function RootLayout() {
  const sidebarRef = useRef()
  const searchInputRef = useRef()

  const { isMobileScreen } = useCheckDeviceHook()

  useKeyCombination(
    () => {
      toggleSideBar(true)
    },
    "l",
    true
  )

  function toggleSideBar(openSideBarOnly = false) {
    if (!openSideBarOnly) {
      if (sidebarRef.current.className.includes("c-close")) {
        sidebarRef.current.className = "c-sidebar"
        searchInputRef.current?.focus()
        localStorage.setItem("isSidebarOpen", true)
      } else {
        sidebarRef.current.className = "c-sidebar c-close"
        localStorage.removeItem("isSidebarOpen")
      }
    } else {
      if (sidebarRef.current.className.includes("c-close")) {
        sidebarRef.current.className = "c-sidebar"
        searchInputRef.current?.focus()
        localStorage.setItem("isSidebarOpen", true)
      } else {
        searchInputRef.current?.focus()
      }
    }
  }

  function handleMobileToggleSidebar() {
    sidebarRef.current.className = "c-sidebar a-sidebar"
  }

  return (
    <>
      <div>
        <CSidebar
          sideBarRef={sidebarRef}
          searchInputRef={searchInputRef}
        ></CSidebar>

        <section className={`${isMobileScreen ? "w-full" : "c-home-section"}`}>
          <div className="c-home-content">
            <Header
              toggleSidebar={toggleSideBar}
              handleMobileToggleSidebar={handleMobileToggleSidebar}
            />
          </div>
          <div className="px-3 mt-4">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  )
}

function Header({ toggleSidebar, handleMobileToggleSidebar }) {
  const { isMobileScreen } = useCheckDeviceHook()
  const { handleShowProfile, render } = useUserProfile()
  const { setTheme, theme } = useThemeProvider()

  const { changeTheme } = useContext(PrimeReactContext)

  const changeMyTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    changeTheme(`lara-${theme}-green`, `lara-${newTheme}-green`, "app-theme")
    localStorage.setItem("activeTheme", theme)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="mt-4 px-4 lg:px-0 xl:px-0 md:px-0"
      >
        {!isMobileScreen ? (
          <>
            <i
              className="pi pi-bars hoverIcon"
              onClick={() => {
                toggleSidebar()
              }}
            ></i>
          </>
        ) : (
          <i
            className="pi pi-bars hoverIcon"
            onClick={() => {
              handleMobileToggleSidebar()
            }}
          ></i>
        )}
        <div className="flex align-items-center gap-4">
          <TriggerShortcutButton theme={theme} />
          <i
            className="pi pi-user hoverIcon"
            onClick={() => {
              handleShowProfile()
            }}
          ></i>
          <SignOut />
          <i
            className={`pi pi-${theme === "dark" ? "sun" : "moon"} hoverIcon`}
            onClick={() => {
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
              changeMyTheme()
            }}
          ></i>
        </div>
      </div>
      {render}
    </>
  )
}

const TriggerShortcutButton = ({ theme }) => {
  const triggerCtrlK = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(event)
  }

  return (
    <div
      className="py-1 pr-4 pl-2 rounded flex"
      style={{
        background: theme === "dark" ? "#111827" : "#EFEFEF",
        fontFamily: "cursive",
        alignItems: "center",
      }}
      onClick={triggerCtrlK}
    >
      <div>
        <i className="pi pi-search mr-2"></i>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: theme === "dark" ? "white" : "inherit",
        }}
      >
        <span>Search</span>
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>Ctrl + k</span>
      </div>
    </div>
  )
}

export default RootLayout
