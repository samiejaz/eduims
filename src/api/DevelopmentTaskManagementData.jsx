import axios from "axios"
import { decryptID, encryptID } from "../utils/crypto"
import {
  ShowErrorToast,
  ShowSuccessToast,
  formatDateWithSymbol,
} from "../utils/CommonFunctions"
import { toast } from "react-toastify"

const apiUrl = import.meta.env.VITE_APP_API_URL
const CONTROLLER = "EduSoftwareManagement"
const GETDEVELOPMENTTASKSMETHOD = "GetDeveloperTasks"
const GETDISCUSSIONPENDINGMETHOD = "GetPendingDiscussionTasks"

export async function fetchDevelopmentTasks(LoginUserID, EmployeeID) {
  EmployeeID = parseInt(0 + EmployeeID)
  if (EmployeeID > 0) {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/${GETDEVELOPMENTTASKSMETHOD}?LoginUserID=${LoginUserID}&EmployeeID=${EmployeeID}`
    )
    return data.dt ?? []
  } else {
    return []
  }
}

export async function fetchDiscussionPendingTasks(LoginUserID, EmployeeID) {
  EmployeeID = parseInt(0 + EmployeeID)
  if (EmployeeID > 0) {
    const { data } = await axios.post(
      `${apiUrl}/${CONTROLLER}/${GETDISCUSSIONPENDINGMETHOD}?LoginUserID=${LoginUserID}&EmployeeID=${EmployeeID}`
    )

    return data.dt ?? []
  } else {
    return []
  }
}

export async function fetchDevelopers() {
  const { data } = await axios.post(`${apiUrl}/${CONTROLLER}/SelectDevelopers`)
  return data.dt ?? []
}

export async function saveTasksSequence({ detailData, userID }) {
  if (detailData.length > 0) {
    console.log(detailData)
    try {
      let DetailData = detailData.map((item, index) => {
        return {
          RowID: index + 1,
          RequirementID: parseInt(0 + item.RequirementID),
          JobNo: parseInt(0 + item.JobNo),
          DevelopmentHours: parseFloat(0 + item.DevelopmentHours),
          ExpectedCompleteDate: item.ExpectedCompleteDate,
          WorkingHours: parseFloat(0 + item.WorkingHours),
        }
      })

      let DataToSend = {
        EntryUserID: userID,
        DtData: JSON.stringify(DetailData),
      }
      console.log(DataToSend)
      const { data } = await axios.post(
        apiUrl + `/${CONTROLLER}/UpdateTasksSequence`,
        DataToSend
      )

      if (data.success === true) {
        toast.success("Sequence updated successfully!")

        return {
          success: true,
        }
      } else {
        toast.error(data.message, {
          autoClose: false,
        })
        return { success: false }
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: false,
      })
    }
  } else {
    toast.error("Please add atleast 1 row!", {
      autoClose: false,
    })
  }
}
