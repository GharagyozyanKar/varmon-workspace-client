import { Navigate } from "react-router-dom";
import {
  AdminDashboard,
  SignIn,
  ActivationPage,
  Team,
  Cases,
  AdminWrapper,
  UserWrapper,
  Workspace,
  Archive,
  ForgotPassword,
  UserProfile,
  Profile,
} from "../features";
import CaseDetails from "../features/shared/CaseDetails";
import ResetPassword from "../features/shared/ResetPassword";
import { Layout } from "../layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "case/:id", element: <CaseDetails /> },
      {
        path: "admin",
        element: <AdminWrapper />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "team", element: <Team /> },
          { path: "cases", element: <Cases /> },
          { path: "archive/:id?", element: <Archive /> },
          { path: "user/:id", element: <UserProfile /> },
        ],
      },
      {
        path: "user",
        element: <UserWrapper />,
        children: [
          { path: "", element: <Profile /> },
          { path: "workspace", element: <Workspace /> },
          { path: "archive", element: <Archive /> },
        ],
      },
    ],
  },
  { path: "login", element: <SignIn /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "activate/:id", element: <ActivationPage /> },
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;