import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthProvider } from "../../context/AuthContext"
import { usePreviousAndNextID } from "../../hooks/api/usePreviousAndNextIDHook"
import ButtonToolBar from "../ActionsToolbar"
import { CustomSpinner } from "../CustomSpinner"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export default function FormWr({
  title = "EDUIMS",
  mode,
  userRights,
  queryKey,
  tableName,
  IDENTITY,
  functionToLoadRecordData = () => [],
  functionToAddData = () => {},
  functionToDeleteData = () => {},
  children,
  parentRoute,
  editRoute,
  viewRoute,
  newRoute,
}) {
  document.title = title
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuthProvider()

  const method = useFormContext()

  const data = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => functionToLoadRecordData(id, user.userID),
    enabled: id !== undefined,
    initialData: [],
  })

  const { data: PreviousAndNextIDs } = usePreviousAndNextID({
    TableName: tableName,
    IDName: IDENTITY,
    LoginUserID: user?.userID,
    RecordID: id,
  })

  const mutation = useMutation({
    mutationFn: functionToAddData,
    onSuccess: ({ success, RecordID }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        navigate(`${parentRoute}/${RecordID}`)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: functionToDeleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      navigate(parentRoute)
    },
  })

  useEffect(() => {
    if (id !== undefined && data.data.length > 0) {
      method.setValue("BusinessTypeTitle", data.data[0].BusinessTypeTitle)
      method.setValue("InActive", data.data[0].InActive)
    }
  }, [id, data])

  function handleDelete() {
    deleteMutation.mutate({
      id: id,
      LoginUserID: user.userID,
    })
  }

  function handleAddNew() {
    method.reset()
    navigate(newRoute)
  }
  function handleCancel() {
    if (mode === "new") {
      navigate(parentRoute)
    } else if (mode === "edit") {
      navigate(viewRoute + id)
    }
  }
  function handleEdit() {
    navigate(editRoute + id)
  }

  function onSubmit(data) {
    mutation.mutate({
      formData: data,
      userID: user.userID,
      id: id,
    })
  }

  return (
    <>
      {data.isLoading ? (
        <>
          <CustomSpinner />
        </>
      ) : (
        <>
          <div className="mt-4">
            <ButtonToolBar
              mode={mode}
              saveLoading={mutation.isPending}
              handleGoBack={() => navigate(parentRoute)}
              handleEdit={() => handleEdit()}
              handleCancel={() => {
                handleCancel()
              }}
              handleAddNew={() => {
                handleAddNew()
              }}
              handleDelete={handleDelete}
              handleSave={() => method.handleSubmit(onSubmit)()}
              GoBackLabel="Business Types"
              showAddNewButton={userRights[0]?.RoleNew}
              showEditButton={userRights[0]?.RoleEdit}
              showDelete={userRights[0]?.RoleDelete}
              PreviousAndNextIDs={PreviousAndNextIDs}
              handlePrevious={() =>
                navigate(
                  `${parentRoute}/${PreviousAndNextIDs.PreviousRecordID}`
                )
              }
              handleNext={() =>
                navigate(`${parentRoute}/${PreviousAndNextIDs.NextRecordID}`)
              }
            />
          </div>
          {children}
        </>
      )}
    </>
  )
}
