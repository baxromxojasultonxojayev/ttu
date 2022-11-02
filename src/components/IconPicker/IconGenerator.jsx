import { memo } from "react";
import { iconsList } from "./iconsList";


const IconGenerator = ({ icon, ...props }) => {


    const findedIcon = iconsList.find(el => el.name === icon)
    if(!findedIcon) return null

  return <findedIcon.component {...props} />;
}
 
export default memo(IconGenerator);