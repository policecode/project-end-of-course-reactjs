import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { URL_API } from "../../utils/const";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import RenderListChapers from "../stories-client/RenderListChapers";
import CommentStory from "../stories-client/CommentStory";
import StoryRead from "../stories-client/StoryRead";

export default function DetailStory() {
    let params = useParams();
    const dispatch = useDispatch();
    let [itemDetail, setItemDetail] = useState({});

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        document.title = itemDetail.title;
    }, [itemDetail])
    let getData = async (action = "story") => {
        if (action == "story") {
            dispatch(loadingSlice.actions.loadingShow());
            let response = await axios.get(
                `${URL_API.baseApiUrl}stories/?slug=${params.slug}`
            );
            if (response.status == 200 && response.data[0]) {
                setItemDetail(response.data[0]);
                dispatch(loadingSlice.actions.loadingHidden());
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    {itemDetail?.id ? (
                        <div className="card border-light my-3" style={{ backgroundColor: 'transparent' }} >
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={itemDetail?.thumbnail} className="img-fluid rounded-start ps-2 pt-2" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Tác giả: {itemDetail?.author}</p>
                                        <p className="card-text">Thể loại: {itemDetail?.category}</p>
                                        <p className="card-text">Trạng thái: {itemDetail?.status}</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{itemDetail?.title}</h5>
                                        <hr />
                                        <p className="card-text">{itemDetail?.description}</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated {itemDetail?.updated_at}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''}
                    {params.slug && itemDetail?.id ?
                        <RenderListChapers
                            type={'list'}
                            storyId={itemDetail.id}
                            slugStory={params.slug}
                        /> : ''
                    }

                    {itemDetail?.id ?
                        <CommentStory
                            storyId={itemDetail.id}
                        /> : ''
                    }

                </div>
                <div className="col-3">
                    <StoryRead />
                </div>
            </div>
        </div>
    );
}
