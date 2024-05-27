import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { URL_API } from "../../utils/const";
import axios from "axios";
import { toast } from "react-toastify";
import JsCoreHelper from "../../utils/JsCoreHelper";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
const schema = yup.object({
  name: yup
    .string()
    .required("Không được để trống")
    .min(5, "Không được ít hơn 5 ký tự"),
  content: yup
    .string()
    .required("Không được để trống")
    .min(5, "Không được ít hơn 5 ký tự"),
  slug: yup
    .string()
    .required("Không được để trống")
    .min(5, "Không được ít hơn 5 ký tự"),
    story_id: '',
    index: ''

});
export default function EditChaper(props) {
  /**
   * item: Dữ liệu
   * setItem: Hàm xử lý dữ liệu của parent cha
   * resetData: Hàm call lại danh sách
   */
  let { item, setItem, resetData, story, action, setAction } = props;
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      ...item,
      story_id: story.id
    },
  });
  const handleSubmitCreate = async (values) => {
    values.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    values.index = Number(values.index);
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.post(`${URL_API.baseApiUrl}chapers`, values);
    if (response.status == 201) {
      toast.success("Create success!", {
        position: "top-center",
      });
      closeModal();
      resetData();
      dispatch(loadingSlice.actions.loadingHidden());
    }
  }
  const handleSubmitUpdate = async (values) => {
    values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    values.index = Number(values.index);
    dispatch(loadingSlice.actions.loadingShow());
    let response = await axios.put(
      `${URL_API.baseApiUrl}chapers/${values.id}`,
      values
    );
    if (response.status == 200) {
      toast.success("Update success!", {
        position: "top-center",
      });
      dispatch(loadingSlice.actions.loadingHidden());
      closeModal();
      resetData();
    }
  };

  const closeModal = () => {
    setAction('');
    setItem({});
  };

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
            <h5 className="modal-title">{action} a chaper story {story.title}!</h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="p-5">
                <form
                  className="user" >
                  <div className="form-group row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Tiêu đề chương</label>
                      <input
                        {...register("name")}
                        onChange={(e) =>
                          setValue(
                            "slug",
                            JsCoreHelper.convertToSlug(e.target.value)
                          )
                        }
                        className={`form-control ${
                          errors.name?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Tiêu đề chương truyện"
                      />

                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        {...register("slug")}
                        disabled
                        className={`form-control ${
                          errors.slug?.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Slug..."
                      />
                      <div className="invalid-feedback">
                        {errors.slug?.message}
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Thứ tự chương truyện</label>
                      <input
                        {...register("index")}
                        className={`form-control ${
                          errors.index?.message ? "is-invalid" : ""
                        }`}
                        type="number"
                        minLength={1}
                        defaultValue={1}
                      />
                      <div className="invalid-feedback">
                        {errors.index?.message}
                      </div>
                    </div>
                  
                    <div className="col-12 mb-3">
                      <label className="form-label">Nội dung truyện</label>
                      <textarea
                        {...register("content")}
                        className={`form-control ${
                          errors.content?.message ? "is-invalid" : ""
                        }`}
                        cols="30"
                        rows="10"
                        placeholder="Giới thiệu về truyện"
                      ></textarea>
                      <div className="invalid-feedback">
                        {errors.content?.message}
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
              type="button"
              className="btn btn-secondary"
            >
              Close
            </button>
            {action == 'create'?(<button
              onClick={handleSubmit(handleSubmitCreate)}
              type="button"
              className="btn btn-primary"
            >
              Create
            </button>):''}
        
            {action == 'update'?( <button
              onClick={handleSubmit(handleSubmitUpdate)}
              type="button"
              className="btn btn-primary"
            >
              Update
            </button>):''}
           
          </div>
        </div>
      </div>
    </div>
  );
}
