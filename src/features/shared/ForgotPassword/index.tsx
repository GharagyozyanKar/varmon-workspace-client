import { customFieldSx } from '../../../styles/customSx';
import Button from '@mui/material/Button';
import styles from './styles.module.scss'
import { customButtonSx } from '../../../styles/customSx';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { forgotPassword as forgotPasswordApi } from '../../../api/auth';

const ForgotPassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [requestError, setRequestError] = useState<string | null>(null)

    const handleSubmit = async () => {
        setLoading(true)
        forgotPasswordApi(email)
            .then((res) => {
                if (res.status === 'ok') {
                    setEmail('')
                    setRequestError('Գաղտնաբառի վերականգնման հղումը ուղարկվել է ձեր էլ. փոստին')
                }
            })
            .catch(() => {
                setRequestError('Չհաջողվեց ուղարկել վերականգնման հղումը')
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.content}`}>
                <div className={styles.logo}>
                    <img src="/logo.png" alt="logo" />
                </div>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_header}>
                        <h2>Մոռացե՞լ եք գաղտնաբառը</h2>
                        <p>Մուտքագրեք ձեր էլ. փոստը՝ գաղտնաբառի վերականգնման հղումը ստանալու համար</p>
                    </div>

                    <div className={styles.form}>
                        <TextField
                            className={styles.field}
                            label="Էլ․ Հասցե"
                            variant="outlined"
                            type='text'
                            sx={customFieldSx}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            type='submit'
                            className={styles.btn}
                            sx={customButtonSx}
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Վերականգնել
                        </Button>
                        <p className={styles.error_helper}>{requestError}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;