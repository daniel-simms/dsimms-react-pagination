import React, { useState, useContext, useEffect } from "react";
import { Pagination as Pagi } from "react-bootstrap";
import { paginateData, scrollTop } from "../functions";

import PaginationContext from '../context/PaginationContext'

export default function Pagination(props) {

  const {
    currentPage,
    setCurrentPage,
    pageLinksAmount,
    setPageLinksAmount,
    pageLinksRange,
    setPageLinksRange,
  } = useContext(PaginationContext)

  useEffect(() => {
    if(!currentPage) setCurrentPage(props.currentPage)
    if(!pageLinksAmount) setPageLinksAmount(props.pageLinksAmount)
  }, [])

  // Paginate Filtered Data
  const [itemsPerPage] = useState(props.itemsPerPage);
  const totalItems = props.data.length;
  const totalPageCount = Math.ceil(totalItems / itemsPerPage);
  const pageLinksModifier = pageLinksAmount - 2;

  const toNextPage = () => {
    // Set currentPage
    setCurrentPage((prev) => ++prev);
    // Set pageLinksRange
    const nextPage = currentPage + 1;
    const lastPageLink = pageLinksRange[pageLinksRange.length - 1];
    if (nextPage === lastPageLink && nextPage < totalPageCount)
      setPageLinksRange((prev) => prev.map((page) => page + pageLinksModifier));
    scrollTop();
  };

  const toPrevPage = () => {
    // Set currentPage
    setCurrentPage((prev) => --prev);
    // Set pageLinksRange
    const prevPage = currentPage - 1;
    const firstPageLink = pageLinksRange[0];
    if (prevPage === firstPageLink && prevPage > 1)
      setPageLinksRange((prev) => prev.map((page) => page - pageLinksModifier));
    scrollTop();
  };

  const toSpecificPage = (page) => {
    // Set currentPage
    setCurrentPage(page);
    // Set pageLinksRange
    const firstLink = pageLinksRange[0] === page;
    const lastLink = pageLinksRange[pageLinksRange.length - 1] === page;
    const linktoFirstPage = page === 1;
    const linktoLastPage = page === totalPageCount;
    if (firstLink && !linktoFirstPage) {
      setPageLinksRange((prev) =>
        prev.map((state) => state - pageLinksModifier)
      );
    }
    if (lastLink && !linktoLastPage) {
      setPageLinksRange((prev) =>
        prev.map((state) => state + pageLinksModifier)
      );
    }
    scrollTop();
  };

  const paginatedData = paginateData(
    props.data,
    itemsPerPage,
    currentPage
  );

  return (
    <React.Fragment>
      {props.render(paginatedData)}
      <Pagi className="d-flex justify-content-center w-100">
        {currentPage > 1 && <Pagi.Prev onClick={() => toPrevPage()} />}
        {pageLinksRange.map((page) => {
          const allPageLinksRendered = page > totalPageCount;
          return (
            !allPageLinksRendered && (
              <Pagi.Item
                key={"pageLink-" + page}
                active={page === currentPage}
                onClick={() => toSpecificPage(page)}
              >
                {page}
              </Pagi.Item>
            )
          );
        })}
        {currentPage < totalPageCount && (
          <Pagi.Next onClick={() => toNextPage()} />
        )}
      </Pagi>
    </React.Fragment>
  );
}
