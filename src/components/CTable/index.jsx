import { Paper } from "@mui/material"
import { forwardRef } from "react"
import CPagination from "../CPagination"
import EmptyDataComponent from "../EmptyDataComponent"
import TableLoader from "../TableLoader"
import "./style.scss"

export const CTable = ({ children, count, page, setCurrentPage, removableHeight = 186, disablePagination, }) => {
  return (
    <Paper className="CTableContainer">
      <div className="table" style={{ height: removableHeight ? `calc(100vh - ${removableHeight}px)` : 'auto' }} >
        <table>{children}</table>
      </div>

      {!disablePagination && <CPagination count={count} page={page} setCurrentPage={setCurrentPage} />}
    </Paper>
  )
}

export const CTableHead = ({ children }) => {
  return <thead className="CTableHead">{children}</thead>
}

export const CTableHeadRow = ({ children }) => {
  return <tr className="CTableHeadRow">{children}</tr>
}

export const CTableBody = forwardRef(({ children, columnsCount, loader, dataLength, ...props }, ref) => {

  return (
    <tbody className="CTableBody" {...props} ref={ref} >
      {!loader && children}
      <EmptyDataComponent isVisible={!loader && !dataLength}  />
      <TableLoader isVisible={loader} columnsCount={columnsCount} />
    </tbody>
  )
})

export const CTableRow = ({ children, ...props }) => {
  return <tr className="CTableRow" {...props} >{children}</tr>
}

export const CTableCell = ({ children, className="", ...props }) => {
  return (
    <td className={`CTableCell ${className}`} {...props}>
      {children}
    </td>
  )
}
