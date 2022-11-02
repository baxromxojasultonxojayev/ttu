
import "./style.scss"

const TabCounter = ({ count }) => {
  return ( <div className="TabCounter">
    {count ?? 0}
  </div> );
}
 
export default TabCounter;