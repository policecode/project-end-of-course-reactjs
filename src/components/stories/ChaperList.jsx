import {  useEffect, useRef, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { URL_API } from "../../utils/const";
import Swal from "sweetalert2";
import axios from "axios";
import Paging from "../template-admin/Paging";
import { MdAutoFixNormal } from "react-icons/md";
import SortIcon from "../template-admin/SortIcon";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import EditChaper from "./EditChaper";
// https://github.com/typicode/json-server/tree/v0
document.title = "List Chaper";
export default function ChaperList() {
  const dispatch = useDispatch();
  let params = useParams();
  let [story, setStory] = useState({});
  let [action, setAction] = useState('');
  let [items, setItems] = useState([]);
  let [itemDetail, setItemDetail] = useState({});
  let [limit, setLimit] = useState(20);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("index");
  let [order, setOrder] = useState("desc");
  let [total, setTotal] = useState(0);
  let [search, setSearch] = useState('');
  const actionSearch = useRef(undefined);
  let [loadSearch, setLoadSearch] = useState(false);
  useEffect(() => {
    getData("story");
  }, []);
  useEffect(() => {
    getData("count");
  }, [search]);
  useEffect(() => {
    getData();
  }, [limit, page, sort, order, search]);

  let handleSearch = (e) => {
    setLoadSearch(true);
    clearTimeout(actionSearch.current);
    actionSearch.current = setTimeout(() => {
      setLoadSearch(false);
      setSearch(e.target.value);
    }, 1000);
  }

  let getData = async (action = "list") => {
    // name_like=đạt
    let api = `${URL_API.baseApiUrl}chapers`;
    if (action == "list") {
      dispatch(loadingSlice.actions.loadingShow());
      let response = await axios.get(
        `${api}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&name_like=${search}&story_id=${params.story_id}`
      );
      if (response.status == 200) {
        setItems(response.data);
      } else {
        setItems([]);
      }
      dispatch(loadingSlice.actions.loadingHidden());
    }
    if (action == "count") {
      let response = await axios.get(`${api}/?name_like=${search}&story_id=${params.story_id}`);
      if (response.status == 200) {
        setTotal(response.data.length);
      }
    }
    if (action == "story") {
      let response = await axios.get(`${URL_API.baseApiUrl}stories/${params.story_id}`);
      if (response.status == 200) {
        setStory(response.data);
      }
    }
  };

  let changeSort = (sortName) => {
    setSort(sortName);
    if (order == "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  let changeLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  let changePage = (page) => {
    setPage(page);
    document.querySelector('#table_head_top').scrollIntoView({ behavior: "smooth", });

  }
  let getFormUpdate = (item) => {
    setItemDetail(item);
    setAction('update');
  }
  let destroyItem = async (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    let result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      let response = await axios.delete(
        `${URL_API.baseApiUrl}chapers/${item.id}`
      );
      if (response.status == 200) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: `"${item.name}" has been deleted.`,
          icon: "success",
        });
        getData();
        getData("count");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: `"${item.name}" is safe :)`,
        icon: "error",
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center">
        <button
          onClick={() => setAction('create')}
          className="btn btn-primary btn-icon-split d-flex align-items-center my-4"
        >
          <FaPlus className="me-2" />
          Create
        </button>
        <Link
          to={"/admin/stories/list"}
          className="btn btn-danger btn-icon-split d-flex align-items-center my-4 ml-2"
        >
          <IoArrowBackCircleSharp className="me-2" />
          Back
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div id="table_head_top" className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">List Chapers Story: {story?.title}</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length">
                  <label className="d-inline-flex align-items-center">
                    Show
                    <select
                      defaultValue={limit}
                      style={{ paddingRight: "1.5rem" }}
                      onChange={(e) => changeLimit(e)}
                      className="custom-select form-control mx-2"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>{" "}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div
                  id="dataTable_filter"
                  className="dataTables_filter d-flex justify-content-end"
                >
                  <label className="d-inline-flex align-items-center">
                    Search:
                    <div className="d-inline-flex align-items-center position-relative">
                      <input
                        onInput={handleSearch}
                        type="search"
                        className="form-control ml-2"
                        placeholder="Tìm kiếm"
                      />
                      <AiOutlineLoading3Quarters className={`${loadSearch?'':'d-none'} animation_rotate fs-6 position-absolute end-0 me-3`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <table className="table table-bordered" id="dataTable" width="100%">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Vị trí"
                      field="index"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Tên chương</th>
                  <th>Slug</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Cập nhật"
                      field="updated_at"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th width="10%">Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                <th>#</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Vị trí"
                      field="index"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Tên chương</th>
                  <th>Slug</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Cập nhật"
                      field="updated_at"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {items.map((item, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.index}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.updated_at}</td>
                    <td>
                      <button
                        onClick={() => getFormUpdate(item)}
                        className="btn btn-warning d-flex align-items-center m-2"
                      >
                        <MdAutoFixNormal className="me-2" />
                        Update
                      </button>
                      <button
                        onClick={() => destroyItem(item)}
                        className="btn btn-danger d-flex align-items-center m-2"
                      >
                        <FaRegTrashAlt className="me-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paging
              changePage={changePage}
              total={total}
              page={page}
              limit={limit}
            />
          </div>
        </div>
      </div>
      {action ? (
        <EditChaper
          item={itemDetail}
          setItem={setItemDetail}
          resetData={getData}
          story={story}
          action={action}
          setAction={setAction}
        />
      ) : (
        ""
      )}
    </div>
  );
}
