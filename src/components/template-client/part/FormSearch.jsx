import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { URL_API } from "../../../utils/const";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormSearch() {
  const dispatch = useDispatch();
    let [loadSearch, setLoadSearch] = useState(false);
    let [search, setSearch] = useState('');
    let [items, setItems] = useState([]);
    const actionSearch = useRef(undefined);
    const textSearch = useRef();

    useEffect(() => {
      getData();
    }, [search]);
    let handleSearch = (e) => {
      setLoadSearch(true);
      clearTimeout(actionSearch.current);
      actionSearch.current = setTimeout(() => {
        setLoadSearch(false);
        setSearch(e.target.value);
      }, 1000);
    }
    let closeSearch = () => {
      textSearch.current.value = '';
      setItems([]);
    }
    let getData = async () => {
      if (!search) return;
      let api = `${URL_API.baseApiUrl}stories`;
        let response = await axios.get(
          `${api}?_page=1&_limit=5&_sort=id&_order=desc&title_like=${search}`
        );
        if (response.status == 200) {
          setItems(response.data);
        } else {
          setItems([]);
        }
    };
  return (
    <>
      <div className="position-relative z-3">
        <input 
          onInput={handleSearch}
          onBlur={() => setItems([])}
          ref={textSearch}
          className="form-control me-2" type="text" placeholder="Tìm kiếm" />
        <IoIosSearch
          className={`${
            loadSearch ? "d-none" : ""
          } position-absolute end-0 top-50 translate-middle text-primary-emphasis me-2 fs-4`}
        />
        <div
          className={`${
            loadSearch ? "" : "d-none"
          } position-absolute end-0 top-50 translate-middle text-primary-emphasis me-3 loader`}
        ></div>
        <div className="list-group position-absolute start-0 bootom-0 w-100 mt-2">
        {items.map((item) => (
          <Link key={item.id} 
            to={`/${item.slug}`} 
            onClick={closeSearch}
            className="list-group-item list-group-item-action">{item.title}</Link>
        ))}
        </div>
      </div>
    </>
  );
}
