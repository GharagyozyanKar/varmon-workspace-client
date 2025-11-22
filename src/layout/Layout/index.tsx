import styles from "./styles.module.scss"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks"; 
import { setUser } from "../../store/slices/auth.slice";
import { hideSnackbar } from "../../store/slices/snackbar.slice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/auth";
import type { User } from "../../types";
import { Header, Sidebar } from "../../layout";
import { ADMIN_MENU, USER_MENU } from "./consts";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Layout = () => {
    const user = useAppSelector(state => state.auth.user);
    const { open, message, severity } = useAppSelector(state => state.snackbar);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        if (!user) {
            getCurrentUser()
                .then(res => {
                    const currentUser = res.payload as User;
                    dispatch(setUser(currentUser));

                    if (location.pathname === "/") {
                        const target = currentUser.role === "admin" ? "/admin" : "user/workspace";
                        navigate(target, { replace: true });
                    }
                })
                .catch(() => {
                    dispatch(setUser(null));
                    navigate("/login", { replace: true });
                })
        } else {
            if (location.pathname === "/") {
                const target = user.role === "admin" ? "/admin" : "/user/workspace";
                navigate(target, { replace: true });
            }
        }
    }, []);

    return <>
        {
            user && (
                <div className={styles.wrapper}>
                    <div className={`container ${styles.content}`}>
                        <div className={styles.header}>
                            <Header />
                        </div>
                        <div className={styles.sidebar}>
                            <Sidebar menu={user?.role === "admin" ? ADMIN_MENU : USER_MENU} />
                        </div>
                        <div className={styles.main}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            )
        }
        
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => dispatch(hideSnackbar())}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert 
                onClose={() => dispatch(hideSnackbar())} 
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    </>

}

export default Layout;