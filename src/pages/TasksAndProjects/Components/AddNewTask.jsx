import React, { useState } from "react"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"
import {
  FormColumn,
  FormRow,
} from "../../../components/Layout/LayoutComponents"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Divider } from "primereact/divider"
import AddCheckListComponent from "./AddCheckListComponent"
import { CMultiSelectField } from "../../../components/Forms/form"
import { useForm } from "react-hook-form"
import { MultiSelect } from "primereact/multiselect"
import { Avatar } from "primereact/avatar"
// import { image } from ".././assets/search.png"
// import { AvatarImage } from "../../../assets/search.png"
import { User } from "lucide-react"
import { Dropdown } from "primereact/dropdown"
const AddNewTaskComponent = () => {
  const [visibleRight, setVisibleRight] = useState(false)
  const [hideCheckList, sethideCheckList] = useState(true)
  const [selectedCountries, setSelectedCountries] = useState(null)
  const countries = [
    { name: "Huzaifa", code: "1" },
    { name: "Sami", code: "2" },
    { name: "Harris", code: "3" },
    { name: "Mohsin", code: "4" },
    { name: "Modassir", code: "5" },
    { name: "Razzaq", code: "6" },
  ]
  const [selectedProjects, setSelectedProjects] = useState(null)
  const projects = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]
  const countryTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar icon={<User color="gray" size={18} />} shape="circle" />
        <div>{option.name}</div>
      </div>
    )
  }
  const panelFooterTemplate = () => {
    const length = selectedCountries ? selectedCountries.length : 0

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    )
  }
  const method = useForm({
    defaultValues: { AssigneeID: "0" },
  })
  return (
    <div>
      <Button
        label="Create"
        icon="pi pi-plus"
        iconPos="right"
        style={{ backgroundColor: "#9dcf00", border: "none" }}
        onClick={() => setVisibleRight(true)}
      />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        style={{ width: "80vw", backgroundColor: "#EEF2F4" }}
        header="New Task"
        pt={{
          header: {
            className: "p-3",
            style: {
              fontSize: "25px",
              fontWeight: "400",
            },
          },
        }}
      >
        <FormRow className="mt-1">
          <Card className="w-full" style={{ borderRadius: "15px" }}>
            <FormRow className="pl-2">
              <input
                type="text"
                id="TaskName"
                name="TaskName"
                placeholder="Enter Task Name"
                className="w-full "
                style={{
                  border: "none",
                  outline: "none",

                  fontSize: "1.1rem",
                }}
              />
            </FormRow>
            <Divider />
            <FormRow className="pl-2 mt-1   ">
              <textarea
                id="TaskDescription"
                name="TaskDescription"
                rows="10"
                className="w-full "
                placeholder="Write down the task description here!"
                style={{
                  border: "none",
                  outline: "none",

                  fontSize: "0.9rem",
                }}
              ></textarea>
            </FormRow>
            <FormRow className="pl-2 mt-2 ">
              <Button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "15px",
                }}
                className="text-bluegray-400"
                label="File"
                icon="pi pi-paperclip"
                badge="2"
                badgeClassName="p-badge-danger"
              />

              <Button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "15px",
                }}
                className="text-bluegray-400"
                label="Checklist"
                icon="pi pi-list-check"
                onClick={() => sethideCheckList(false)}
              />
            </FormRow>
            <FormRow>
              <AddCheckListComponent
                hidden={hideCheckList}
              ></AddCheckListComponent>
            </FormRow>
            <FormRow className="pl-2 mt-4 w-full align-items-center">
              <FormColumn lg={12} xl={1} md={12}>
                <p className="font-semibold  text-sm">Assignee</p>
              </FormColumn>
              <FormColumn lg={12} xl={10} md={12}>
                <MultiSelect
                  value={selectedCountries}
                  options={countries}
                  onChange={(e) => setSelectedCountries(e.value)}
                  optionLabel="name"
                  placeholder="Assignee"
                  filter
                  itemTemplate={countryTemplate}
                  panelFooterTemplate={panelFooterTemplate}
                  display="chip"
                  style={{ minWidth: "30rem" }}
                />
              </FormColumn>
            </FormRow>
            <FormRow className="pl-2 align-items-center  w-full">
              <FormColumn lg={12} xl={1} md={12}>
                <p className="font-semibold text-sm">Observers</p>
              </FormColumn>
              <FormColumn lg={12} xl={10} md={12}>
                <MultiSelect
                  value={selectedCountries}
                  options={countries}
                  onChange={(e) => setSelectedCountries(e.value)}
                  optionLabel="name"
                  filter
                  placeholder="Observers"
                  itemTemplate={countryTemplate}
                  panelFooterTemplate={panelFooterTemplate}
                  display="chip"
                  style={{ minWidth: "30rem" }}
                />
              </FormColumn>
            </FormRow>
            <FormRow className="pl-2  w-full align-items-center">
              <FormColumn lg={12} xl={1} md={12}>
                <p className="font-semibold text-sm">Project</p>
              </FormColumn>
              <FormColumn lg={12} xl={10} md={12}>
                <Dropdown
                  value={selectedProjects}
                  onChange={(e) => setSelectedProjects(e.value)}
                  options={projects}
                  filter
                  optionLabel="name"
                  placeholder="Select a Project"
                  style={{ minWidth: "30rem", height: "45px" }}
                />
              </FormColumn>
            </FormRow>
          </Card>
        </FormRow>
      </Sidebar>
    </div>
  )
}

export default AddNewTaskComponent
