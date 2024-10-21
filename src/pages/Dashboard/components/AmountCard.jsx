import { classNames } from "primereact/utils"
import React from "react"

const AmountCard = ({
  icon,
  amount,
  title = "",
  count,
  currency,
  variant = "green",
  onClick = () => null,
  loading = false,
}) => {
  //   const variants = {
  //     green: "bg-teal-200 text-teal-800",
  //     orange: "bg-orange-200 text-orange-800",
  //     yellow: "bg-yellow-200 text-yellow-800",
  //     purple: "bg-indigo-200 text-indigo-800",
  //     pink: "bg-pink-200 text-pink-800",
  //   }
  const iconVariants = {
    green: "text-teal-200 bg-teal-800",
    orange: "text-orange-200 bg-orange-800",
    yellow: "text-yellow-200 bg-yellow-800",
    purple: "text-indigo-200 bg-indigo-800",
    pink: "text-pink-200 bg-pink-800",
  }
  const shadow = "shadow-lg"

  return (
    <div
      onClick={onClick}
      className={classNames(
        `flex justify-content-between align-items-center px-2 py-2 w-full border-round-lg cursor-pointer h-opacity`,
        "text-black bg-white shadow-1",
        shadow
      )}
    >
      <div className="flex flex-column gap-2">
        <h4 className="text-md">{title}</h4>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span className="text-sm">
            {currency} {amount}
          </span>
        )}
        <span className="text-sm">
          Count: {loading ? <span>Loading...</span> : <span>{count}</span>}
        </span>
      </div>
      <span
        className={classNames(
          "p-3 border-round-lg",
          icon,
          iconVariants[variant]
        )}
      ></span>
    </div>
  )
}

export default AmountCard
