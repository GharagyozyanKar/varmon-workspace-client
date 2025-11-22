import Button from '@mui/material/Button'
import styles from './styles.module.scss'
import { customButtonSx } from '../../../styles/customSx'
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { CasesList } from './components';
import { AddCaseModal } from './components';
import { getCurrentCasesThunk } from '../../../store/thunks/cases.thunk';


const Cases = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const thunk = dispatch(getCurrentCasesThunk())
    return () => {
      thunk.abort()
    }
  }, [dispatch])


  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={`${styles.cases} box`}>
          <div className={styles.header}>
            <Button
              variant="contained"
              sx={customButtonSx}
              className={styles.add_btn}
              onClick={() => setOpen(true)}
            >
              <IoAddCircleSharp size={20} />
              Նոր գործ
            </Button>
          </div>
          <CasesList />
        </div>
      </div>
      <AddCaseModal open={open} handleClose={handleClose}/>
    </div>
  )
}

export default Cases