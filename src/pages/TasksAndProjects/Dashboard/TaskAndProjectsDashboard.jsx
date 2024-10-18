import {
  CalendarCheck2,
  CalendarCheck2Icon,
  CalendarClock,
  CalendarRange,
  ClipboardList,
  Divide,
  FilePen,
  FilePlus2,
  Flame,
  FolderGit2,
  FolderPlus,
  FolderSearch2,
  User2,
} from "lucide-react"
import { Divider } from "primereact/divider"
import { Menubar } from "primereact/menubar"
import React, { useEffect, useState } from "react"
import { Button } from "primereact/button"
import { DataScroller } from "primereact/datascroller"
import { Rating } from "primereact/rating"
import { Tag } from "primereact/tag"
import {
  FormColumn,
  FormLabel,
  FormRow,
} from "../../../components/Layout/LayoutComponents"
import { Card } from "primereact/card"
import { DataView } from "primereact/dataview"
import AddQuickTaskComponent from "../Components/AddQuickTask"
import AddNewTaskComponent from "../Components/AddNewTask"
const TaskAndProjectsDashboard = () => {
  const items = [
    {
      label: "Tasks",
      icon: (
        <ClipboardList
          className="p-menuitem-icon"
          style={{ height: 16, width: 16 }}
        />
      ),
      items: [
        {
          label: "Add New Task",
          icon: (
            <FilePlus2
              className="p-menuitem-icon"
              style={{ height: 18, width: 18 }}
            />
          ),
          command: () => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "File created",
              life: 3000,
            })
          },
        },
      ],
    },
    {
      label: "Projects",
      icon: (
        <FolderGit2
          className="p-menuitem-icon"
          style={{ height: 16, width: 16 }}
        />
      ),
      items: [
        {
          label: "Add New Project",
          icon: (
            <FolderPlus
              className="p-menuitem-icon"
              style={{ height: 18, width: 18 }}
            />
          ),
          command: () => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "File created",
              life: 3000,
            })
          },
        },
        {
          label: "View Project",
          icon: (
            <FolderSearch2
              className="p-menuitem-icon"
              style={{ height: 18, width: 18 }}
            />
          ),
          command: () => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "File created",
              life: 3000,
            })
          },
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Sync",

      icon: "pi pi-cloud",
      items: [
        {
          label: "Import",
          icon: "pi pi-cloud-download",
          command: () => {
            toast.current.show({
              severity: "info",
              summary: "Downloads",
              detail: "Downloaded from cloud",
              life: 3000,
            })
          },
        },
        {
          label: "Export",
          icon: "pi pi-cloud-upload",
          command: () => {
            toast.current.show({
              severity: "info",
              summary: "Shared",
              detail: "Exported to cloud",
              life: 3000,
            })
          },
        },
      ],
    },
  ]
  const [products, setProducts] = useState([])

  const productslist = [
    {
      title: "Task 1",
    },
    {
      title: "Task 2",
    },
    {
      title: "Task 3",
    },
    {
      title: "Task 4",
    },
    {
      title: "Task 5",
    },
    {
      title: "Task 6",
    },
    {
      title: "Task 8",
    },
    {
      title: "Task 8",
    },
    {
      title: "Task 8",
    },
    {
      title: "Task 8",
    },
    {
      title: "Task 8",
    },
  ]

  useEffect(() => {
    setProducts(productslist)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "title":
        return "success"

      case "LOWSTOCK":
        return "warning"

      case "OUTOFSTOCK":
        return "danger"

      default:
        return null
    }
  }

  const OverdueCardTemplate = (data) => {
    return (
      <Card
        pt={{
          root: {
            className: "border-left-3",
            style: { borderColor: "#ff5752" },
          },
          title: {
            style: { fontSize: "15px", fontWeight: "500" },
          },
          content: {
            style: { fontSize: "12px" },
            className: "p-0",
          },
        }}
        title="Simple Card"
        className="mt-2"
      >
        <p className="m-0">{data.title}</p>
      </Card>
    )
  }
  const DuetodayCardTemplate = (data) => {
    return (
      <Card
        pt={{
          root: {
            className: "border-left-3",
            style: { borderColor: "#9dcf00" },
          },
          title: {
            style: { fontSize: "15px", fontWeight: "500" },
          },
          content: {
            style: { fontSize: "12px" },
            className: "p-0",
          },
        }}
        title="Simple Card"
        className="mt-2"
      >
        <p className="m-0">{data.title}</p>
      </Card>
    )
  }
  const DuethisweekCardTemplate = (data) => {
    return (
      <Card
        pt={{
          root: {
            className: "border-left-3",
            style: { borderColor: "#2fc6f6" },
          },
          title: {
            style: { fontSize: "15px", fontWeight: "500" },
          },
          content: {
            style: { fontSize: "12px" },
            className: "p-0",
          },
        }}
        title="Simple Card"
        className="mt-2"
      >
        <p className="m-0">{data.title}</p>
      </Card>
    )
  }
  const DueafteroneweekCardTemplate = (data) => {
    return (
      <Card
        pt={{
          root: {
            className: "border-left-3",
            style: { borderColor: "#55d0e0" },
          },
          title: {
            style: { fontSize: "15px", fontWeight: "500" },
          },
          content: {
            style: { fontSize: "12px" },
            className: "p-0",
          },
        }}
        title="Simple Card"
        className="mt-2"
      >
        <p className="m-0">{data.title}</p>
      </Card>
    )
  }
  const NodeadlineCardTemplate = (data) => {
    return (
      <Card
        pt={{
          root: {
            className: "border-left-3",
            style: { borderColor: "#a8adb4" },
          },

          title: {
            style: { fontSize: "15px", fontWeight: "500" },
          },
          content: {
            style: { fontSize: "12px" },
            className: "p-0",
          },
        }}
        title="Simple Card"
        className="mt-2"
      >
        <p className="m-0">{data.title}</p>
      </Card>
    )
  }

  const NodeadlineCardList = (items) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return NodeadlineCardTemplate(product, index)
    })

    return <div>{list}</div>
  }
  const OverdueCardList = (items) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return OverdueCardTemplate(product, index)
    })

    return <div> {list}</div>
  }
  const DuetodayCardList = (items) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return DuetodayCardTemplate(product, index)
    })

    return <div>{list}</div>
  }
  const DuethisweekCardList = (items) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return DuethisweekCardTemplate(product, index)
    })

    return <div>{list}</div>
  }
  const DueafteroneweekCardList = (items) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return DueafteroneweekCardTemplate(product, index)
    })

    return <div>{list}</div>
  }
  return (
    <div>
      <FormRow className="flex align-items-center w-full gap-2">
        <div>
          <AddNewTaskComponent></AddNewTaskComponent>
        </div>
        <div className="card flex-1">
          <Menubar
            pt={{
              root: {
                className: "vertical-align-middle ",
              },
              menu: {
                className: "gap-2",
              },
              label: {
                style: { fontSize: "16px" },
              },
              action: {
                className: " p-0 pl-3 pr-3 vertical-align-middle",
                style: {
                  height: "30px",
                },
              },
              menuitem: {
                style: { height: "30px" },
                className: "gap-1",
              },
            }}
            model={items}
          />
        </div>
      </FormRow>

      <FormRow className="mt-2">
        <div className="grid w-full">
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div className="flex justify-content-between ">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    High Priority Tasks
                  </span>
                  <div className="text-900 font-medium text-xl">12</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-orange-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className=" text-orange-500 text-xl">
                    <Flame
                      className="p-menuitem-icon"
                      style={{ height: 25, width: 20 }}
                    />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div className="flex justify-content-between ">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Pending Tasks
                  </span>
                  <div className="text-900 font-medium text-xl">12</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-red-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className=" text-red-500 text-xl">
                    <CalendarClock
                      className="p-menuitem-icon"
                      style={{ height: 25, width: 20 }}
                    />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div className="flex justify-content-between ">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Tasks In-Progress
                  </span>
                  <div className="text-900 font-medium text-xl">12</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-yellow-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className=" text-yellow-500 text-xl">
                    <CalendarRange
                      className="p-menuitem-icon"
                      style={{ height: 25, width: 20 }}
                    />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div className="flex justify-content-between ">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Today's Completed Tasks
                  </span>
                  <div className="text-900 font-medium text-xl">12</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-green-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className=" text-green-500 text-xl">
                    <CalendarCheck2Icon
                      className="p-menuitem-icon"
                      style={{ height: 25, width: 20 }}
                    />
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormRow>
      <FormRow className="mt-2 ">
        <div className="relative w-full">
          <div
            className="card flex justify-content-center  gap-2"
            style={{
              position: "absolute",
              height: "100%",

              width: "100%",
            }}
          >
            <DataView
              pt={{
                header: {
                  className:
                    "flex align-items-center justify-content-start  font-bold border-round m-2 ",
                  style: {
                    backgroundColor: "#ff5752",
                    color: "white",
                    height: "10px",
                    fontSize: "15px",
                  },
                },
                root: {
                  className: "w-full ",
                },
                content: {
                  className: "mt-2 p-1",
                  style: { height: "600px", overflowY: "auto" },
                },
              }}
              value={products}
              header="Overdue"
              listTemplate={OverdueCardList}
            />

            <DataView
              pt={{
                header: {
                  className:
                    "flex align-items-center justify-content-center  font-bold border-round m-2 ",
                  style: {
                    backgroundColor: "#9dcf00",
                    color: "white",
                    height: "10px",
                    fontSize: "15px",
                  },
                },
                root: {
                  className: "w-full ",
                },
                content: {
                  className: "mt-2 p-1",
                  style: { height: "600px", overflowY: "auto" },
                },
              }}
              value={products}
              header={
                <div className=" w-full flex align-items-center justify-content-between px-2 ">
                  <p>Due Today</p>

                  <AddQuickTaskComponent shadow={"2px 2px 5px #9dcf00"} />
                </div>
              }
              listTemplate={DuetodayCardList}
            />
            <DataView
              pt={{
                header: {
                  className:
                    "flex align-items-center justify-content-center  font-bold border-round m-2 ",
                  style: {
                    backgroundColor: "#2fc6f6",
                    color: "white",
                    height: "10px",
                    fontSize: "15px",
                  },
                },
                root: {
                  className: "w-full ",
                },
                content: {
                  className: "mt-2 p-1",
                  style: { height: "600px", overflowY: "auto" },
                },
              }}
              value={products}
              header={
                <div className=" w-full flex align-items-center justify-content-between px-2 ">
                  <p>Due this week</p>

                  <AddQuickTaskComponent shadow={"2px 2px 5px #2FC6F6"} />
                </div>
              }
              listTemplate={DuethisweekCardList}
            />
            <DataView
              pt={{
                root: {
                  className: "w-full ",
                },
                header: {
                  className:
                    "flex align-items-center justify-content-center  font-bold border-round m-2 ",
                  style: {
                    backgroundColor: "#55d0e0",
                    color: "white",
                    height: "10px",
                    fontSize: "15px",
                  },
                },
                content: {
                  className: "mt-2 p-1",
                  style: { height: "600px", overflowY: "auto" },
                },
              }}
              value={products}
              header={
                <div className=" w-full flex align-items-center justify-content-between px-2 ">
                  <p>Due after one week</p>

                  <AddQuickTaskComponent shadow={"2px 2px 5px #55d0e0"} />
                </div>
              }
              listTemplate={DueafteroneweekCardList}
            />
            <DataView
              pt={{
                root: {
                  className: "w-full ",
                },
                header: {
                  className:
                    "flex align-items-center justify-content-center  font-bold border-round m-2 ",
                  style: {
                    backgroundColor: "#a8adb4",
                    color: "white",
                    height: "10px",
                    fontSize: "15px",
                  },
                },
                content: {
                  className: "mt-2 p-1",
                  style: { height: "600px", overflowY: "auto" },
                },
              }}
              value={products}
              header={
                <div className=" w-full flex align-items-center justify-content-between px-2 ">
                  <p>No deadline</p>

                  <AddQuickTaskComponent shadow={"2px 2px 5px #a8adb4"} />
                </div>
              }
              listTemplate={NodeadlineCardList}
            />
          </div>
        </div>
      </FormRow>
    </div>
  )
}

export default TaskAndProjectsDashboard
