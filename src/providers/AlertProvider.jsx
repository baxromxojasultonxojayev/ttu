import Alerts from "../components/Alerts"


const AlertProvider = ({children}) => {
  return (
    <>
      <Alerts />
      {children}
    </>
  )
}

export default AlertProvider
