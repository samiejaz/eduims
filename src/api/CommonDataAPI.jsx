import axios from "axios"
import { ShowErrorToast } from "../utils/CommonFunctions"
import { decryptID, encryptID } from "../utils/crypto"

const apiUrl = import.meta.env.VITE_APP_API_URL

const CONTROLLER = "Common"

export const fetchPreviousAndNextID = async ({
  LoginUserID,
  RecordID,
  TableName,
  IDName,
}) => {
  let ID = decryptID(RecordID)
  if (ID !== null) {
    try {
      let queryParams = `?LoginUserID=${LoginUserID}&RecordID=${ID}&TableName=${TableName}&IDName=${IDName}`
      const { data } = await axios.post(
        `${apiUrl}/${CONTROLLER}/GetPreviousNextID${queryParams}`
      )
      if (data.success) {
        return {
          PreviousRecordID:
            data.data[0].PreviousRecordID === null
              ? null
              : encryptID(data.data[0].PreviousRecordID),
          NextRecordID:
            data.data[0].NextRecordID === null
              ? null
              : encryptID(data.data[0].NextRecordID),
        }
      }
    } catch (error) {
      ShowErrorToast(error)
      return { PreviousRecordID: null, NextRecordID: null }
    }
  } else {
    return { PreviousRecordID: null, NextRecordID: null }
  }
}
