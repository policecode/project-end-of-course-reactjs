import { Outlet } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import CheckAuth from "../components/auth/CheckAuth";


export default function AuthPage() {
  return (
    <AuthLayout>
     <CheckAuth action="isLogout" />
      <Outlet />
   </AuthLayout>
  )
}

