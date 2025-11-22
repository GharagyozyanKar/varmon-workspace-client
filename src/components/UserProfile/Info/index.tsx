import { useState, useEffect, useMemo } from "react"
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { customButtonSx, customFieldSx } from '../../../styles/customSx'
import type { User } from "../../../types"
import styles from "./styles.module.scss"
import { updateUser } from "../../../api/user"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { updateUserInfo } from "../../../store/slices/users.slice"
import { setUser } from "../../../store/slices/auth.slice"

interface FormData {
    first_name: string
    last_name: string
    email: string
}

const Info = ({ user }: { user: User | null }) => {
    const [hasChanges, setHasChanges] = useState(false)
    const [loading, setLoading] = useState(false)
    const authUser = useAppSelector((state) => state.auth.user)

    const { control, handleSubmit, watch, reset } = useForm<FormData>({
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || ""
        }
    })

    const dispatch = useAppDispatch()

    const watchedValues = watch()

    const originalValues = useMemo(() => ({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || ""
    }), [user?.first_name, user?.last_name, user?.email])


    useEffect(() => {
        reset({
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || ""
        })
    }, [user, reset])

    useEffect(() => {
        const isEdited = JSON.stringify(watchedValues) !== JSON.stringify(originalValues)
        setHasChanges(isEdited)
    }, [watchedValues, originalValues])

    const onSubmit = async (data: FormData) => {
        if (!user) return

        setLoading(true)

        try {
            const res = await updateUser(user.id, data as User)
            dispatch(updateUserInfo(res.payload as User))
            reset({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            })

            originalValues.first_name = data.first_name
            originalValues.last_name = data.last_name

            if (user.id === authUser?.id) {
                dispatch(setUser(res.payload as User))
            }

            setHasChanges(false)
        } catch (error) {
            console.error('Error updating user info:', error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className={`${styles.info} box`}>
            <h3 className="title">Աշխատակցի տվյալներ</h3>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className={styles.field}
                            label="Անուն"
                            variant="outlined"
                            type="text"
                            {...field}
                            sx={customFieldSx}
                        />
                    )}
                />

                <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className={styles.field}
                            label="Ազգանուն"
                            variant="outlined"
                            type="text"
                            {...field}
                            sx={customFieldSx}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className={styles.field}
                            label="Էլ․ Հասցե"
                            variant="outlined"
                            type="email"
                            {...field}
                            sx={customFieldSx}
                            disabled
                        />
                    )}
                />

                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.btn}
                        sx={customButtonSx}
                        disabled={!hasChanges || loading}
                        loading={loading}
                    >
                        Պահպանել
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Info