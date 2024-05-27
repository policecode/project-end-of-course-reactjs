import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/all.min.css";
import "../assets/css/custom-font.css";
import "../assets/css/sb-admin-2.min.css";
import SideBar from "../components/template-admin/SideBar";
import Topbar from "../components/template-admin/Topbar";
import Footer from "../components/template-admin/Footer";
import CheckAuth from "../components/auth/CheckAuth";
export default function AdminPage() {
  
  return (
    <div id="wrapper">
      <CheckAuth action="isLogin" />
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <Outlet />
        </div>
        <Footer/>
      </div>
    </div>
  );
}
