import Button from '@mui/material/Button';
import styles from './styles.module.scss'
import { CustomModal } from '../../../../../../../../../components/CustomModal'
import { customButtonSx } from '../../../../../../../../../styles/customSx'
import { IoAddCircleSharp } from 'react-icons/io5'
import Divider from '@mui/material/Divider'
import CaseItem from '../CaseItem'
import type { Case, User } from '../../../../../../../../../types'
import { useState } from 'react'
import { AddCaseModal } from '../../../../../../../Cases/components';
import { ListSkeleton } from '../../../../../../../../../components';
import { incrementUserCaseCount } from '../../../../../../../../../store/slices/users.slice';
import { useAppDispatch } from '../../../../../../../../../store/hooks';

interface IProps {
    open: boolean
    setOpen: (open: boolean) => void
    cases: Case[]
    user: User
    loading: boolean
}

const AssignmentModal = ({ open, setOpen, cases, user, loading }: IProps) => {
    const [openNewCaseModal, setOpenNewCaseModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleCloseNewCaseModal = () => {
        setOpenNewCaseModal(false);
        setOpen(false);
    }

    const handleOpenNewCaseModal = () => {
        setOpenNewCaseModal(true);
        setOpen(false);
    }


    const handleUserCaseCount = () => {
        dispatch(incrementUserCaseCount(user.id));
    }

    return (
        <>
            <CustomModal open={open} handleClose={() => {
                setOpen(false);
            }}>
                <div className={`${styles.modal_content} box`}>
                    <div className={styles.header}>
                        <div className={styles.user_name}>
                            <span className={`${styles.name} title`}>
                                {user.first_name} {user.last_name}
                            </span>
                        </div>
                        <Button
                            variant="contained"
                            sx={customButtonSx}
                            className={styles.add_btn}
                            onClick={handleOpenNewCaseModal}
                            size='small'
                        >
                            <IoAddCircleSharp size={20} />
                            Նոր գործ
                        </Button>
                    </div>
                    <Divider />
                    <div className={styles.body}>
                        <div className={styles.cases}>
                            {loading ? (
                                <ListSkeleton count={3} height={50} />
                            ) : cases.map((item: Case) => (
                                <CaseItem
                                    key={item.id}
                                    caseData={item}
                                    userId={user.id as number}
                                    setOpenModal={setOpen}
                                    handleUserCaseCount={handleUserCaseCount}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </CustomModal>
            <AddCaseModal
                assignedId={user.id}
                open={openNewCaseModal}
                handleClose={handleCloseNewCaseModal}
            />
        </>

    )
}

export default AssignmentModal