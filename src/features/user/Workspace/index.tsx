import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import CurrentCases from './components/CurrentCases';
import WaitingCases from './components/WaitingCases';
import styles from './styles.module.scss'
import { getUserCasesThunk } from '../../../store/thunks/cases.thunk';

const Workspace = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()


  useEffect(() => {
    const thunk = dispatch(getUserCasesThunk(user?.id as string | number));

    return () => thunk.abort();
  }, [])

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.content}>
        <CurrentCases />
        <WaitingCases />
      </div>
    </div>
  )
}

export default Workspace;