import { useLocation } from 'react-router'
import { MenuItem } from '../../components/index.ts'
import styles from './styles.module.scss'
import type { IMenuItem } from '../../types/index.ts'


interface IProps{
  menu: IMenuItem[]
}

const Sidebar = ({menu}:IProps) => {
  const location = useLocation()

  return (
    <div className={styles.wrapper}>
      <nav className={styles.content}>
        {
          menu.map((item, i) => (
            <MenuItem
              key={i}
              {...item}
              active={location.pathname === item.href}
            />
          ))
        }
      </nav>
    </div>
  )
}


export default Sidebar