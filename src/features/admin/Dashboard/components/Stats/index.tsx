import styles from "./styles.module.scss";
import { useAppSelector } from "../../../../../store/hooks";
import { statsConfig } from "./consts";
import Skeleton from "@mui/material/Skeleton";

export const Stats = () => {
  const stats = useAppSelector(state => state.dashboard.stats);
  const loading = useAppSelector(state => state.dashboard.loading);

  return (
    <div className={styles.stats}>
      {statsConfig.map(({ key, icon: Icon, label, desc }) => (
        <div
          key={key}
          className={`${styles.stats_item} ${key === "doneYear" ? styles.year : ""}`}
        >
          <div className={styles.header}>
            <div className={styles.header_info}>
              <div className={styles.header_info_icon}>
                {loading ? <Skeleton variant="circular" width={40} height={40} /> : <Icon />}
              </div>
              {label && (
                <span>
                  {loading ? <Skeleton variant="text" width={50} /> : label}
                </span>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.info_count}>
              {loading ? <Skeleton variant="text" width={40} /> : stats?.[key]}
            </span>
            <span className={styles.info_desc}>
              {loading ? <Skeleton variant="text" width={70} /> : desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
