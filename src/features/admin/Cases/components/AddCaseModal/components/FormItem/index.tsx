import TextField from '@mui/material/TextField'
import styles from './styles.module.scss'
import { customFieldSx } from "../../../../../../../styles/customSx"

interface IProps {
    type: "text" | "date" | "number"
    label: string
    value: string | number | null  
    handleChange: (value: string) => void
    required?: boolean
    error?: boolean
}

const FormItem = ({ type, label, value, handleChange, required = false, error = false}: IProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                {label}
            </div>
            <div className={styles.value}>
                <TextField
                    className={styles.field}
                    type={type}
                    value={value || ""}
                    required={required}
                    onChange={(e) => handleChange(e.target.value)}
                    sx={customFieldSx}
                    error={error && (required && !value)}
                    helperText={error && required && !value && `${label}ը պարտադիր է`}
                />
            </div>
        </div>
    )
}

export default FormItem