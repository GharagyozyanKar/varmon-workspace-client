import Divider from '@mui/material/Divider'
import { CustomModal } from '../../../../../components/CustomModal'
import styles from './styles.module.scss'
import { useState } from 'react'
import { INITIAL_JOB_DATA, REQUIRED_FIELDS } from './consts'
import type { Case } from '../../../../../types'
import { customButtonSx, customOutlinedButtonSx } from '../../../../../styles/customSx'
import Button from '@mui/material/Button'
import MainInfoSection from './components/MainInfoSection'
import AdditionalInfoSection from './components/AdditionalInfoSection'
import { ConfirmModal } from '../../../../../components'
import { useSnackbar } from '../../../../../hooks/useSnackbar'
import { incrementUserCaseCount } from '../../../../../store/slices/users.slice'
import { useAppDispatch } from '../../../../../store/hooks'
import { addCaseThunk } from '../../../../../store/thunks/cases.thunk'


interface IProps {
  open: boolean
  handleClose: () => void
  assignedId?: string | number | null
}
type valueType = string | number | null | boolean


const AddJobModal = ({ open, handleClose, assignedId = null }: IProps) => {
  const [form, setForm] = useState(
    assignedId ? { ...INITIAL_JOB_DATA, assigned_employee_id: assignedId } as Partial<Case> : INITIAL_JOB_DATA
  )
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const showSnackbar = useSnackbar()

  const handleChange = (value: valueType, key: keyof Case) => {
    setForm({ ...form, [key]: value })
  }

  const handleConfirm = async () => {
    setLoading(true)
    const missingFields = REQUIRED_FIELDS.filter(field => !form[field])

    if (missingFields.length > 0) {
      showSnackbar('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը։', 'error')
      setError(true);
      setLoading(false)
      return
    }

    try {
      const normalizedForm = {
        ...form,
        price: Number(form.price),
        entryDate: new Date(form.entryDate + "T00:00:00.000Z")
      }

      dispatch(addCaseThunk(normalizedForm as Case)).unwrap();
      
      if(normalizedForm.assigned_employee_id) {
        dispatch(incrementUserCaseCount(normalizedForm.assigned_employee_id));
      }

      setForm(INITIAL_JOB_DATA)
      handleClose()
      showSnackbar('Գործը հաջողությամբ ավելացվել է', 'success')
    } catch (error) {
      console.log(error)
      showSnackbar('Չհաջողվեց ավելացնել գործը', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setForm(INITIAL_JOB_DATA)
    setError(false)
    handleClose()
  }

  return (
    <>
      <CustomModal open={open} handleClose={handleModalClose}>
        <div className={styles.content}>

          <h3 className={`title ${styles.main_title}`}>Ավելացնել նոր գործ</h3>

          <Divider className={styles.divider} />

          <div className={styles.main_info}>
            <h3 className={`title ${styles.title}`}>Հիմնական</h3>
            <MainInfoSection form={form} handleChange={handleChange} error={error} />
          </div>

          <Divider />

          <div className={styles.additional_info}>
            <h3 className={`title ${styles.title}`}>Լրացուցիչ</h3>
            <AdditionalInfoSection form={form} handleChange={handleChange} />
          </div>


          <div className={styles.actions}>
            <Button
              variant="outlined"
              sx={customOutlinedButtonSx}
              className={styles.btn}
              onClick={handleClose}
            >
              Չեղարկել
            </Button>
            <Button
              variant="contained"
              sx={customButtonSx}
              className={styles.btn}
              onClick={() => setConfirmModal(true)}
              loading={loading}
            >
              Ավելացնել
            </Button>
          </div>
        </div>

      </CustomModal >
      <ConfirmModal
        open={confirmModal}
        onClose={setConfirmModal}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default AddJobModal