import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { URL_API } from '../../utils/const';
import avatarDefault from '../../assets/image/guest-user.webp';
import axios from 'axios';
// import { faker } from '@faker-js/faker';
// import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import loadingSlice from '../../redux-tolkit/loadingSlice';
const schema = yup.object({
  name: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
  birthday: yup.string().required('Không được để trống'),
  company_name: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
  department: yup.string().required('Không được để trống'),
  job_title: yup.string().required('Không được để trống'),
  phone: yup.string().required('Không được để trống'),
  avatar: yup.string().url('Không đúng định dạng url'),

})
// let fakeData = async () => {
//   for (let i = 0; i < 200; i++) {
//     await axios.post(`${URL_API.baseApiUrl}contact`, {
//       name: faker.person.fullName(),
//       birthday: dayjs(faker.date.birthdate()).format('YYYY-MM-DD'),
//       company_name: faker.company.name(),
//       department: faker.commerce.department(),
//       job_title: faker.company.buzzNoun(),
//       phone: faker.phone.imei(),
//       avatar: faker.image.avatar(),
//       note: faker.lorem.paragraph()
//     });
//     console.log(i);
//   }
// }
export default function CreateContact() {
  useEffect(() => {
    document.title = "Create Contact";
  }, []);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      birthday: "",
      company_name: "",
      department: '',
      job_title: '',
      phone: '',
      avatar: '',
      note: ''
    }
  });
  const watchAvatar = watch('avatar', avatarDefault);
  const handleSubmitForm = async (values) => {
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.post(`${URL_API.baseApiUrl}contact`, values);
    if (response.status == 201) {
      toast.success("Create success!", {
        position: "top-center",
      });
      reset();
      dispatch(loadingSlice.actions.loadingHidden());
      return navigate('/admin/contact/list');
    }
  }


  return (
    <div className="row">
      <div className="p-5">
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Create an Contact!</h1>
        </div>
        <form className="user" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-group row">
            <div className="col-6 mb-3">
              <label className="form-label">Full name</label>
              <input
                {...register('name')}
                className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Full name" />

              <div className="invalid-feedback">
                {errors.name?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Birthday</label>
              <input
                {...register('birthday')}
                className={`form-control ${errors.birthday?.message ? 'is-invalid' : ''}`}
                type="date" />
              <div className="invalid-feedback">
                {errors.birthday?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Company name</label>
              <input
                {...register('company_name')}
                className={`form-control ${errors.company_name?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Company name" />
              <div className="invalid-feedback">
                {errors.company_name?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Department</label>
              <input
                {...register('department')}
                className={`form-control ${errors.department?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Department" />
              <div className="invalid-feedback">
                {errors.department?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Job title</label>
              <input
                {...register('job_title')}
                className={`form-control ${errors.job_title?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Job title" />
              <div className="invalid-feedback">
                {errors.job_title?.message}
              </div>

            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                {...register('phone')}
                className={`form-control ${errors.phone?.message ? 'is-invalid' : ''}`}
                type="tel" placeholder="Phone number" />
              <div className="invalid-feedback">
                {errors.phone?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Avatar</label>
              <input
                {...register('avatar')}
                className={`form-control ${errors.avatar?.message ? 'is-invalid' : ''}`}
                type="url" placeholder="Link avatar" />
              <div className="invalid-feedback">
                {errors.avatar?.message}
              </div>
              <img src={watchAvatar} className='img-thumbnai border border-1 mw-100 my-2' alt="Avatar" />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Note</label>
              <textarea
                {...register('note')}
                className={`form-control ${errors.note?.message ? 'is-invalid' : ''}`}
                cols="30" rows="10" placeholder="Note" ></textarea>
              <div className="invalid-feedback">
                {errors.note?.message}
              </div>
            </div>
          </div>

          <Link to={'/admin/contact/list'} className="btn btn-danger me-2">
            Close
          </Link>
          <button className="btn btn-primary">
            Create
          </button>
        </form>

      </div>
    </div>
  )
}