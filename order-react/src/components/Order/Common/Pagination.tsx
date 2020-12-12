import React from "react";
import { Link } from "react-router-dom";

interface Props {
  currentPage: number;
  totalPage: number;
}

export const Pagination:React.FC<Props> = (props) => {
  let pagiItems = [] as any;

  if (props.currentPage > 1) {
    pagiItems.push(
      <li className="page-item" key="0">
        <Link className="page-link" to={`/orders/${props.currentPage - 1}`}>
          Previous
        </Link>
      </li>
    );
  }

  for (let i = 1; i <= props.totalPage; i++) {
    const classActive = i === props.currentPage ? "active" : "";
    pagiItems.push(
      <li className={`page-item ${classActive}`} key={i}>
        <Link className="page-link" to={`/orders/${i}`}>
          {i}
        </Link>
      </li>
    );
  }

  if (props.totalPage >= 1 && props.currentPage < props.totalPage) {
    pagiItems.push(
      <li className="page-item" key={props.totalPage + 1}>
        <Link className="page-link" to={`/orders/${+props.currentPage + 1}`}>
          Next
        </Link>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{pagiItems.map((elem) => elem)}</ul>
    </nav>
  );
};
