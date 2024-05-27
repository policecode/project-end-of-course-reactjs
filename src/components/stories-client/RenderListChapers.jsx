import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL_API } from "../../utils/const";

export default function RenderListChapers({type, slugChaper, storyId, slugStory}) {
    let [chapers, setChapers] = useState([]);
    useEffect(()=>{
        getData();
      }, []);
    let getData = async () => {
        let response = await axios.get(
            `${URL_API.baseApiUrl}chapers/?story_id=${storyId}`
        );
        if (response.status == 200) {
            setChapers(response.data);
        }
    }
    if (type == 'select') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let navigate = useNavigate();
        let rediRectChaper = (slugChaper) => {
            if (!slugChaper) return;
            navigate(`/${slugStory}/${slugChaper}`);
        }
        let indexChaper;
        for (let i = 0; i < chapers.length; i++) {
            if (chapers[i].slug == slugChaper) {
                indexChaper = i;
                break;
            }
        }
        return (
            <div className="row mb-4">
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <button 
                        onClick={() => rediRectChaper(chapers[indexChaper-1]?.slug)}
                        type="button" className="btn btn-success">Trước</button>
                </div>
                <div className="col-4">
                    <select 
                        value={slugChaper}
                        onChange={(e) => rediRectChaper(e.target.value)}
                        className="form-select form-select-sm">
                        {chapers.map(chap => (
                            <option key={chap.id} value={chap.slug}>{chap.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-4  d-flex justify-content-start align-items-center">
                    <button 
                        onClick={() => rediRectChaper(chapers[indexChaper+1]?.slug)}
                        type="button" className="btn btn-success">Sau</button>
                </div>
            </div>
        );
    }

    if (type == 'list') {
        return (
            <div className="my-5">
                <h4>Danh sách chương</h4>
                <hr />
                <div className="list-group" >
                    {chapers.map(chap => (
                        <Link 
                            key={chap.id} 
                            to={`/${slugStory}/${chap.slug}`}
                            className="list-group-item list-group-item-action bg-primary bg-gradient bg-opacity-10">
                            {chap.name}
                        </Link>
    
                    ))}
                </div>
            </div>
        )
    }
}