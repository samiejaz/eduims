import { useQuery } from "@tanstack/react-query"
import { fetchPreviousAndNextID } from "../../api/CommonDataAPI"

export function usePreviousAndNextID({
  LoginUserID,
  RecordID,
  TableName,
  IDName,
}) {
  const data = useQuery({
    queryKey: ["previousAndNextIDs", RecordID],
    queryFn: () =>
      fetchPreviousAndNextID({
        LoginUserID,
        RecordID,
        TableName,
        IDName,
      }),
    initialData: [],
    retry: false,
  })
  return data
}
