import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { URL_API } from "../../utils/const";
import Swal from "sweetalert2";
import axios from "axios";
import Paging from "../template-admin/Paging";
import { MdAutoFixNormal } from "react-icons/md";
import UpdateContact from "./UpdateContact";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import SortIcon from "../template-admin/SortIcon";
import { useDispatch } from "react-redux";
import loadingSlice from "../../redux-tolkit/loadingSlice";
// https://github.com/typicode/json-server/tree/v0
export default function ContactList() {
  const dispatch = useDispatch();

  let [items, setItems] = useState([]);
  let [itemDetail, setItemDetail] = useState({});
  let [limit, setLimit] = useState(20);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("id");
  let [order, setOrder] = useState("desc");
  let [total, setTotal] = useState(0);

  useEffect(() => {
    getData("count");
    document.title = "List Contact";
  }, []);
  useEffect(() => {
    getData();
  }, [limit, page, sort, order]);

  let getData = async (action = "list") => {
    // name_like=đạt
    let api = `${URL_API.baseApiUrl}contact`;
    if (action == "list") {
      dispatch(loadingSlice.actions.loadingShow());
      let response = await axios.get(
        `${api}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
      );
      if (response.status == 200) {
        setItems(response.data);
      } else {
        setItems([]);
      }
      dispatch(loadingSlice.actions.loadingHidden());
    }
    if (action == "count") {
      let response = await axios.get(`${api}/`);
      if (response.status == 200) {
        setTotal(response.data.length);
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
        `${URL_API.baseApiUrl}contact/${item.id}`
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
      <Link
        to={"/admin/contact/create"}
        className="btn btn-primary btn-icon-split my-4"
      >
        <FaPlus className="me-2" />
        Create
      </Link>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Contact list</h6>
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
                    <input
                      type="search"
                      className="form-control ml-2"
                      placeholder=""
                    />
                  </label>
                </div>
              </div>
            </div>
            <table className="table table-bordered" id="dataTable" width="100%">
              <thead>
                <tr>
                  <th>#</th>
                  <th width="10%">Avatar</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Name"
                      field="name"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Phone</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Birthday"
                      field="birthday"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Company</th>
                  <th width="10%">Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Name"
                      field="name"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Phone</th>
                  <th>
                    <SortIcon
                      handleSort={changeSort}
                      label="Birthday"
                      field="birthday"
                      sort={sort}
                      order={order}
                    />
                  </th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {items.map((item, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.avatar}
                        className="rounded-circle w-100"
                        loading="lazy"
                        alt=""
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.birthday}</td>
                    <td>{item.company_name}</td>
                    <td>
                      <button
                        onClick={() => setItemDetail(item)}
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
              changePage={setPage}
              total={total}
              page={page}
              limit={limit}
            />
          </div>
        </div>
      </div>
      {itemDetail?.id ? (
        <UpdateContact
          item={itemDetail}
          setItem={setItemDetail}
          resetData={getData}
        />
      ) : (
        ""
      )}
    </div>
  );
}
