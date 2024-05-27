import { GoTriangleDown, GoTriangleUp } from "react-icons/go";


export default function SortIcon(props) {
  let {label, field, sort, order, handleSort} = props;
  if ((sort == field) && (order == 'asc')) {
    return (
      <span onClick={() => handleSort(field)} className="cursor-pointer text-primary">
        {label}
        <GoTriangleDown />
      </span>
    )
  }
  if ((sort == field) && (order == 'desc')) {
    return (
      <span onClick={() => handleSort(field)} className="cursor-pointer text-primary">
        {label}
        <GoTriangleUp />
      </span>
    )
  }
  return (
    <span onClick={() => handleSort(field)} className="cursor-pointer text-primary">
      {label}
    </span>
  )
}

