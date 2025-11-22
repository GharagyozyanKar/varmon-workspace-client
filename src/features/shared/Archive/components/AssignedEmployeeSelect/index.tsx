import FormControl from '@mui/material/FormControl';
import styles from './styles.module.scss'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cutName } from '../../../../../helpers/textCutter';
import { useAppSelector } from '../../../../../store/hooks';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { customSelectSx } from '../../../../../styles/customSx';

interface IProps {
    handleSelect: (value: number) => void,
    userId?: number
}

const AssignedEmployeeSelect = ({ handleSelect, userId}: IProps) => {
    const users = useAppSelector(state => state.users.users);
    const [assignEmployee, setAssignEmployee] = useState<number | null>(userId || null);

    return (
        <div className={styles.assign_employee_select}>
            <FormControl fullWidth size="small" sx={customSelectSx}>
                <InputLabel id="1" sx={{ fontSize: '14px' }}>Մակագրում</InputLabel>
                <Select
                    labelId="1"
                    id='1'
                    label="Մակագրում"
                    onChange={(e) => {
                        setAssignEmployee(e.target.value);
                        handleSelect(Number(e.target.value))
                    }}
                    value={assignEmployee || ""}
                    sx={{ color: "#1E3A8A", fontSize: '14px' }}
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 150, overflowY: "auto" }
                        }
                    }}
                >
                    <MenuItem value={""} style={{ color: "gray" }}>Չընտրված</MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {cutName(user.first_name, user.last_name)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default AssignedEmployeeSelect;