import { ShowErrorToast } from "./CommonFunctions"

export function encryptID(id) {
  return btoa(id)
}

export function decryptID(encryptedId) {
  try {
    return atob(encryptedId)
  } catch (err) {
    return 0
  }
}

export function verifyAndReturnEncryptedIDForForms(encryptedID) {
  try {
    let message = ""
    let decryptedID
    let isCorrect = true

    let falseCondtions = ["", "new", "view", "edit", undefined, null, 0, "0"]

    if (falseCondtions.some((condtion) => condtion === encryptedID)) {
      isCorrect = false
      message = "Invalid ID!"
    }

    if (isCorrect) {
      decryptedID = decryptID(encryptedID)

      if (falseCondtions.some((condtion) => condtion === decryptedID)) {
        message = "The record you are trying to access does not exists!"
        ShowErrorToast("CRYPTO::" + message)
      } else {
        return decryptedID
      }
    } else {
      ShowErrorToast("CRYPTO::" + message)
    }
  } catch (e) {
    ShowErrorToast("CRYPTO::" + e.message)
  }
}

export function encrptyObject(obj) {
  let jsonString = JSON.stringify(obj)
  let encodedString = window.btoa(jsonString)
  return encodedString
}
export function decryptedObject(encodedString) {
  try {
    let decodedString = window.atob(encodedString)
    let obj = JSON.parse(decodedString)
    return obj
  } catch (err) {
    return {}
  }
}
