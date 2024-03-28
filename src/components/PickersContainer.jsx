import styles from "./Picker.module.css";

function PickersContainer({ children }) {
  return <div className={styles.pickersContainer}>{children}</div>;
}

export default PickersContainer;
