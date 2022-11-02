import { Card } from "@mui/material";



const TableCard = ({ children }) => {
  return ( <div style={{ padding: '16px' }}>
    <Card style={{ padding: '16px' }} >
      {children}
    </Card>
  </div> );
}
 
export default TableCard;