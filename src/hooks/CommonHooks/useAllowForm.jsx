import React from "react"

const useAllowForm = (condition) => {
  if (condition == false) {
    return (
      <div className="flex align-items-center justify-content-center w-full min-h-90vh">
        <span>404 Not Found!</span>
      </div>
    )
  }
}

export default useAllowForm
