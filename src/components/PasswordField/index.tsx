import { useState } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const PasswordField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

 
  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;