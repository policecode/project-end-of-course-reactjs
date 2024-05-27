import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import axios from "axios";
import { URL_API } from "../../utils/const";
import RenderListChapers from "../stories-client/RenderListChapers";
import CommentStory from "../stories-client/CommentStory";

export default function DetailChaper() {
  let params = useParams();
  const dispatch = useDispatch();
  let [detailStory, setDetailStory] = useState({});
  let [detailChaper, setDetailChaper] = useState({});
  useEffect(() => {
    getData();
  }, [params.slugChaper]);
  useEffect(() => {
    document.title = `${detailChaper.name} | ${detailStory.title}`;
  }, [detailStory, detailChaper])
  let getData = async (action = "story") => {
    if (action == "story") {
      dispatch(loadingSlice.actions.loadingShow());
      let response = await axios.get(
        `${URL_API.baseApiUrl}stories/?slug=${params.slugStory}`
      );
      if (response.status == 200 && response.data[0]) {
        setDetailStory(response.data[0]);
        dispatch(loadingSlice.actions.loadingHidden());
        let responseChaper = await axios.get(
          `${URL_API.baseApiUrl}chapers/?story_id=${response.data[0].id}&slug=${params.slugChaper}`
        );
        if (responseChaper.status == 200) {
          setDetailChaper(responseChaper.data[0]);

        }
      }
    }
    // console.log(detailChaper.content);
  };
  return (
    <div className="container py-4">
      <div className="text-center">
        <Link to={`/${params.slugStory}`} className="text-success fs-4 fw-semibold text-decoration-none">
          {detailStory?.title}
        </Link>
      </div>
      <p className="text-center">{detailChaper?.name}</p>
      {params.slugChaper && params.slugStory && detailStory?.id ?
        <RenderListChapers
          type={'select'}
          slugChaper={params.slugChaper}
          storyId={detailStory.id}
          slugStory={params.slugStory}
        /> : ''
      }
      <div dangerouslySetInnerHTML={{__html: detailChaper?.content}} />

      {params.slugChaper && params.slugStory && detailStory?.id ?
        <RenderListChapers
          type={'select'}
          slugChaper={params.slugChaper}
          storyId={detailStory.id}
          slugStory={params.slugStory}
        /> : ''
      }
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          {detailStory?.id ?
            <CommentStory
              storyId={detailStory.id}
            /> : ''
          }
        </div>
      </div>

    </div>
  );
}
