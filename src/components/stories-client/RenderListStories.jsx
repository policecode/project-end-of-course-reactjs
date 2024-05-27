import { useDispatch } from "react-redux";
import { URL_API } from "../../utils/const";
import { useEffect, useState } from "react";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import axios from "axios";
import Paging from "../template-admin/Paging";
import { Link } from "react-router-dom";

export default function RenderListStories(props) {
  const { catValue } = props;
  // console.log(catValue);
  const dispatch = useDispatch();
  let [items, setItems] = useState([]);
  // let [itemDetail, setItemDetail] = useState({});
  let [limit, setLimit] = useState(20);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("updated_at");
  let [order, setOrder] = useState("desc");
  let [total, setTotal] = useState(0);
  useEffect(() => {
    getData("count");
  }, [catValue]);
  useEffect(() => {
    getData();
  }, [limit, page, sort, order, catValue]);
  let getData = async (action = "list") => {
    // name_like=đạt
    let api = `${URL_API.baseApiUrl}stories`;
    if (action == "list") {
      dispatch(loadingSlice.actions.loadingShow());
      let apiData =  `${api}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
      if (catValue) {
        apiData = `${apiData}&category_like=${catValue}`;
      }
      // console.log(apiData);
      let response = await axios.get(apiData);
      if (response.status == 200) {
        setItems(response.data);
      } else {
        setItems([]);
      }
      dispatch(loadingSlice.actions.loadingHidden());
    }
    if (action == "count") {
      let apiCount = `${api}/`;
      if (catValue) {
        apiCount = `${apiCount}?category_like=${catValue}`;
      }
      let response = await axios.get(apiCount);
      if (response.status == 200) {
        setTotal(response.data.length);
      }
    }
  };
  let changePage = (page) => {
    setPage(page);
    document
      .querySelector("#table_head_top")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-4 mb-4">
            <div className="card">
              <img
                src={item.thumbnail}
                className="card-img-top"
                alt="..."
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <h6 className="card-title fvn__card_title" title={item.title}>
                  {item.title}
                </h6>
                <div className="card-text">Tác giả: {item.author}</div>
                <div className="card-text">Trạng thái: {item.status}</div>
                <Link to={`/${item.slug}`} className="btn btn-primary">Đọc truyện</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <Paging
            changePage={changePage}
            total={total}
            page={page}
            limit={limit}
          />
        </div>
      </div>
    </>
  );
}
