import AuthLayout from "../layout/AuthLayout";
import CheckAuth from "../components/auth/CheckAuth";
import { useState } from "react";
import * as yup from 'yup';
import MainLayout from '../layout/MainLayout'
import Header from '../components/template-client/Header'
import Footer from '../components/template-client/Footer'
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/selectors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loadingSlice from "../redux-tolkit/loadingSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_API } from "../utils/const";
import authSlice from "../redux-tolkit/authSlice";
const schema = yup.object({
  first_name: yup.string().required('Không được để trống').min(3, 'Không được ít hơn 5 ký tự'),
  last_name: yup.string().required('Không được để trống').min(3, 'Không được ít hơn 5 ký tự'),
});
export default function Profile() {
  document.title = 'Profile';
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const { register, watch, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      ...auth
    }
  });
  let watchAvatar = watch('avatar');

  const handleSubmitForm = async (values) => {
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.put(`${URL_API.baseApiUrl}users/${auth.id}`, values);
    if (response.status == 200) {
      toast.success("Update Profile success!", {
        position: "top-center",
      });
      dispatch(authSlice.actions.update(response.data));

      dispatch(loadingSlice.actions.loadingHidden());
    }
  }
  return (
    <>
      <CheckAuth action="isLogin" />
      <MainLayout>
        <Header />
        <div className="container">
          <h4>Trang cá nhân</h4>
          <hr />
          <form className="user" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group row">
              <div className="col-6 mb-3">
                <label className="form-label">Họ</label>
                <input
                  {...register('first_name')}
                  className={`form-control ${errors.first_name?.message ? 'is-invalid' : ''}`}
                  type="text" placeholder="Họ" />

                <div className="invalid-feedback">
                  {errors.first_name?.message}
                </div>
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Tên</label>
                <input
                  {...register('last_name')}
                  className={`form-control ${errors.last_name?.message ? 'is-invalid' : ''}`}
                  type="text" placeholder="Tên..." />
                <div className="invalid-feedback">
                  {errors.last_name?.message}
                </div>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  {...register('email')}
                  className={`form-control ${errors.email?.message ? 'is-invalid' : ''}`}
                  type="text" placeholder="Tác giả..." />
                <div className="invalid-feedback">
                  {errors.email?.message}
                </div>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Ảnh đại diện</label>
                <input
                  {...register('avatar')}
                  className={`form-control ${errors.thumbnail?.message ? 'is-invalid' : ''}`}
                  type="url" placeholder="Link thumbnail" />
                <div className="invalid-feedback">
                  {errors.thumbnail?.message}
                </div>
                <img src={watchAvatar} className='img-thumbnai border border-1 mw-100 my-2' alt="Avatar" />
              </div>
            </div>
            <button className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        <Footer />
      </MainLayout>
    </>
  )
}

