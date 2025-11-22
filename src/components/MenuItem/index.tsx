import { useNavigate } from 'react-router'
import styles from './styles.module.scss'
import type { IMenuItem } from '../../types'

type Props = IMenuItem & {
    key: string | number
    active: boolean
}



const MenuItem = ({ href, label, icon, active }: Props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(href)
    }

    return (
        <div className={`${styles.item} ${active && styles.active}`} onClick={handleClick}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    {icon as React.ReactNode}
                </div>
                <span className={styles.text}>
                    {label}
                </span>
            </div>
        </div>
    )
}

export default MenuItem
