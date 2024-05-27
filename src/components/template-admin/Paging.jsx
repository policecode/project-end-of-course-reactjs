let defaultProps = {
  page: 1,
  total: 0,
  limit: 20,
  show: 2,
  changePage: () => {}
};
export default function Paging(props) {
  const { page, total, limit, show, changePage } = { ...defaultProps, ...props };
  let totalPage = Math.ceil(total / limit);
  // console.log(props);
  let getViewPage = (show = 2) => {
    /**
     * show: Số đơn vị nhìn về phía trước và phía sau của page active
     */
    let start = 0;
    let end = 0;
    let pageArr = [];
    if (page - show <= 1) {
      start = 1;
    } else {
      start = page - show;
    }

    if (page + show >= totalPage) {
      end = totalPage;
    } else {
      end = page + show;
    }
    for (let i = start; i <= end; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };
  // console.log(getViewPage(show));

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <div className="dataTables_info" id="dataTable_info">
            Showing {page} to {totalPage} of {total} entries
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <div className="dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className={`paginate_button page-item previous ${(page == 1) ? "disabled" : ""}`}>
                <a 
                  onClick={() => changePage(page-1)}
                  className="page-link cursor-pointer">
                  Previous
                </a>
              </li>
              {getViewPage(show).map((item) => (
                <li
                  key={item}
                  className={`paginate_button page-item ${
                    page == item ? "active" : ""
                  }`}
                >
                  <a
                    onClick={() => changePage(item)}
                    className="page-link cursor-pointer"
                    aria-controls="dataTable"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className={`paginate_button page-item previous ${(page == totalPage) ? "disabled" : ""}`}>
                <a
                  onClick={() => changePage(page+1)}
                  className="page-link cursor-pointer" >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
