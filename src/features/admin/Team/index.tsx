import AddUser from './components/AddUser'
import UsersList from './components/UsersList'
import styles from './styles.module.scss'



const Team = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.addUser}>
              <AddUser />
        </div>
        <div className={styles.usersList}>
          <UsersList />
        </div>
      </div>
    </div>
  )
}

export default Team