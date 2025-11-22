import type { Case } from '../../../../../../../types'
import styles from './styles.module.scss'
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ConfirmModal } from '../../../../../../../components';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { useSnackbar } from '../../../../../../../hooks/useSnackbar';
import { setCaseStatusClosedThunk } from '../../../../../../../store/thunks/dashboard.thunk';

interface IProps {
  caseItem: Case,
}

const CaseItem = ({ caseItem }: IProps) => {
  const [confirmModal, setCofirmModal] = useState<boolean>(false);
  const showSnackbar = useSnackbar();

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const hanldeCloseCase = async () => {
    const result = await dispatch(setCaseStatusClosedThunk(caseItem.id));
    
    if (result?.meta?.requestStatus === 'rejected') {
      showSnackbar("Գործը դեռ վճարված չէ․ հնարավոր չէ փակել:", "error")
      return;
    }
    showSnackbar("Գործը փակված է", "success")
  }

  const convertIsPaidToDisplay = (isPaid: boolean | undefined) => {
    if(caseItem.payment_type === 'for_free') return 'Անվճար';
    return isPaid ? 'Վճարված' : 'Չվճարված';
  }

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
        <span className={styles.text}>{convertIsPaidToDisplay(caseItem.isPaid)}</span>
      </div>
      <div className={`${styles.column} ${styles.action_column}`}>
        <span
          className={styles.close}
          onClick={() => setCofirmModal(true)}
        >
          Փակել
        </span>
        <button
          className={styles.done_button}
          onClick={() => navigate(`/case/${caseItem.id}`)}
        >
          <IoDocumentTextOutline size={16} />
        </button>
      </div>
      <ConfirmModal
        onClose={setCofirmModal}
        open={confirmModal}
        handleConfirm={hanldeCloseCase}
      />
    </div>
  )
}

export default CaseItem