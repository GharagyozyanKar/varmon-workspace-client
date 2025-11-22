import type { Case } from "../../../../../types";
import styles from "./styles.module.scss";
import CaseItem from "./components/CaseItem";
import { HeaderSkeleton, ListSkeleton } from "../../../../../components";
import Button from "@mui/material/Button";
import { customButtonSx } from "../../../../../styles/customSx";
import { useNavigate } from "react-router";

interface IProps {
    cases: Case[]
    loading: boolean
    userId: string | number
}

const LastFiveClosedCases = ({cases, loading, userId} : IProps) => {
    const navigate = useNavigate()
    
    return (
        <div className={`${styles.cases} box`}>
            <div className={styles.header}>
                {loading ? (
                    <HeaderSkeleton width={180} height={30} />
                ) : (
                    <span className="title">Վերջին փակված գործեր</span>
                )}
            </div>
            <div className={styles.cases_closed}>
                {loading ? (
                    <ListSkeleton count={3} height={50} />
                ) : (
                    cases?.map((caseItem) => (
                        <CaseItem key={caseItem.id} caseItem={caseItem} />
                    ))
                )}
            </div>
            <div className={styles.actions}>
                <Button 
                    className={styles.more_btn}
                    variant="contained"
                    sx={customButtonSx}
                    onClick={() => navigate(`/admin/archive/${userId}`)}              
                >
                    Ավելին
                </Button>
            </div>
        </div>
    )
}

export default LastFiveClosedCases;