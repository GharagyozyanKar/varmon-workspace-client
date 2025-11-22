import styles from './styles.module.scss'
import {  useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { UserItem } from '../../../../../components'
import { useEffect } from 'react'
import { fetchTeamData } from '../../../../../store/thunks/team.thunk'

const UsersList = () => {
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const thunk = dispatch(fetchTeamData())

    return () => {
      thunk.abort()
    }
  }, [])  
  
  return (
    <div className={`${styles.wrapper} box`}>
      <div className={styles.content}>
        <h3 className={`title ${styles.title}`}>Աշխատակիցներ</h3>
        <div className={styles.users}>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersList