import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './styles.module.scss'
import { setUser } from '../../store/slices/auth.slice';
import { logoutUser } from '../../api/auth';

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    logoutUser()  
    .then(() => {
      dispatch(setUser(null));
      navigate('/login');
    })
  }

  return (
    <header className={styles.wrapper}>
        <div className={styles.logo}>
          <h1 onClick={() => navigate(`/${user?.role}`)}>Վարմօն</h1>
        </div>
        <div className={styles.main}>
          <span>{user?.first_name} {user?.last_name}</span>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}>Դուրս գալ</a>
        </div>
    </header>
  )
}


export default Header