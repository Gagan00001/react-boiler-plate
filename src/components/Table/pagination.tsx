import * as React from "react";
import Pagination from "@mui/material/TablePagination";
import { PaginationProps } from "@mui/material";
import isFunction from "lodash/isFunction";

interface TablePaginationProps extends PaginationProps {
  totalCount?: number;
  handlePageChange?: (page: number) => void;
  handleRowsPerPageChange?: (rowsValue: number) => void;
}
const TablePagination = ({ totalCount, handlePageChange, handleRowsPerPageChange }: TablePaginationProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      if (isFunction(handlePageChange)) {
        handlePageChange(newPage);
      }
    },
    [handlePageChange]
  );

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsValue: number = parseInt(event.target.value, 10);
    setRowsPerPage(rowsValue);
    setPage(0);

    if (isFunction(handleRowsPerPageChange)) {
      handleRowsPerPageChange(rowsValue);
    }
  };

  return (
    <Pagination
      component='div'
      count={totalCount || 0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={<span>Records Per Page</span>}
      rowsPerPageOptions={[10, 15, 20, 25]}
    />
  );
};

export default TablePagination;
