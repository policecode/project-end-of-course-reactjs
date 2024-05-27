import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { URL_API } from "../../utils/const";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import authSlice from "../../redux-tolkit/authSlice";

const schema = yup.object({
  email: yup.string().required('Không được để trống').email('Không đúng định dạng email'),
  password: yup.string().required('Không được để trống')
});
export default function LoginForm() {
  useEffect(() => {
    document.title = "Login Account";
  }, []);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: "",
    }
  });

  const handleSubmitForm = async (values) => {
    /**
     * Fake Login
     */
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.get(`${URL_API.baseApiUrl}users?email=${values.email}&password=${values.password}`);
    if (response.data.length > 0) {
      // Login success
      toast.success("Đăng nhập thành công!", {
        position: "top-center",
      });
      let user = response.data[0];
      // console.log(user);
      dispatch(authSlice.actions.login(user));
      reset();
      navigate('/admin');
    } else {
      // Login Fail
      toast.error("Tài khoản hoặc mật khẩu không chính xác!", {
        position: "top-center",
      });
    }
    dispatch(loadingSlice.actions.loadingHidden());
  }
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(handleSubmitForm)}>
                      <div className="form-group">
                        <input
                          {...register('email')}
                          type="text"
                          className={`form-control form-control-user ${errors.email?.message ? 'is-invalid' : ''}`}
                          placeholder="Enter Email Address..." />
                          <div className="invalid-feedback">
                            {errors.email?.message}
                          </div>
                      </div>
                      <div className="form-group">
                        <input
                          {...register('password')}
                          type="password"
                          className={`form-control form-control-user ${errors.password?.message ? 'is-invalid' : ''}`}
                          placeholder="Password"  />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            form="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-user btn-block" >
                        Login
                      </button>
                      <hr />
                      <button className="btn btn-google btn-user btn-block d-flex align-items-center justify-content-center">
                        <FaGoogle className="me-2" /> Register with Google
                      </button>
                      <button className="btn btn-facebook btn-user btn-block d-flex align-items-center justify-content-center">
                        <FaFacebookF className="me-2" />
                        Register with Facebook
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link to={"/auth/forgot-password"} className="small">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link to={"/auth/register"} className="small">
                        Create an Account!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
