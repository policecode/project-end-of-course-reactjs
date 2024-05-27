import { useSelector } from "react-redux";
import { authSelector } from "../../store/selectors";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";
import { URL_API } from "../../utils/const";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
const schema = yup.object({
    comment: yup.string().required('Không được để trống').min(5, 'Không được ít hơn 5 ký tự'),
});
export default function CommentStory({ storyId }) {
    const auth = useSelector(authSelector);
    let [comments, setComments] = useState([]);
    let [tmpComment, setTmpComment] = useState('');
    let [loadComment, setLoadComment] = useState(false);
    useEffect(() => {
        getData();
        // let commentInterval = setInterval(() => {
        //     getData('interval');
        // }, 3000)
        return () => {
            // clearInterval(commentInterval);
        }
    }, []);
    const { register, watch, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            comment: '',
            user: auth,
            parent: 0,
            story_id: storyId
        }
    });
    let parentId = watch('parent');
    const handleSubmitForm = async (values) => {
        values.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
        values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
        let response = await axios.post(`${URL_API.baseApiUrl}comments`, values);
        if (response.status == 201) {
            setValue('comment', '');
            toast.success("Đăng bình luận thành công!", {
                position: "top-center",
            });
            getData();
        }
    }
    const replyComment = (e) => {
        e.preventDefault();
        if (tmpComment.length < 5) return;
        setValue('comment', tmpComment);
        setTmpComment('');
        handleSubmitForm(getValues());
    }
    const getData = async (action = 'load') => {
        let apiComments =  `${URL_API.baseApiUrl}comments/?story_id=${storyId}&_sort=id&_order=desc`;
        if (action == 'load') {
            setLoadComment(true);
            let response = await axios.get(apiComments);
            if (response.status == 200) {
                setComments(response.data);
            }
            setLoadComment(false);
        }
        if (action == 'interval') {
            let response = await axios.get(apiComments);
            if (response.status == 200) {
                if (response.data[0]?.id != comments[0]?.id) {
                    setComments(response.data);
                }
            }
        }
    }
    const arrangeComments = (listComment) => {
        let results = [];
        for (let i = 0; i < listComment.length; i++) {
            if (listComment[i]?.parent == 0) {
                results.push({
                    ...listComment[i],
                    childrent: []
                })
            }
        }
        let subComment = listComment.filter((item) => item?.parent != 0);
        let subCount = 0;
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < subComment.length; j++) {
                if (results[i].id == subComment[j].parent) {
                    results[i].childrent.push(subComment[j]);
                    subCount++;
                }
            }
            if (subComment.length == subCount) {
                break;
            }
        }
        return results;
    }

    return (
        <div className="comment">
            <h4>Bình luận truyện</h4>
            <hr />
            <form className={`row ${auth?.id ? '': 'd-none'}`} onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="col-3 text-center">
                    <img className="w-75 img-thumbnail rounded" src={auth.avatar} alt="avatar" />
                </div>
                <div className="col-9 text-right">
                    <textarea
                        {...register('comment')}
                        onClick={() => setValue('parent', 0)}
                        className="form-control" rows="4" placeholder="Viết bình luận"></textarea>
                    <button
                        onClick={handleSubmit(handleSubmitForm)}
                        type="submit" className="btn btn-light mt-2">Đăng</button>
                </div>
                {errors?.comment?.value}
            </form>

            <ol className="list-group my-4">
                <li className={`${loadComment ? '' : 'd-none'} list-group-item bg-dark bg-gradient bg-opacity-50 d-flex justify-content-center align-items-center`}>
                    <div className="spinner-border text-light " role="status"></div>
                </li>
                {arrangeComments(comments).map(item => (
                    <li key={item.id} className="row d-flex list-group-item mb-2">
                        <img className="col-2 img-thumbnail rounded" src={item?.user?.avatar} style={{ width: '60px' }} alt="avatar" />
                        <div className="col-8 ms-2 me-auto">
                            <div className="fw-bold">
                                {`${item?.user?.first_name} ${item?.user?.last_name}`}
                            </div>
                            {item?.comment}
                        </div>
                        <span className="col-2 badge text-primary-emphasis">{item?.created_at}</span>
                        <div className={`col-12 mt-3 text-right ${auth?.id ? '': 'd-none'}`}>
                            <AiFillLike className="cursor-pointer fs-4 me-3 hover-opacity-75" />
                            <FaComment
                                onClick={() => setValue('parent', item.id)}
                                className="cursor-pointer fs-5 me-3 hover-opacity-75" />
                            <form
                                onSubmit={replyComment}
                                className={`row p-3 ${parentId == item.id ? '' : 'd-none'}`}>
                                <div className="col-11">
                                    <input
                                        value={tmpComment}
                                        onInput={(e) => setTmpComment(e.target.value)}
                                        type="text" className={`form-control`} placeholder="Nhập bình luận"></input>
                                </div>
                                <div className="col-1">
                                    <button
                                        onClick={replyComment}
                                        type="submit" className="btn btn-light">Gửi</button>
                                </div>
                            </form>
                        </div>
                        {/* Sub comment */}
                        {item.childrent.length > 0 ? (
                            <ol className="col-12 list-group mt-4 w-100">
                                {item.childrent.map(child => (
                                    <li key={child.id} className="list-group-item d-flex justify-content-between align-items-start">
                                        <img className="img-thumbnail rounded" src={child?.user?.avatar} style={{ width: '60px' }} alt="avatar" />
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                {`${child?.user?.first_name} ${child?.user?.last_name}`}
                                            </div>
                                            {child?.comment}
                                        </div>
                                        <span className="badge text-primary-emphasis">{child?.created_at}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : ''}


                    </li>

                ))}

            </ol>
        </div>
    )
}