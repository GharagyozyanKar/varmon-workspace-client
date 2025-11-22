import styles from './styles.module.scss'
import { IoAdd } from "react-icons/io5";
import { useState } from 'react';
import type { Case } from '../../../../../../../../../types';
import { assignCase } from '../../../../../../../../../api/case';
import { ConfirmModal } from '../../../../../../../../../components/';

interface IProps {
  caseData: Case,
  userId: string | number
  setOpenModal: (open: boolean) => void
  handleUserCaseCount: () => void
}


const CaseItem = ({ caseData, userId, setOpenModal, handleUserCaseCount }: IProps) => {
  const [confirmModal, setCofirmModal] = useState<boolean>(false);
  const assignCaseModal = () => {
    setCofirmModal(true);
  }

  const handleConfirm = async () => {
    const result = await assignCase(caseData.id, userId);
    if (result.status === 'ok') {
      setOpenModal(false);
      handleUserCaseCount();
    }
  }

  return (
    <div className={styles.case_item}>
      <div className={styles.column}>
        <span className={styles.text}>{caseData.entryNumber}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.text}>
          {caseData.caseNumber}
        </span>
      </div>
      <div className={styles.column}>
        <span className={styles.text}>
          {caseData.investigatedAddress}
        </span>
      </div>
      <div className={`${styles.column} ${styles.assigned_btn}`}>
        <button
          className={styles.done_button}
          onClick={assignCaseModal}
        >
          <IoAdd size={16} />
        </button>
      </div>
      <ConfirmModal
        onClose={setCofirmModal}
        open={confirmModal}
        handleConfirm={handleConfirm}
      />
    </div>
  )
}

export default CaseItem