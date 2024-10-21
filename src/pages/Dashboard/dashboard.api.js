import axios from "axios"
import { formatDateWithSymbol } from "../../utils/CommonFunctions"

const apiUrl = import.meta.env.VITE_APP_API_URL

const CONTROLLER = "data_Dashboard"

export const GetToInvoiceCountData = async ({ LoginUserID }) => {
  let dataToReturn = {
    message: "",
    success: false,
    LastWeekCustomerBalance: 0,
    LastWeekCustomerCount: 0,
    LastMonthCustomerBalance: 0,
    LastMonthCustomerCount: 0,
    OverallCustomerBalance: 0,
    OverallCustomerCount: 0,
  }

  try {
    let dataToSend = {
      CurrentDate: formatDateWithSymbol(new Date()),
    }
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetToInvoiceCountData?LoginUserID=${LoginUserID}&CurrentDate=${dataToSend.CurrentDate}`
    )
    if (data.success == true) {
      return data
    } else {
      dataToReturn.message = data.message
      return dataToReturn
    }
  } catch (error) {
    dataToReturn.message = error.message
    return dataToReturn
  }
}

export const GetToInvoiceData = async ({ LoginUserID }) => {
  try {
    let dataToSend = {
      CurrentDate: formatDateWithSymbol(new Date()),
    }
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetToInvoiceData?LoginUserID=${LoginUserID}&CurrentDate=${dataToSend.CurrentDate}`
    )
    if (data.success == true) {
      return data.dtOverAll
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export const GetPendingReceiptsCountData = async ({ LoginUserID, Type }) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetPendingReceiptsCountData?LoginUserID=${LoginUserID}&Type=${Type ?? "Count"}`
    )
    if (data.success == true) {
      return data
    } else {
      return {
        message: data.message,
        success: false,
        PendingCount: 0,
        DueCount: 0,
        UpcomingCount: 0,
        PendingAmount: 0,
        DueAmount: 0,
        UpcomingAmount: 0,
        TotalCount: 0,
        TotalAmount: 0,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      message: error.message,
      success: false,
      PendingCount: 0,
      DueCount: 0,
      UpcomingCount: 0,
      PendingAmount: 0,
      DueAmount: 0,
      UpcomingAmount: 0,
      TotalCount: 0,
      TotalAmount: 0,
    }
  }
}

export const UpdateInstallmentDueDate = async ({
  LoginUserID,
  InvoiceInstallmentID,
  DueDate,
}) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/UpdateInstallmentDueDate?LoginUserID=${LoginUserID}&InvoiceInstallmentID=${InvoiceInstallmentID}&Date=${formatDateWithSymbol(DueDate ?? new Date())}`
    )
    if (data.success == true) {
      return { message: "Due Date updated successfully!", success: true }
    } else {
      return {
        message: data.message,
        success: false,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      message: error.message,
      success: false,
    }
  }
}

// SUPPLIER PAYABLE DATA
export const GetSupplierPayableCountData = async ({ LoginUserID }) => {
  let dataToReturn = {
    message: "",
    success: false,
    dt: [{ Balance: 0, Count: 0 }],
  }

  try {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetSupplierPayableCountData?LoginUserID=${LoginUserID}`
    )
    if (data.success == true) {
      return data.dt[0]
    } else {
      dataToReturn.message = data.message
      return dataToReturn
    }
  } catch (error) {
    dataToReturn.message = error.message
    return dataToReturn
  }
}
// SUPPLIER RECEIVABLE DATA
export const GetSupplierReceiveableCountData = async ({ LoginUserID }) => {
  let dataToReturn = {
    message: "",
    success: false,
    dt: [{ Balance: 0, Count: 0 }],
  }

  try {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetSupplierReceiveableCountData?LoginUserID=${LoginUserID}`
    )
    if (data.success == true) {
      return data.dt[0]
    } else {
      dataToReturn.message = data.message
      return dataToReturn
    }
  } catch (error) {
    dataToReturn.message = error.message
    return dataToReturn
  }
}
export const GetSupplierAnalysisDetailData = async ({ LoginUserID, type }) => {
  let dataToReturn = {
    message: "",
    success: false,
    dt: [],
  }
  try {
    let url = ""
    if (type == "payable") {
      url = `${apiUrl}/${CONTROLLER}/GetSupplierPayableData?LoginUserID=${LoginUserID}`
    } else {
      url = `${apiUrl}/${CONTROLLER}/GetSupplierReceiveableData?LoginUserID=${LoginUserID}`
    }
    const { data } = await axios.post(url)
    if (data.success == true) {
      return data
    } else {
      dataToReturn.message = data.message
      return dataToReturn
    }
  } catch (error) {
    dataToReturn.message = error.message
    return dataToReturn
  }
}

export const GetSaleReceiptAnalysisData = async ({ LoginUserID }) => {
  let dataToReturn = {
    message: "",
    success: false,
    InvoiceAmount: 0,
    InvoiceCount: 0,
    InvoiceChangePercentage: 0,
    ReceiptAmount: 0,
    ReceiptCount: 0,
    ReceiptChangePercentage: 0,
  }

  try {
    let dataToSend = {
      CurrentDate: formatDateWithSymbol(new Date()),
    }
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetSaleReceiptAnalysisData?LoginUserID=${LoginUserID}&CurrentDate=${dataToSend.CurrentDate}`
    )
    if (data.success == true) {
      return data
    } else {
      dataToReturn.message = data.message
      return dataToReturn
    }
  } catch (error) {
    dataToReturn.message = error.message
    return dataToReturn
  }
}
