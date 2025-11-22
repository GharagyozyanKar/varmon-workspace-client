import styles from './styles.module.scss'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { customSelectSx } from '../../styles/customSx'
import { useAppSelector } from '../../store/hooks'
import type { Case } from '../../types'

interface IProps {
    handleFieldChange: (field: keyof Case, value: string | number | boolean) => void
    caseData: Case
}

const AssignmentField = ({ handleFieldChange, caseData }: IProps) => {
    const users = useAppSelector(state => state.users.users)
    

    return (
        <FormControl fullWidth sx={customSelectSx}>
            <InputLabel id="2">Մակագրում</InputLabel>
            <Select
                labelId="2"
                id="2"
                value={caseData.assigned_employee_id || ''}
                label="Մակագրում"
                className={styles.select}
                onChange={(e) =>
                    handleFieldChange("assigned_employee_id", Number(e.target.value) || '')
                }
                sx={{ color: "#1E3A8A" }}
                MenuProps={{
                    PaperProps: {
                        style: { maxHeight: 150, overflowY: "auto" }
                    }
                }}
            >
                <MenuItem value={""} style={{ color: "gray" }}>
                    Չընտրված
                </MenuItem>
                {users.map((user) => (
                    <MenuItem key={user.id} value={user.id} sx={{ color: "#1E3A8A" }}>
                        {user.first_name} {user.last_name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default AssignmentField