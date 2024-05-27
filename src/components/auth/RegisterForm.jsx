import { useEffect } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_API } from "../../utils/const";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import authSlice from "../../redux-tolkit/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .required("Không được để trống")
    .email("Không đúng định dạng email"),
  password: yup.string().required("Không được để trống").min(8, 'phải có tối thiểu 8 ký tự'),
  password_confirm: yup.string().required('Bắt buộc phải nhập').oneOf([ yup.ref('password')], 'Mật khẩu không khớp'),
  last_name: yup.string().required("Không được để trống"),
  first_name: yup.string().required("Không được để trống"),
  avatar: ""
});
export default function RegisterForm() {
  useEffect(() => {
    document.title = "Register Account";
  }, []);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      last_name: "",
      first_name: "",
      avatar: ""
    },
  });

  const handleSubmitForm = async (values) => {
    delete values.password_confirm;

    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.post( `${URL_API.baseApiUrl}users/`, values);
    if (response.status == 201) {
        toast.success("Đăng ký thành công!", {
          position: "top-center",
        });
        let user = response.data;
          dispatch(authSlice.actions.login(user));
          reset();
          navigate("/admin");
    } else {
        toast.error("Đăng ký tài khoản không thành công!", {
          position: "top-center",
        });
    }
    dispatch(loadingSlice.actions.loadingHidden());
  };
  return (
    <>
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form  onSubmit={handleSubmit(handleSubmitForm)} className="user">
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                          {...register('first_name')}
                          type="text"
                          className={`form-control form-control-user ${errors.first_name?.message ? 'is-invalid' : ''}`}
                          placeholder="First Name..." />
                      <div className="invalid-feedback">
                        {errors.first_name?.message}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <input
                          {...register('last_name')}
                          type="text"
                          className={`form-control form-control-user ${errors.last_name?.message ? 'is-invalid' : ''}`}
                          placeholder="Last Name..." />
                      <div className="invalid-feedback">
                        {errors.last_name?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                      <input
                          {...register('email')}
                          type="text"
                          className={`form-control form-control-user ${errors.email?.message ? 'is-invalid' : ''}`}
                          placeholder="Email Address..." />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                          {...register('password')}
                          type="text"
                          className={`form-control form-control-user ${errors.password?.message ? 'is-invalid' : ''}`}
                          placeholder="Password..." />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <input
                          {...register('password_confirm')}
                          type="text"
                          className={`form-control form-control-user ${errors.password_confirm?.message ? 'is-invalid' : ''}`}
                          placeholder="Password Confirm..." />
                      <div className="invalid-feedback">
                        {errors.password_confirm?.message}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-user btn-block" >
                    Register Account
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
                  <Link to={"/auth/login"} className="small">
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
