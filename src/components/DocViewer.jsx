import React from "react"
import DocViewer from "react-doc-viewer"
const DocViewerComponent = () => {
  const docs = [{ uri: "https://localhost:7122/invoice" }]

  return <DocViewer documents={docs} />
}

export default DocViewerComponent
