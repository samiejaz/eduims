import React from "react"
import { Toolbar } from "primereact/toolbar"
import { Button } from "primereact/button"
import useKeyCombination from "../hooks/useKeyCombinationHook"
import { useMutation } from "@tanstack/react-query"
import { PrintReportInNewTab } from "../utils/CommonFunctions"
import { SplitButton } from "primereact/splitbutton"
import { displayYesNoDialog } from "../utils/helpers"
import { SEVERITIES } from "../utils/CONSTANTS"

export default function ButtonToolBar({
  printLoading = false,
  saveLoading = false,
  deleteDisable = false,
  saveDisable = false,
  cancelDisable = false,
  addNewDisable = false,
  editDisable = false,
  printDisable = false,
  previousDisable = false,
  nextDisable = false,
  showPrint = false,
  utilityContent = [],
  handleCancel = () => {},
  handleDelete = () => {},
  handleAddNew = () => {},
  handleEdit = () => {},
  handlePrint = () => {},
  handleSave = () => {},
  handleGoBack = () => {},
  handlePrevious = () => {},
  handleNext = () => {},
  saveLabel = "Save",
  viewLabel = "View",
  editLabel = "Edit",
  cancelLabel = "Cancel",
  deleteLabel = "Delete",
  nextLabel = "Next",
  previousLabel = "Previous",
  GoBackLabel = "",
  showDelete = true,
  showDeleteButton = true,
  showSaveButton = true,
  showCancelButton = true,
  showAddNewButton = true,
  showEditButton = true,
  showNextButton = true,
  showPreviousButton = true,
  mode = "new",
  getPrintFromUrl = "",
  splitButtonItems = [],
  showUtilityContent = false,
  showBackButton = true,
  showSeparator = true,
  PreviousAndNextIDs = { NextRecordID: null, PreviousRecordID: null },
}) {
  useKeyCombination(() => {
    if (mode === "edit" || mode === "new") {
      handleSave()
    }
  }, "s")

  useKeyCombination(() => {
    if (mode === "view") {
      displayYesNoDialog({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        accept: () => handleDelete(),
        icon: <i className="pi pi-trash text-5xl"></i>,
        severity: SEVERITIES.DANGER,
        defaultFocus: "reject",
      })
    }
  }, "d")

  useKeyCombination(() => {
    if (mode === "view") {
      handleEdit()
    }
  }, "e")

  useKeyCombination(() => {
    if (mode !== "view") {
      handleCancel()
    }
  }, "c")

  useKeyCombination(() => {
    if (mode !== "new") {
      handleAddNew()
    }
  }, "n")

  const startContent = (
    <>
      {showBackButton && (
        <>
          <Button
            icon="pi pi-arrow-left"
            tooltip={GoBackLabel}
            className="p-button-text"
            onClick={() => {
              handleGoBack()
            }}
          />
        </>
      )}
    </>
  )
  const centerContent = (
    <React.Fragment>
      <div className="w-full flex gap-1 flex-wrap">
        {showCancelButton && (
          <>
            <Button
              label={cancelLabel}
              icon="pi pi-times"
              className="rounded"
              type="button"
              severity="secondary"
              disabled={cancelDisable ? true : mode === "view"}
              onClick={() => handleCancel()}
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        )}

        {showAddNewButton ? (
          <>
            <Button
              label="Add New"
              icon="pi pi-plus"
              className="rounded"
              type="button"
              disabled={
                addNewDisable ? true : mode === "edit" || mode === "new"
              }
              onClick={() => handleAddNew()}
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
                root: {
                  style: {
                    background: "#4169e1",
                  },
                },
              }}
            />
          </>
        ) : null}
        {showEditButton ? (
          <>
            <Button
              label={editLabel}
              icon="pi pi-pencil"
              type="button"
              severity="warning"
              className="p-button-success rounded"
              disabled={editDisable ? true : mode !== "view" ? true : false}
              onClick={() => handleEdit()}
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        ) : null}
        {showDelete && (
          <>
            <Button
              label={deleteLabel}
              icon="pi pi-trash"
              type="button"
              severity="danger"
              disabled={
                deleteDisable ? true : mode === "edit" || mode === "new"
              }
              onClick={() => {
                displayYesNoDialog({
                  message: "Do you want to delete this record?",
                  header: "Delete Confirmation",
                  accept: () => handleDelete(),
                  icon: <i className="pi pi-trash text-5xl"></i>,
                  severity: SEVERITIES.DANGER,
                  defaultFocus: "reject",
                })
              }}
              className="p-button-success rounded"
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        )}
        {showSaveButton ? (
          <>
            <Button
              label={
                saveLabel !== "Save"
                  ? saveLabel
                  : mode === "edit"
                    ? "Update"
                    : "Save"
              }
              icon="pi pi-check"
              type="submit"
              severity="success"
              disabled={saveDisable ? true : mode === "view"}
              onClick={handleSave}
              loading={saveLoading}
              className="p-button-success rounded"
              loadingIcon="pi pi-spin pi-cog"
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        ) : null}
        {showSeparator && (
          <>
            <i className="pi pi-bars p-toolbar-separator mr-2" />
          </>
        )}

        {showPreviousButton && (
          <>
            <Button
              label={previousLabel}
              icon="pi pi-arrow-left"
              className="rounded"
              type="button"
              severity="secondary"
              text
              disabled={
                previousDisable ||
                (mode === "view" &&
                  PreviousAndNextIDs.PreviousRecordID === null) ||
                mode !== "view"
              }
              onClick={() => {
                if (PreviousAndNextIDs.PreviousRecordID !== null) {
                  handlePrevious()
                }
              }}
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        )}
        {showNextButton && (
          <>
            <Button
              label={nextLabel}
              icon="pi pi-arrow-right"
              className="rounded"
              type="button"
              severity="secondary"
              iconPos="right"
              disabled={
                nextDisable ||
                (mode === "view" && PreviousAndNextIDs.NextRecordID === null) ||
                mode !== "view"
              }
              onClick={() => {
                if (PreviousAndNextIDs.NextRecordID !== null) {
                  handleNext()
                }
              }}
              text
              pt={{
                label: {
                  className: "hidden md:block lg:block",
                },
              }}
            />
          </>
        )}
        {showPrint ? (
          <>
            <PrintRecordButton
              getPrintFromUrl={getPrintFromUrl}
              printDisable={printDisable}
              items={splitButtonItems}
            />
          </>
        ) : (
          <></>
        )}
        {showUtilityContent && <>{utilityContent}</>}
      </div>
    </React.Fragment>
  )

  return (
    <>
      <Toolbar
        start={startContent}
        center={centerContent}
        pt={{
          root: {
            style: {
              background: "none",
              padding: "0",
              border: "none",
            },
          },
          center: {
            className: "mx-auto",
          },
        }}
      />
    </>
  )
}

const PrintRecordButton = ({
  getPrintFromUrl,
  printDisable,
  fullUrl,
  items = [],
}) => {
  const mutation = useMutation({
    mutationFn: PrintReportInNewTab,
  })

  let updatedItems =
    items.length > 0
      ? items.map((item) => {
          return {
            label: item.label,
            icon: item.icon,
            command: () => {
              mutation.mutateAsync({
                controllerName: `${getPrintFromUrl}&ReportType=${item.reportType}`,
              })
            },
          }
        })
      : []

  return (
    <>
      {items.length === 0 ? (
        <>
          <Button
            label={mutation.isPending ? "Generating..." : "Print"}
            icon="pi pi-print"
            className="rounded"
            type="button"
            severity="help"
            disabled={printDisable}
            loading={mutation.isPending}
            loadingIcon="pi pi-spin pi-print"
            onClick={() =>
              mutation.mutateAsync({
                controllerName: getPrintFromUrl || fullUrl,
              })
            }
            pt={{
              label: {
                className: "hidden md:block lg:block",
              },
            }}
          />
        </>
      ) : (
        <>
          <SplitButton
            label={mutation.isPending ? "Generating..." : "Print"}
            icon="pi pi-print"
            type="button"
            severity="help"
            disabled={printDisable}
            loading={mutation.isPending}
            loadingIcon="pi pi-spin pi-print"
            onClick={() =>
              mutation.mutateAsync({
                controllerName: getPrintFromUrl || fullUrl,
              })
            }
            model={updatedItems}
            pt={{
              label: {
                className: "hidden md:block lg:block",
              },
              button: {
                className: "rounded",
              },
              menuButton: {
                className: "rounded",
              },
              root: {
                className: "rounded",
              },
            }}
          />
        </>
      )}
    </>
  )
}
