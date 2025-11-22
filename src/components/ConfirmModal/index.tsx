import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { CustomModal } from '../CustomModal'
import { customButtonSx } from '../../styles/customSx'
import Box from '@mui/material/Box'

interface IProps {
    open: boolean
    onClose: Dispatch<SetStateAction<boolean>>
    handleConfirm: () => void
}

const ConfirmModal = ({ open, onClose, handleConfirm }: IProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const onConfirm = async () => {
        setLoading(true)
        await handleConfirm();
        setLoading(false)
        onClose(false)
    }
    return (
        <CustomModal
            open={open}
            handleClose={() => onClose(false)}
        >
            <Box className={styles.content}>
                <h2 className={`title ${styles.title}`}>Հաստատե՞լ</h2>
                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onClose(false)}
                        sx={{ textTransform: 'none' }}
                    >
                        Ոչ
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        sx={customButtonSx}
                        loading={loading}
                    >
                        Այո
                    </Button>
                </div>
            </Box>
        </CustomModal>
    )   
}

export default ConfirmModal;

