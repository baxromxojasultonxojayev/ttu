import { CircularProgress, LinearProgress, Skeleton } from "@mui/material"


const RowLoader = ({ visible }) => {
  if (!visible) return null

  return (
    <div className="RowLoader row level-4 " >
      {/* <Skeleton style={{ width: '100%' }} /> */}
      {/* <CircularProgress /> */}
      <LinearProgress style={{ width: '100%' }} />
    </div>
  )
}

export default RowLoader
