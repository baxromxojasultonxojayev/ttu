import styles from "./style.module.scss";

const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
