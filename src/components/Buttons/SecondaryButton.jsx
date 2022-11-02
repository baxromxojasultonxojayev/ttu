import styles from "./style.module.scss"

const SecondaryButton = ({ children, className, ...props }) => {
  return ( <button className={`${styles.button} ${styles.secondary} ${className}`} {...props} >{ children }</button> );
}
 
export default SecondaryButton;