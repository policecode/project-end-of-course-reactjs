import RenderListStories from "../stories-client/RenderListStories";
import StoryRead from "../stories-client/StoryRead";
import CategorySelect from "../template-client/part/CategorySelect";

export default function Home() {
    document.title = 'Trang chủ';
   JSON.stringify
    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <RenderListStories />
                </div>
                <div className="col-3">
                    <StoryRead />
                    <br />
                    <CategorySelect type={'list'}/>
                </div>
            </div>
        </div>
    )
}