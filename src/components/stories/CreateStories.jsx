import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { URL_API } from '../../utils/const';
import thumbnailDefault from '../../assets/image/default-book.png';
import axios from 'axios';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import loadingSlice from '../../redux-tolkit/loadingSlice';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { optionCategory } from '../../utils/const';
import JsCoreHelper from '../../utils/JsCoreHelper';
import dayjs from 'dayjs';

const schema = yup.object({
  title: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
  description: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
  slug: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
  author: yup.string().required('Không được để trống'),
  category: '',
  status: yup.string().required('Không được để trống'),
  thumbnail: yup.string().url('Không đúng định dạng url'),

})
const animatedComponents = makeAnimated();

export default function CreateStories() {
  useEffect(() => {
    document.title = "Create Stories";
  }, []);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, watch, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: "",
      slug: "",
      author: '',
      category: '',
      thumbnail: '',
      status: '',
    }
  });
  const watchThumbnail = watch('thumbnail', thumbnailDefault);
  const setValueSelectCat = (valueCatArr) => {
    setValue('category', JsCoreHelper.convertSelectToString(valueCatArr))
  }
  const handleSubmitForm = async (values) => {
    values.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.post(`${URL_API.baseApiUrl}stories`, values);
    if (response.status == 201) {
      toast.success("Create success!", {
        position: "top-center",
      });
      reset();
      dispatch(loadingSlice.actions.loadingHidden());
      return navigate('/admin/stories/list');
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
              <label className="form-label">Tên truyện</label>
              <input
                {...register('title')}
                onChange={(e) => setValue('slug', JsCoreHelper.convertToSlug(e.target.value))}
                className={`form-control ${errors.title?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Tên truyện" />

              <div className="invalid-feedback">
                {errors.title?.message}
              </div>
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Slug</label>
              <input
                {...register('slug')}
                disabled
                className={`form-control ${errors.slug?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Slug..." />
              <div className="invalid-feedback">
                {errors.slug?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Tác giả</label>
              <input
                {...register('author')}
                className={`form-control ${errors.author?.message ? 'is-invalid' : ''}`}
                type="text" placeholder="Tác giả..." />
              <div className="invalid-feedback">
                {errors.author?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Thể loại</label>
              <Select
                onChange={setValueSelectCat}
                closeMenuOnSelect={false}
                components={animatedComponents} 
                isMulti
                options={optionCategory} />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Trạng Thái</label>
              <select 
                {...register('status')}
                className={`form-select ${errors.status?.message ? 'is-invalid' : ''}`}>
                <option value="" disabled>--- Trạng Thái ---</option>
                <option value="Đang ra">Đang ra</option>
                <option value="Đang ra">Hoàn Thành</option>
              </select>
              <div className="invalid-feedback">
                {errors.status?.message}
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Ảnh đại diện</label>
              <input
                {...register('thumbnail')}
                className={`form-control ${errors.thumbnail?.message ? 'is-invalid' : ''}`}
                type="url" placeholder="Link thumbnail" />
              <div className="invalid-feedback">
                {errors.thumbnail?.message}
              </div>
              <img src={watchThumbnail} className='img-thumbnai border border-1 mw-100 my-2' alt="Avatar" />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Giới thiệu về truyện</label>
              <textarea
                {...register('description')}
                className={`form-control ${errors.description?.message ? 'is-invalid' : ''}`}
                cols="30" rows="10" placeholder="Giới thiệu về truyện" ></textarea>
              <div className="invalid-feedback">
                {errors.description?.message}
              </div>
            </div>
          </div>

          <Link to={'/admin/stories/list'} className="btn btn-danger me-2">
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