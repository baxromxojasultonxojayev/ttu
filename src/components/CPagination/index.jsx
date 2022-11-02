import { Pagination } from "@mui/material"


const CPagination = ({ setCurrentPage = () => {}, ...props }) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '15px' }} >
      <Pagination color="primary" onChange={(e, val) => setCurrentPage(val)} { ...props } />
    </div>
  )
}

export default CPagination
