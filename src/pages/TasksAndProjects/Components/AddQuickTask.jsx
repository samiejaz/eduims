import React, { useRef } from "react"
import { OverlayPanel } from "primereact/overlaypanel"
import {
  FormColumn,
  FormLabel,
  FormRow,
} from "../../../components/Layout/LayoutComponents"
import TextInput from "../../../components/Forms/TextInput"
import { useForm, useFormContext } from "react-hook-form"
import { InputTextarea } from "primereact/inputtextarea"
import { CornerDownLeft } from "lucide-react"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"
const AddQuickTaskComponent = ({ shadow }) => {
  const op = useRef(null)
  const method = useForm({
    defaultValues: {
      TaskTitle: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="card flex justify-content-center">
      <Button
        pt={{
          root: {
            className: " bg-transparent border-none w-2rem",
          },
        }}
        icon="pi pi-plus"
        tooltip="Quick Task"
        tooltipOptions={{
          style: {
            fontSize: "12px",
          },
        }}
        onClick={(e) => op.current.toggle(e)}
      />

      <OverlayPanel
        pt={{
          closeButton: {
            className: "bg-red-500",
            style: { height: "25px", width: "25px" },
          },
          closeIcon: {
            style: { height: "12px", width: "12px" },
          },
          content: {
            style: {
              width: "300px",
              boxShadow: shadow ?? "5px 5px 7px #55D0E0",
              //   borderBottom: "5px solid royalblue",
            },
          },
        }}
        ref={op}
        showCloseIcon
        closeOnEscape
        dismissable={false}
      >
        <FormRow>
          <FormColumn lg={12} xl={12} md={12} className="col-sm-2">
            <div>
              <TextInput control={method.control} ID={"TaskTitle"} />
            </div>
            <div className="mt-3 flex align-items-start gap-2">
              <span className="text-xs text-gray-400"> Press</span>{" "}
              <Tag
                className="p-0 bg-white text-gray-400"
                value={<CornerDownLeft size={13} />}
                severity={"primary"}
              />
              <span className="text-xs text-gray-400">
                enter to create task
              </span>
            </div>
            {/* <div className="mt-2 flex align-items-center  align-content-center p-2">
              <span>Press</span> <span>{<CornerDownLeft size={15} />}</span>{" "}
              <span></span>
            </div> */}
          </FormColumn>
        </FormRow>
      </OverlayPanel>
    </div>
  )
}

export default AddQuickTaskComponent
