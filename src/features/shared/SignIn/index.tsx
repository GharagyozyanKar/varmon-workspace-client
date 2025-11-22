import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { customButtonSx, customFieldSx } from "../../../styles/customSx";
import { loginUser } from "../../../api/auth";
import type { ILoginData, IResponse, User } from "../../../types";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/slices/auth.slice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AxiosError } from "axios";
import { loginSchema } from "../../../yupSchema";
import { PasswordField } from "../../../components";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: yupResolver(loginSchema) });
  const [requestError, setRequestError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ILoginData) => {
    setLoading(true);

    try {
      const res = await loginUser(data);
      const user = (res.payload as { user: User }).user;

      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as IResponse;
        if (errorData.code === "INVALID_CREDENTIALS") {
          setRequestError("Սխալ տվյալներ");
        } else {
          setRequestError("Մուտքը ձախողվեց։ Խնդրում ենք կրկին փորձել");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.content}`}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.form_header}>
            <h2>Բարի գալուստ</h2>
            <p>Մուտք գործել աշխատանքային հարթակ</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {requestError && (
              <p className={styles.error_helper}>{requestError}</p>
            )}
            <TextField
              className={styles.field}
              label="Էլ․ Հասցե"
              variant="outlined"
              type="text"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              sx={customFieldSx}
            />
            <PasswordField
              className={styles.field}
              label="Գաղտնաբառ"
              variant="outlined"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={customFieldSx}
            />
            <Button
              variant="contained"
              type="submit"
              className={styles.btn}
              sx={customButtonSx}
              loading={loading}
            >
              Մուտք
            </Button>

            <a href={"/forgot-password"} className={styles.forgot_password}>
              Մոռացե՞լ եք գաղտնաբառը{" "}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
