import { StatusButton } from "../../../../../../../components";
import type { Case } from "../../../../../../../types";
import styles from "./styles.module.scss"
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

interface IProps {
    caseItem: Case
}

const CaseItem = ({ caseItem }: IProps) => {
    const navigate = useNavigate()
    
    return (
        <div className={styles.case_item}>
            <div className={styles.column}>
                <span className={styles.text}>{new Date(caseItem.entryDate).toLocaleDateString("en-CA")}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.text}>{caseItem.entryNumber}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.text}>{caseItem.caseNumber}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.text}>{caseItem.investigatedAddress}</span>
            </div>
            <div className={styles.column}>
                <StatusButton
                    caseId ={caseItem.id} 
                    value={caseItem.status}
                />
            </div>
            <div className={styles.details_button_column}>
                <button
                    className={styles.details_button}
                    onClick={() => navigate(`/case/${caseItem.id}`)}
                >
                    <IoDocumentTextOutline size={16} />
                </button>
      </div>
        </div>
    )
}

export default CaseItem;