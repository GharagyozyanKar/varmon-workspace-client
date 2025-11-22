import TextField from "@mui/material/TextField"
import { customFieldSx, customCheckboxSx, customSelectSx } from "../../../../../../../styles/customSx"
import type { Case } from "../../../../../../../types"
import styles from "./styles.module.scss"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { PAYMENT_TYPES } from "../../../../../../../constants/payment"
import { useAppSelector } from "../../../../../../../store/hooks"

interface IProps {
    form: Partial<Case>
    handleChange: (val: string | number | null | boolean, key: keyof Case) => void
}

const AdditionalInfoSection = ({ form, handleChange }: IProps) => {
    const users = useAppSelector((state) => state.users.users)

    return (
        <div className={styles.additional_info_fields}>


            <div className={styles.price_field}>
                <TextField
                    label="Արժեք"
                    type="number"
                    value={form.price || ""}
                    className={styles.field}
                    disabled={form.payment_type === 'for_free'}
                    inputProps={{
                        step: 1000,
                    }}
                    onChange={(e) => handleChange(e.target.value, "price")}
                    sx={customFieldSx}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={customCheckboxSx}
                            checked={form.isPaid || false}
                            disabled={form.payment_type === 'for_free'}
                            onChange={(e) => handleChange(e.target.checked as boolean, "isPaid")}
                        />
                    }
                    label="Վճարված է"
                />
            </div>
            <div className={styles.select_field}>

                <FormControl fullWidth sx={customSelectSx}>
                    <InputLabel id="2">Վճարման տեսակ</InputLabel>
                    <Select
                        labelId="2"
                        id="2"
                        value={form.payment_type || ""}
                        label="Վճարման տեսակ"
                        onChange={(e) => handleChange(e.target.value, "payment_type")}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 150, 
                                    overflowY: "auto" 
                                }
                            }
                        }}
                    >
                        <MenuItem value={""} style={{ color: "gray" }}>Չընտրված</MenuItem>
                        {PAYMENT_TYPES.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className={styles.select_field}>
                <FormControl fullWidth sx={customSelectSx}>
                    <InputLabel id="1">Մակագրում</InputLabel>
                    <Select
                        labelId="1"
                        id="1"
                        value={form.assigned_employee_id || ""}
                        label="Մակագրում"
                        onChange={(e) => handleChange(e.target.value, "assigned_employee_id")}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 150, 
                                    overflowY: "auto" 
                                }
                            }
                        }}
                    >
                        <MenuItem value={""} style={{ color: "gray" }}>Չընտրված</MenuItem>
                        {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.first_name ?? ''} {user.last_name ?? ''}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </div>



        </div>
    )
}

export default AdditionalInfoSection