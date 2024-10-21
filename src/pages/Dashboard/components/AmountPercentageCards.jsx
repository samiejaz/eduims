import { classNames } from "primereact/utils"
import React from "react"

export const SalesPercentageCard = ({
  currency = "PKR",
  amount,
  percentage,
  title,
  loading = false,
  count,
}) => {
  const percentage_class = classNames("font-semibold", {
    "text-red-700": percentage < 0,
    "text-teal-700": percentage > 0,
  })

  return (
    <div className="p-3 w-full flex flex-column gap-2 border-round-lg shadow-2 h-5rem bg-white">
      <div className="flex align-items-center justify-content-between gap-2 w-full">
        <div className="flex align-items-center gap-4">
          <h3>{!loading ? `${currency} ${amount}` : "Loading..."}</h3>
          <div className="flex align-items-center gap-1">
            <span className={percentage_class}>
              {!loading ? `${percentage}%` : "Loading..."}
            </span>
            <i
              className={classNames("pi", {
                "text-red-700 pi-angle-down": percentage < 0,
                "text-teal-700 pi-angle-up": percentage > 0,
                "pi-spin pi-spinner": loading,
              })}
            ></i>
          </div>
        </div>
        <i className="pi pi-dollar"></i>
      </div>
      <div>
        <span>{title}</span> <span className="text-blue-700">({count})</span>
      </div>
    </div>
  )
}
