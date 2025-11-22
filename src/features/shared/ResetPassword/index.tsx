import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { customButtonSx, customFieldSx } from '../../../styles/customSx'
import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import type { IResetPasswordData } from '../../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '../../../yupSchema'
import { resetPassword, verifyToken } from '../../../api/auth'
import { useNavigate } from 'react-router'

const ResetPassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordData>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        }
    })
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const navigate = useNavigate()



    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const verify = async () => {
            try {
                await verifyToken(token);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };

        verify();
    }, [token, navigate]);


    const handleResetPassword = async (data: IResetPasswordData) => {
        setLoading(true)
        try {
            if (token) {
                await resetPassword(token, data.password);
                navigate('/login');
            }
        }catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.content}`}>
                <div className={styles.logo}>
                    <img src="/logo.png" alt="logo" />
                </div>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_header}>
                        <h2>Վերականգնել</h2>
                        <p>Խնդրում ենք մուտքագրել ձեր նոր գաղտնաբառը</p>
                    </div>

                    <form onSubmit={handleSubmit(handleResetPassword)} className={styles.form}>
                        <TextField
                            className={styles.field}
                            label="Գաղտնաբառ"
                            variant="outlined"
                            type='password'
                            sx={customFieldSx}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <TextField
                            className={styles.field}
                            label="Կրկնել գաղտնաբառը"
                            variant="outlined"
                            type='password'
                            sx={customFieldSx}
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            className={styles.btn}
                            sx={customButtonSx}
                            loading={loading}
                        >
                            Հաստատել
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
