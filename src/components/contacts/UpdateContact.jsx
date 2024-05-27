import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { URL_API } from "../../utils/const";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
const schema = yup.object({
  name: yup
    .string()
    .required("Không được để trống")
    .min(5, "Không được ít hơn 5 ký tự"),
  birthday: yup.string().required("Không được để trống"),
  company_name: yup
    .string()
    .required("Không được để trống")
    .min(5, "Không được ít hơn 5 ký tự"),
  department: yup.string().required("Không được để trống"),
  job_title: yup.string().required("Không được để trống"),
  phone: yup.string().required("Không được để trống"),
  avatar: yup.string().url("Không đúng định dạng url"),
});
export default function UpdateContact(props) {
  /**
   * item: Dữ liệu
   * setItem: Hàm xử lý dữ liệu của parent cha
   * resetData: Hàm call lại danh sách
   */
  const dispatch = useDispatch();
  let {item, setItem, resetData} = props;
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      ...item
    }
  });
  const watchAvatar = watch('avatar');
  const handleSubmitForm = async (values) => {
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.put(`${URL_API.baseApiUrl}contact/${values.id}`, values);
    if (response.status == 200) {
      toast.success("Update success!", {
        position: "top-center",
      });
      reset();
      closeModal();
      dispatch(loadingSlice.actions.loadingHidden());
      resetData();
    }
  }

  const closeModal = () => {
    setItem({});
  } 

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        paddingLeft: "0px",
        backgroundColor: "rgba(24, 26, 27, 0.5)",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update a Contact!</h5>
            <button onClick={closeModal} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="p-5">
                <form
                  className="user"
                  onSubmit={handleSubmit(handleSubmitForm)}
                >
                  <div className="form-group row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Full name</label>
                      <input
                        {...register("name")}
                        className={`form-control ${
                          errors.name?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Full name"
                      />

                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Birthday</label>
                      <input
                        {...register("birthday")}
                        className={`form-control ${
                          errors.birthday?.message ? "is-invalid" : ""
                        }`}
                        type="date"
                      />
                      <div className="invalid-feedback">
                        {errors.birthday?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Company name</label>
                      <input
                        {...register("company_name")}
                        className={`form-control ${
                          errors.company_name?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Company name"
                      />
                      <div className="invalid-feedback">
                        {errors.company_name?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Department</label>
                      <input
                        {...register("department")}
                        className={`form-control ${
                          errors.department?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Department"
                      />
                      <div className="invalid-feedback">
                        {errors.department?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Job title</label>
                      <input
                        {...register("job_title")}
                        className={`form-control ${
                          errors.job_title?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Job title"
                      />
                      <div className="invalid-feedback">
                        {errors.job_title?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        {...register("phone")}
                        className={`form-control ${
                          errors.phone?.message ? "is-invalid" : ""
                        }`}
                        type="tel"
                        placeholder="Phone number"
                      />
                      <div className="invalid-feedback">
                        {errors.phone?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Avatar</label>
                      <input
                        {...register("avatar")}
                        className={`form-control ${
                          errors.avatar?.message ? "is-invalid" : ""
                        }`}
                        type="url"
                        placeholder="Link avatar"
                      />
                      <div className="invalid-feedback">
                        {errors.avatar?.message}
                      </div>
                      <img
                        src={watchAvatar}
                        className="img-thumbnai border border-1 mw-100 my-2"
                        alt="Avatar"
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Note</label>
                      <textarea
                        {...register("note")}
                        className={`form-control ${
                          errors.note?.message ? "is-invalid" : ""
                        }`}
                        cols="30"
                        rows="10"
                        placeholder="Note"
                      ></textarea>
                      <div className="invalid-feedback">
                        {errors.note?.message}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              onClick={closeModal}
              type="button" className="btn btn-secondary">
              Close
            </button>
            <button 
              onClick={handleSubmit(handleSubmitForm)}
              type="button" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
