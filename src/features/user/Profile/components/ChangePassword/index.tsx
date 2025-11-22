import TextField from '@mui/material/TextField'
import { PasswordField } from '../../../../../components'
import styles from './styles.module.scss'
import { customFieldSx, customOutlinedButtonSx } from '../../../../../styles/customSx'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { updatePassword } from '../../../../../api/auth'
import { useSnackbar } from '../../../../../hooks/useSnackbar'
import { useState } from 'react'
import { AxiosError } from 'axios'

type FormValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, getValues, setError, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const showSnackbar = useSnackbar()
  const onSubmit = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { type: 'validate', message: 'Գաղտնաբառերը չեն համընկնում' })
      return
    } else if (data.currentPassword === data.newPassword) {
      return
    }

    setLoading(true)

    try {
      await updatePassword(data.currentPassword, data.newPassword)
      showSnackbar('Գաղտնաբառը հաջողությամբ փոխվել է', 'success')
      reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          setError('currentPassword', { type: 'server', message: 'Ներկա գաղտնաբառը սխալ է' })
        } else {
          showSnackbar('Չհաջողվեց փոխել գաղտնաբառը', 'error')
        }
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={`${styles.wrapper} box`}>
      <h3 className="title">Փոխել Գաղտնաբառը</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          label="Գաղտնաբառ"
          variant='outlined'
          sx={customFieldSx}
          fullWidth
          error={Boolean(errors.currentPassword)}
          helperText={errors.currentPassword?.message}
          {...register('currentPassword', { required: 'Պարտադիր դաշտ' })}
        />
        <TextField
          label="Նոր գաղտնաբառ"
          variant='outlined'
          sx={customFieldSx}
          fullWidth
          type='password'
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'Պարտադիր դաշտ',
            minLength: { value: 6, message: 'Առնվազն 6 նիշ' }
          })}
        />
        <TextField
          label="Կրկնել նոր գաղտնաբառը"
          variant='outlined'
          sx={customFieldSx}
          fullWidth
          type='password'
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Պարտադիր դաշտ',
            validate: (value) => value === getValues('newPassword') || 'Գաղտնաբառերը չեն համընկնում'
          })}
        />
        <div className={styles.actions}>
          <Button
            variant='outlined'
            sx={customOutlinedButtonSx}
            type='submit'
            disabled={isSubmitting || loading}
          >
            {loading ? 'Պահպանվում է...' : 'Փոխել'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword