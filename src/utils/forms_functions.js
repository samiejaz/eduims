import { decryptID } from "./crypto"

export function getMasterIDForEditOrEntry(id) {
  debugger
  try {
    id = id !== 0 ? decryptID(id) : 0
    if (id === 0 || id === undefined) {
      return 0
    } else {
      return id
    }
  } catch (error) {
    return 0
  }
}
