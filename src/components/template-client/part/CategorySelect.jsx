import { VscListSelection } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { optionCategory } from "../../../utils/const";

export default function CategorySelect({ type }) {
  if (type == 'select') {
    return (
      <div className="dropdown">
        <button
          className="btn dropdown-toggle text-light d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
        >
          <VscListSelection />
          <span className="mx-2">Thể loại</span>
        </button>
        <div
          className="dropdown-menu"
          style={{ backgroundColor: "#2f566d", width: '300%' }}
        >
          <div className="row">
            {optionCategory.map((catObj) => (
              <div key={catObj.value} className="col-4">
                <Link to={`/the-loai/${catObj.slug}`} className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover d-flex py-2 mx-2">
                  {catObj.value}
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }

  if (type == 'list') {
    return (
      <div className="row bg-light bg-gradient">
        <div className="col-12">
          <h5>Thể loại truyện</h5>
          <hr />
        </div>
        {optionCategory.map((catObj) => (
          <div key={catObj.value} className="col-6 mb-2">
            <Link to={`/the-loai/${catObj.slug}`} className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">{catObj.value}</Link>
          </div>
        ))}

      </div>
    )
  }
}
