import { Card } from "primereact/card"
import React, { useState } from "react"
import { FormRow } from "../../../components/Layout/LayoutComponents"
import { Checkbox } from "primereact/checkbox"
import {
  useFieldArray,
  useForm,
  useFormContext,
  Controller,
} from "react-hook-form"
import { Button } from "primereact/button"
const AddCheckListComponent = ({ hidden }) => {
  const [checked, setChecked] = useState(false)
  const method = useForm({
    defaultValues: {
      checklistdetail: [
        {
          CheckListDetailDescription: "",
        },
      ],
    },
  })

  const checklistdetailArray = useFieldArray({
    control: method.control,
    name: "checklistdetail",
  })
  return (
    <Card
      hidden={hidden}
      className="w-full bg-gray-100 shadow-none mt-5 "
      pt={{
        header: {
          className: "h-1rem",
        },
      }}
      header={
        <FormRow className="pl-4 pt-4">
          <input
            type="text"
            id="ChecklistTitle"
            name="ChecklistTitle"
            placeholder="Checklist Title"
            defaultValue={"Checklist #1"}
            style={{
              border: "none",
              outline: "none",
              fontWeight: "650",
              backgroundColor: "transparent",
              fontSize: "0.8rem",
              width: "30%",
            }}
          />
        </FormRow>
      }
    >
      <FormRow className="flex flex-column w-full align-items-center gap-3 mt-1">
        {checklistdetailArray.fields.map((item, index) => {
          return (
            <div className="flex align-items-center gap-3 w-full">
              <CheckListDetailDescriptionInput
                control={method.control}
                name={`checklistdetail.${index}.CheckListDetailDescription`}
                onEnterPress={() => {
                  checklistdetailArray.append({
                    CheckListDetailDescription: "",
                  })
                }}
              />
              <Button
                icon="pi pi-trash"
                severity="secondary"
                style={{ outline: "none" }}
                text
                pt={{
                  root: {
                    className: "w-1rem",
                  },
                }}
              />
            </div>
          )
        })}
      </FormRow>

      <FormRow className="mt-3 pl-2 flex align-items-center  justify-content-between ">
        <div
          className="flex align-items-center justify-content-center gap-2"
          onClick={() => {
            checklistdetailArray.append({
              CheckListDetailDescription: "",
            })
          }}
        >
          <i className="pi pi-plus" />
          <p className="underline">Add Item</p>
        </div>
        <div
          className="flex align-items-center justify-content-center gap-2 text-red mr-4"
          onClick={() => {
            checklistdetailArray.append({
              CheckListDetailDescription: "",
            })
          }}
        >
          <i className="pi pi-trash text-red-500" />
          <p className="underline text-red-500">Delete Checklist</p>
        </div>
      </FormRow>
    </Card>
  )
}

export default AddCheckListComponent

const CheckListDetailDescriptionInput = ({ name, control, onEnterPress }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <input
          type="text"
          name={field.name}
          value={field.value}
          ref={field.ref}
          onChange={field.onChange}
          className="flex-1 "
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              if (e.target.value != "") {
                if (onEnterPress) {
                  onEnterPress()
                }
              }
            }
          }}
          style={{
            border: "1px solid #aaaeb5",
            boxShadow: "none",
            borderRadius: "10px",
            padding: "8px",
            outlineColor: "#9dcf00",
            outlineOffset: "1px",
            outlineWidth: "1px",
            fontSize: "1rem",
          }}
        />
      )}
    />
  )
}
