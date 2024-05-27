import { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaChevronLeft, FaRegLaughSquint } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";
import LocalStorageHelper from "../../utils/LocalStorageHelper";
import { IoBookOutline } from "react-icons/io5";
export default function SideBar() {
  let location = useLocation();
  let collapseItem = location.state?.collapseItem;

  let [show, setShow] = useState(() => LocalStorageHelper.getStorage('showSidebar'));
  let [sidebar, setSidebar] = useState(false);
  // useEffect(() => {
  //   setShow(location.pathname);
  // })
  let handleShowItem = (e, name) => {
    if (show == name) {
      setShow('');
      LocalStorageHelper.setStorage('showSidebar', '');
    } else {
      setShow(name);
      LocalStorageHelper.setStorage('showSidebar', name);
    }
  }
  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebar?'toggled':''}`}
        id="accordionSidebar"
      >
        <Link
          to={"/"}
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <FaRegLaughSquint />
          </div>
          <div className="sidebar-brand-text mx-3">
            Visit website
          </div>
        </Link>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <NavLink to={"/admin"}  className="nav-link">
            <AiOutlineDashboard className="me-2" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Interface</div>

        <li className="nav-item">
          <Link onClick={(e) => handleShowItem(e, 'contact')} className={`nav-link collapsed ${show == 'contact'?'text-white':''}`}>
            <IoMdContacts />
            <span className="mx-2">Contact</span>
          </Link>
          <div id="collapseTwo" className={`collapse ${show == 'contact'?'show':''}`}>
            <div className="bg-white py-2 collapse-inner rounded animated--grow-in">
              <h6 className="collapse-header">Custom Contact:</h6>
              <NavLink to={"/admin/contact/list"} className="collapse-item">List</NavLink>
              <NavLink to={"/admin/contact/create"} className="collapse-item">Create</NavLink>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <Link onClick={(e) => handleShowItem(e, 'story')} className={`nav-link collapsed ${show == 'story'?'text-white':''}`}>
            <IoBookOutline />
            <span className="mx-2">Stories</span>
          </Link>
          <div id="collapseTwo" className={`collapse ${show == 'story'?'show':''}`}>
            <div className="bg-white py-2 collapse-inner rounded animated--grow-in">
              <h6 className="collapse-header">Stories:</h6>
              <NavLink to={"/admin/stories/list"} className="collapse-item">List Story</NavLink>
              <NavLink to={"/admin/stories/create"} className="collapse-item">Create Story</NavLink>
              <a className={`collapse-item ${collapseItem == 'chaper' ? 'active': 'd-none'}`}>Chaper</a>
            </div>
          </div>
        </li>

        {/* <hr className="sidebar-divider" />

        <div className="sidebar-heading">Addons</div>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <BsFolder2/>
            <span className="mx-2">Pages</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <a className="collapse-item" href="login.html">
                Login
              </a>
              <a className="collapse-item" href="register.html">
                Register
              </a>
              <a className="collapse-item" href="forgot-password.html">
                Forgot Password
              </a>
              <div className="collapse-divider"></div>
              <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" href="404.html">
                404 Page
              </a>
              <a className="collapse-item" href="blank.html">
                Blank Page
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <FaRegChartBar />
            <span  className="mx-2">Charts</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <CiViewTable/>
            <span className="mx-2">Tables</span>
          </a>
        </li> */}

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="rounded-circle border-0 text-white"
            style={{backgroundColor: 'rgba(110, 112, 126, 0.5)' ,height: "2.5rem", width: "2.5rem", transform: sidebar?'rotate(180deg)':'' }}
          >
            <FaChevronLeft />
          </button>
        </div>
      </ul>
    </>
  );
}
