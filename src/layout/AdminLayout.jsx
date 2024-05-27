import { Outlet } from 'react-router-dom';
import '../assets/css/all.min.css';
import '../assets/css/custom-font.css';
import '../assets/css/sb-admin-2.min.css';
import SideBar from '../components/SideBar';


export default function AdminLayout({children}) {

  return (
    <div id="wrapper">
        <SideBar />
        {children}
        <Outlet />
    </div>
  )
}

