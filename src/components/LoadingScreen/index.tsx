import CircularProgress from "@mui/material/CircularProgress";
import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress size={50}/>
    </div>
  );
};

export default Loading;