import { Skeleton } from "@mui/material"
import {useMemo} from 'react'
import { CTableCell, CTableRow } from "../CTable"

const TableLoader = ({isVisible = false, columnsCount = 1, rowsCount = 10}) => {

  const columns = useMemo(() => {
    return new Array(columnsCount).fill(0)
  }, [columnsCount])

  const rows = useMemo(() => {
    return new Array(rowsCount).fill(0)
  }, [rowsCount])

  if(!isVisible) return null

  return (
    <>
      {
        rows.map((_, index) => (
          <CTableRow key={index} >
            {
              columns.map((_, index) => (
                <CTableCell key={index} ><Skeleton /></CTableCell>
              ))
            }
          </CTableRow>
        ))
      }
    </>
  )
}

export default TableLoader
