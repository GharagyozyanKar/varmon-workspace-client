import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams, useNavigate, useLocation } from "react-router";
import { getUserByActivationToken } from "../../../api/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IActivationData } from "../../../types";
import { activationSchema } from "../../../yupSchema";
import { customButtonSx, customFieldSx } from "../../../styles/customSx";
import { activateUser } from "../../../api/auth";

const ActivationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IActivationData>({
    resolver: yupResolver(activationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<string>();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  useEffect(() => {
    if (id) {
      getUserByActivationToken(id)
        .then((res) => {
          setValue("email", (res.payload as { email: string }).email);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data: IActivationData) => {
    setLoading(true);
    setRequestError(null);

    try {
      if (token) {
        await activateUser(token, data);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setRequestError("Ակտիվացումը ձախողվեց։ Խնդրում ենք կրկին փորձել");
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
            <h2 className="title">Բարի գալուստ</h2>
            <p>Ակտիվացրեք ձեր աշխատանքային հարթակը</p>
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
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              disabled={true}
              sx={customFieldSx}
            />
            <TextField
              className={styles.field}
              label="Գաղտնաբառ"
              variant="outlined"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={customFieldSx}
            />
            <TextField
              className={styles.field}
              label="Կրկնել գաղտնաբառ"
              variant="outlined"
              type="password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={customFieldSx}
            />
            <Button
              variant="contained"
              type="submit"
              className={styles.btn}
              sx={customButtonSx}
              loading={loading}
            >
              Ակտիվացնել
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
