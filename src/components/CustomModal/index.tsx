import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from '@mui/material/Modal'
import styles from './styles.module.scss'

interface IProps {
    open: boolean
    handleClose: () => void
    children: React.ReactNode
}

export const CustomModal = ({ open, handleClose, children }: IProps) => {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

    useEffect(() => {
        let root = document.getElementById('modal-root')
        if (!root) {
            root = document.createElement('div')
            root.setAttribute('id', 'modal-root')
            document.body.appendChild(root)
        }
        setPortalRoot(root)
    }, [])

    if (!portalRoot) return null

    return ReactDOM.createPortal(
        <Modal
            open={open}
            onClose={handleClose}
            className={styles.modal}
            sx={{
                '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(5px)',
                },
            }}
        >
            <div className={styles.content}>{children}</div>
        </Modal>,
        portalRoot
    )
}
