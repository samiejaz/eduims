import axios from "axios"
import { formatDateWithSymbol } from "../../utils/CommonFunctions"

const apiUrl = import.meta.env.VITE_APP_API_URL

const CONTROLLER = "data_Dashboard"

export const GetToInvoiceCountData = async ({ LoginUserID }) => {
  try {
    let dataToSend = {
      Days: 100,
    }

    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetToInvoiceCountData?LoginUserID=${LoginUserID}`
    )
    if (data.success == true) {
      return data.dt[0]
    } else {
      return {
        Balance: 0,
        Count: 0,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      Balance: 0,
      Count: 0,
    }
  }
}

export const GetToInvoiceData = async ({ LoginUserID }) => {
  try {
    let dataToSend = {
      Days: 100,
    }

    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/GetToInvoiceData?LoginUserID=${LoginUserID}`
    )
    if (data.success == true) {
      return data.dt
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
