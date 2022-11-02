import { CircularProgress } from "@mui/material"
// import Droppable from "react-drag-and-drop/lib/Droppable"
import "./style.scss"
import { Container } from "react-smooth-dnd"

const DroppableBlock = ({ onDrop, loader }) => {
  return (
    <Container 
      onDrop={onDrop}
      groupName="1"
      behaviour="drop-zone"
    >
      {/* <Container
        onDrop={onDrop}
        groupName="1"
        shouldAnimateDrop={false}
        style={{
          top: 0,
          left: 0,
          height: "120px",
          width: "100%",
          position: "absolute",
          zIndex: 10,
        }}
      ></Container> */}

      {loader ? (
        <div className="DroppableBlock silver-bottom-border">
          <div className="droppable-area">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <div className="DroppableBlock silver-bottom-border">
          <div className="droppable-area">Drag & drop subtasks to add</div>
        </div>
      )}
    </Container>
  )
}

export default DroppableBlock
