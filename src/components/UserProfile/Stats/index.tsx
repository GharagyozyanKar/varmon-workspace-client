import styles from "./styles.module.scss"
import type { IStats } from "../../../types"
import { statsConfig } from "./consts"
import Skeleton from "@mui/material/Skeleton"


interface IStatsProps {
    stats: IStats | null
    loading: boolean
}

const Stats = ({stats, loading}: IStatsProps) => {

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
                            <span>
                                {loading ? <Skeleton variant="text" width={50} /> : label}
                            </span>
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
    )
}


export default Stats