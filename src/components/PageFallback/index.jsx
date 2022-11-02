import RippleLoader from "../Loaders/RippleLoader"
import styles from './style.module.scss'


const PageFallback = () => {
  return (
    <div className={styles.fallbackPage}>

      <RippleLoader />

      {/* <Skeleton variant="rectangular" width={"100%"} height={56} />
      <div style={{ padding: "20px" }}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"calc(100vh - 96px)"}
        />
      </div> */}
    </div>
  )
}

export default PageFallback
