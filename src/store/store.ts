import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "./slices/users.slice"
import authReducer from "./slices/auth.slice"
import dashboardReducer from "./slices/dashboard.slice"
import caseReducer from "./slices/case.slice"
import snackbarReducer from "./slices/snackbar.slice"
import profileReducer from "./slices/profile.slice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: dashboardReducer,
    case: caseReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;