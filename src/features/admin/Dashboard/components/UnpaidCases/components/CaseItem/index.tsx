import type { Case } from '../../../../../../../types'
import styles from './styles.module.scss'
import { MdDone } from 'react-icons/md'
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ConfirmModal } from '../../../../../../../components';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { setCasePaidThunk } from '../../../../../../../store/thunks/dashboard.thunk';

interface IProps {
  caseItem: Case,
}

const paymentLabels: Record<string, string> = {
  cash: 'Կանխիկ',
  court: 'Դատական ծախս',
  transfer: 'Փոխանցում',
};

const CaseItem = ({ caseItem }: IProps) => {
  const [confirmModal, setCofirmModal] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();


  return (
    <div className={styles.case_item}>
      <div className={styles.column}>
        <span className={styles.text}>{caseItem.entryNumber}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.text}>{caseItem.price}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.text}>
          {paymentLabels[caseItem?.payment_type ?? ''] || 'Չընտրված'}
        </span>
      </div>
      <div className={`${styles.column} ${styles.done_button_column}`}>
        <button className={styles.done_button} onClick={() => setCofirmModal(true)}>
          <MdDone size={16} />
        </button>
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
        handleConfirm={() => dispatch(setCasePaidThunk(caseItem.id))}
      />
    </div>
  )
}

export default CaseItem