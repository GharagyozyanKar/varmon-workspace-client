import { useState } from 'react'
import { transformValue } from '../../helpers/transformFieldValue'
import type { CaseStatus, IResponse, Role } from '../../types'
import styles from './styles.module.scss'
import { CustomModal } from '../CustomModal'
import Divider from '@mui/material/Divider'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeCaseStatusThunk } from '../../store/thunks/cases.thunk'

interface IProps {
    caseId: number | string
    value: CaseStatus
    setStatus?: (value: CaseStatus) => void
}

const StatusButton = ({ caseId, value, setStatus }: IProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const userRole = useAppSelector(state => state.auth.user?.role)
    const dispatch = useAppDispatch();
    const showSnackbar = useSnackbar()


    const statusTypes = userRole === "user" ?
        ["waiting", "in_progress", "completed"] :
        ["waiting", "in_progress", "completed", "closed", "canceled"];

    const handleClick = async (status: CaseStatus) => {
        if (status !== value) {
            dispatch(changeCaseStatusThunk({ caseId, status, userRole: userRole as Role }))
                .then(res => {
                    if ((res.payload as IResponse).code === "IS_NOT_PAID") {
                        showSnackbar("Գործը դեռ վճարված չէ․ հնարավոր չէ փակել:", "error");
                    } else {
                        setStatus?.(status as CaseStatus);
                    }
                    setOpenModal(false);
                })
        }
    }

    const displayName = transformValue("status", value);
    const canOpenModal = !(userRole === 'user' && (value === 'canceled' || value === 'closed'));

    return (
        <>
            <div
                className={`${styles.caseStatus} ${styles[value?.replace(" ", "")]} truncate ${styles[String(canOpenModal)]}`}
                onClick={() => {
                    if (canOpenModal) {
                        setOpenModal(true);
                    }
                }}
            >
                {displayName}
            </div>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <div className={`${styles.content} box`}>
                    <div className={styles.header}>
                        <span className={`${styles.title} title`}>Կարգավիճակ</span>
                        <Divider />
                    </div>
                    <div className={styles.select}>
                        {
                            statusTypes.map(status => (
                                <div
                                    key={status}
                                    className={`${styles.select_item} ${value === status ? styles.selected : ""}`}
                                    onClick={() => handleClick(status as CaseStatus)}
                                >
                                    <span>
                                        {transformValue("status", status)}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </CustomModal>

        </>
    )
}

export default StatusButton
