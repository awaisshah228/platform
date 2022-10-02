import { CustomLink } from "../../data/types";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "../../utils/twFocusClass";
import { useNavigate, useLocation } from "react-router-dom";



export interface PaginationProps {
  className?: string;
  total: number;
  callback?: (num: number) => void;
}

const PaginationV2: FC<PaginationProps> = ({
  className = "",
  total,
  callback,
}) => {
  const [page, setPage] = useState(1);

  const newArr = [...Array(total)].map((_, i) => i + 1);

  const location = useLocation();
  const navigate = useNavigate();

  const handlePagination = (num: number) => {
    navigate(`${location.pathname}?page=${num}`);
    setPage(num)
    callback(num);
  };

  const renderItem = (pag: any, index: number) => {
    if (pag === page) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <span
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        // to={pag.href}
        onClick={() => handlePagination(pag)}
      >
        {pag}
      </span>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {newArr.map(renderItem)}
    </nav>
  );
};

export default PaginationV2;
