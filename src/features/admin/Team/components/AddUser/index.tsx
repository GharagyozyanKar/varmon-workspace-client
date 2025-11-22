import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { customButtonSx, customFieldSx } from '../../../../../styles/customSx'
import { useState } from 'react'
import type { IResponse, NewUserData } from '../../../../../types'
import { ConfirmModal } from '../../../../../components'
import { addUserSchema } from '../../../../../yupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from '../../../../../hooks/useSnackbar'
import { addUserThunk } from '../../../../../store/thunks/team.thunk'
import { useAppDispatch } from '../../../../../store/hooks'

const AddUser = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const showSnackbar = useSnackbar()
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<NewUserData>({
    resolver: yupResolver(addUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: ""
    }
  })

  const watchedValues = watch()

  const onSubmit = async () => {
    setOpen(true)
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await dispatch(addUserThunk(watchedValues as NewUserData)).unwrap();
      showSnackbar('Նոր աշխատակիցը հրավիրված է', 'success')
      reset()
    } catch (error) {
      if((error as IResponse).code === "EMAIL_EXIST") {
        showSnackbar('Տվյալ էլ․ հասցեով աշխատակիցը արդեն գրանցված է', "warning")
      } else {
        showSnackbar('Չհաջողվեց հրավիրել աշխատակցին', 'error')
      }
    }
    setLoading(false)
  }

  return (
    <div className={`${styles.wrapper} box`}>
      <div className={styles.content}>
        <h3 className={`title ${styles.title}`}>Ավելացնել նոր աշխատակցի</h3>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="Անուն"
            variant="outlined"
            type='text'
            size='small'
            {...register('first_name')}
            sx={customFieldSx}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
          <TextField
            className={styles.field}
            label="Ազգանուն"
            variant="outlined"
            type='text'
            size='small'
            {...register('last_name')}
            sx={customFieldSx}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
          <TextField
            className={styles.field}
            label="Էլ․ Հասցե"
            variant="outlined"
            type='text'
            size='small'
            {...register('email')}
            sx={customFieldSx}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            size='small'
            variant="contained"
            type='submit'
            className={styles.btn}
            sx={customButtonSx}
            disabled={loading}
            loading={loading}
          >
            Ավելացնել
          </Button>
        </form>


        <ConfirmModal
          open={open}
          onClose={setOpen}
          handleConfirm={handleConfirm}
        />
      </div>
    </div>
  )
}

export default AddUser