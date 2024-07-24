import React from "react"
import ReactDOM from "react-dom/client"
import App, { InitMenuNames } from "./App.jsx"

import "primeicons/primeicons.css"
import "primereact/resources/primereact.css"
import "react-toastify/dist/ReactToastify.css"
import "/node_modules/primeflex/primeflex.css"
import "./index.css"
import "./App.css"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { AuthProvier } from "./context/AuthContext"

import { BrowserRouter } from "react-router-dom"
import { AppConfigurationProivder } from "./context/AppConfigurationContext.jsx"
import { UserRightsProivder } from "./context/UserRightContext.jsx"
import { RoutesProivder } from "./context/RoutesContext.jsx"
import { ThemeProivder } from "./context/ThemeContext.jsx"
import { ShowErrorToast } from "./utils/CommonFunctions.jsx"
import { ErrorBoundary } from "react-error-boundary"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (e) => {
        ShowErrorToast(e.message)
      },
    },
  },
})

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div
      className="flex align-items-center justify-content-center h-screen text-white font-bold text-4xl"
      style={{ background: "red" }}
    >
      <h1>Oops! Something went wrong.</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvier>
          <RoutesProivder>
            <InitMenuNames>
              <UserRightsProivder>
                <AppConfigurationProivder>
                  <ThemeProivder>
                    <ErrorBoundary
                      fallbackRender={fallbackRender}
                      onReset={(details) => {}}
                    >
                      <App />
                    </ErrorBoundary>
                  </ThemeProivder>
                </AppConfigurationProivder>
              </UserRightsProivder>
            </InitMenuNames>
          </RoutesProivder>
        </AuthProvier>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
