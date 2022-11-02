import LogoDisplay from "../LogoDisplay";
import "./style.scss"

const UserInfoBlock = ({ title, subtitle, img }) => {
  return ( <div className="UserInfoBlock">
    <LogoDisplay url={img} name={title} />
    <div className="info-block">
      <p className="title" >{ title }</p>
      <p className="subtitle" >{ subtitle }</p>
    </div>
  </div> )
}
 
export default UserInfoBlock;