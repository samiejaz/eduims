import axios from "axios"
import { decryptID, encryptID } from "../../utils/crypto"
import { ShowErrorToast, ShowSuccessToast } from "../../utils/CommonFunctions"
import { getMasterIDForEditOrEntry } from "../../utils/forms_functions"

const apiUrl = import.meta.env.VITE_APP_API_URL

const CONTROLLER = "data_Customer"
const WHEREMETHOD = "GetSuppliersWhere"
const DELETEMETHOD = "CustomerDelete"

// URL: /EduIMS/GetCustomerWhere?LoginUserID=??
export async function fetchAllSuppliers(LoginUserID) {
  const { data } = await axios.post(
    `${apiUrl}/${CONTROLLER}/${WHEREMETHOD}?LoginUserID=${LoginUserID}`
  )
  return data.data ?? []
}

// URL: /EduIMS/GetCustomerWhere?CustomerID=??&LoginUserID=??
export async function fetchSupplierId(CustomerID = 0, LoginUserID) {
  CustomerID = decryptID(CustomerID)
  if (CustomerID !== 0) {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/${WHEREMETHOD}?CustomerID=${CustomerID}&LoginUserID=${LoginUserID}`
    )
    return data.data ?? []
  } else {
    return []
  }
}
// URL: /EduIMS/CustomerDelete?CustomerID=??&LoginUserID=??
export async function deleteSupplierByID({ CustomerID, LoginUserID }) {
  CustomerID = decryptID(CustomerID)
  const { data } = await axios.post(
    `${apiUrl}/${CONTROLLER}/${DELETEMETHOD}?CustomerID=${CustomerID}&LoginUserID=${LoginUserID}`
  )

  if (data.success === true) {
    ShowSuccessToast("Supplier sucessfully deleted!")
    return true
  } else {
    ShowErrorToast(data.message)
    return false
  }
}

export async function addNewSupplier({ formData, userID, CustomerID = 0 }) {
  try {
    let DataToSend = {
      CustomerName: formData.CustomerName,
      CountryID: formData.CountryID,
      TehsilID: formData.TehsilID,
      ContactPerson1Name: formData.ContactPerson1Name,
      ContactPerson1No: formData.ContactPerson1No,
      ContactPerson1Email: formData.ContactPerson1Email,
      CustomerBusinessAddress: formData.CustomerBusinessAddress,
      Description: formData.Description,
      InActive: formData.InActive === true ? 1 : 0,
      PartyType: formData.PartyType,
      EntryUserID: userID,
    }

    DataToSend.CustomerID = getMasterIDForEditOrEntry(CustomerID)

    const { data } = await axios.post(
      apiUrl + `/${CONTROLLER}/SuppliersInsertUpdate`,
      DataToSend
    )

    if (data.success === true) {
      if (CustomerID !== 0) {
        ShowSuccessToast("Supplier updated successfully!")
      } else {
        ShowSuccessToast("Supplier created successfully!")
      }
      return { success: true, RecordID: encryptID(data?.CustomerID) }
    } else {
      ShowErrorToast(data.message)
      return { success: false, RecordID: encryptID(CustomerID) }
    }
  } catch (e) {
    ShowErrorToast(e.message)
  }
}
