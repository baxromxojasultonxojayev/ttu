import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import styles from "./style.module.scss"

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
