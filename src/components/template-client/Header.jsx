import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector } from "../../store/selectors";
import { IoIosLogOut } from "react-icons/io";
import authSlice from "../../redux-tolkit/authSlice";
import avatarDefault from "../../assets/image/undraw_profile.svg";
import { FaHome } from "react-icons/fa";
import FormSearch from "./part/FormSearch";
import CategorySelect from "./part/CategorySelect";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <>
      <nav style={{ backgroundColor: "#14425d" }}>
        <div className="container">
          <div className="row text-white py-2 position-relative">
            <div className="col-1 d-flex align-items-center">
              <Link to={'/'}>
                <FaHome  className="text-white fs-3" />
              </Link>
            </div>
            <div className="col-3">
              <CategorySelect type={'select'}/>
            </div>
            <div className="col-4">
              <FormSearch />
            </div>
          

            <div className="col-1"></div>
            {/* Profile */}
            <div className="col-3 d-flex justify-content-end">
              {auth?.id ? (
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      className="rounded-circle avatar-sm"
                      src={auth?.avatar ? auth?.avatar : avatarDefault}
                      width="40px"
                      alt=""
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/profile"} className="dropdown-item">
                        {`${auth?.first_name} ${auth?.last_name}`}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to={"/admin"} className="dropdown-item">
                        Trang quản lý
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        onClick={(e) => {
                          dispatch(authSlice.actions.logout());
                        }}
                        className="dropdown-item d-flex align-items-center cursor-pointer"
                      >
                        <IoIosLogOut className="me-2" />
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center" >
                  <Link to={"/auth/login"} className="nav-link" aria-current="page" href="#">
                    Đăng nhập
                  </Link> <span className="mx-1">/</span>
                  <Link to={"/auth/register"} className="nav-link" href="#">
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-secondary-subtle fst-italic py-2 ps-5">
        Website đọc truyện online, đọc truyện chữ, truyện full, truyện hay chọn lọc.
      </div>
    </>
  );
}
