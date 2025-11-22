import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IS_PAID_TYPES, PAYMENT_TYPES } from "../../../../../../../constants/payment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { customSelectSx } from "../../../../../../../styles/customSx";

interface IProps {
  field: string;
  label: string;
  value: string;
  disabled: boolean
  onChange: (value: string) => void;
}

const DataGridItem = ({ field, label, value, disabled, onChange }: IProps) => {
  const [fieldType, setFieldType] = useState<string>("text");
  
  useEffect(() => {
    if (field === "entryDate") {
      setFieldType("date");
    } else if (field === "price") {
      setFieldType("number");
    } else if (field === "isPaid" || field === "payment_type") {
      setFieldType("select");
    }
    else {
      setFieldType("text");
    }
  }, [field]);

  return (
    <div className={styles.dataGridItem}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {
          fieldType === "select" ? (
            <FormControl fullWidth sx={customSelectSx}>
              <Select
                id={label}
                value={value ?? null}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                size="small"
                className={`${styles.select} ${disabled ? styles.disabled : ''}`}
                sx={{
                  color: "#1E3A8A",
                  '&.Mui-disabled': {
                    cursor: 'not-allowed',           
                    pointerEvents: 'auto',           
                  },
                  '& .MuiSelect-select.Mui-disabled': {
                    cursor: 'not-allowed',           
                  }
                }}
                disabled={disabled}
              >
                <MenuItem disabled value={""} style={{ color: "gray" }}>Չընտրված</MenuItem>
                {
                  field === "payment_type" ? PAYMENT_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value} sx={{color: "#1E3A8A"}}>
                      {type.label}
                    </MenuItem>
                  ))
                    : IS_PAID_TYPES.map((type) => (
                      <MenuItem key={type.id} value={type.value} sx={{color: "#1E3A8A"}}>
                        {type.label}
                      </MenuItem>
                    ))
                }
              </Select>
            </FormControl>
          ) : (
            <input
              className={`${disabled ? styles.disabled : ''}`}
              type={fieldType}
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            />
          )
        }
      </div>
    </div>
  );
};

export default DataGridItem;