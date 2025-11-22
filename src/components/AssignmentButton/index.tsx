import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./styles.module.scss"
import { CustomModal } from "../CustomModal";
import Divider from "@mui/material/Divider";
import { cutName } from "../../helpers/textCutter";
import type { User } from "../../types";
import { setAssignmentThunk } from "../../store/thunks/cases.thunk";

interface IProps {
    caseId: number | string,
    user: Partial<User> | null,
}

const AssignmentButton = ({ caseId, user }: IProps) => {
    const userRole = useAppSelector(state => state.auth.user?.role);
    const users = useAppSelector(state => state.users.users);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();


    const handleClick = (userId: number | string | null) => {
        if (userId !== user?.id) {
            dispatch(setAssignmentThunk({
                caseId, 
                userId: userId as number | string,
            }))
            .then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    setOpenModal(false);
                }
                // console.log(res);
            })
        }
    }

    const displayName = user ? cutName(user.first_name as string, user.last_name as string) : "Չընտրված";

    return (
        <>
            <div
                className={`${styles.caseUser} truncate ${styles[userRole as string]}`}
                onClick={() => {
                    if (userRole !== 'user') {
                        setOpenModal(true);
                    }
                }}
            >
                {displayName}
            </div>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <div className={`${styles.content} box`}>
                    <div className={styles.header}>
                        <span className={`${styles.title} title`}>Աշխատողներ</span>
                        <Divider />
                    </div>
                    <div className={styles.select}>
                        {users.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.select_item} ${user?.id === item.id ? styles.selected : ""}`}
                                onClick={() => handleClick(item.id)}
                            >
                                <span>
                                    {cutName(item.first_name as string, item.last_name as string)}
                                </span>
                            </div>
                        ))}
                        <div
                            className={`${styles.select_item} ${!user ? styles.selected : ""}`}
                            onClick={() => handleClick(null)}
                        >
                            <span>
                                Չընտրված
                            </span>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    )
}

export default AssignmentButton;