import { createContext, useContext, useState } from "react"

const ReceiptEntryContext = createContext()

export const ReceiptEntryContextProvider = ({ children }) => {
  const [ReceiptMode, setReceiptMode] = useState(null)
  const [Bank, setBank] = useState(null)
  const [InstrumentType, setInstrumentType] = useState(null)

  return (
    <ReceiptEntryContext.Provider
      value={{
        ReceiptMode,
        setReceiptMode,
        Bank,
        setBank,
        InstrumentType,
        setInstrumentType,
      }}
    >
      {children}
    </ReceiptEntryContext.Provider>
  )
}

export const useReceiptEntryProvider = () => {
  const {
    ReceiptMode,
    setReceiptMode,
    Bank,
    setBank,
    InstrumentType,
    setInstrumentType,
  } = useContext(ReceiptEntryContext)

  return {
    ReceiptMode,
    setReceiptMode,
    Bank,
    setBank,
    InstrumentType,
    setInstrumentType,
  }
}
