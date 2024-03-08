/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";

import { SxProps, Theme } from "@mui/material";
import TablePagination from "./pagination";
import { dateFormatter } from "../../lib/utils";
import StatusCell from "../StatusCell";
import TableHeaders from "./tableHeader";
import MudraTypography from "../Mudra/Typography";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 398px;
`;
const StyledHeaderCell = styled.div`
  font-family: nunito;
  font-weight: 700;
  line-height: 16px;
  font-size: 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.piramalBlue[80]};
  cursor: auto;
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getTableRowCell = (column: any, row: any, rowIndex: number, keyExtractor: string) => {
  switch (column?.type) {
    case "index":
      return <TableCell key={`${column?.dataKey}-${row[keyExtractor]}`}>{rowIndex + 1}</TableCell>;
    case "text":
      return (
        <TableCell
          key={`${column?.dataKey}-${row[keyExtractor]}`}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: column.maxWidth || "6rem"
          }}
          onClick={(e) => (column?.onClick ? column.onClick(row, e) : {})}
        >
          <Tooltip title={get(row, column?.dataKey, "")}>{get(row, column?.dataKey, "")}</Tooltip>
        </TableCell>
      );
    case "date":
      return (
        <TableCell
          key={`${column?.dataKey}-${row[keyExtractor]}`}
          onClick={(e) => (column?.onClick ? column.onClick(row, e) : {})}
          style={{ width: column.maxWidth || "6rem" }}
        >
          <Tooltip title={dateFormatter(get(row, column?.dataKey, ""))}>
            <span>{dateFormatter(get(row, column?.dataKey, ""))}</span>
          </Tooltip>
        </TableCell>
      );
    case "status":
      return (
        <TableCell key={`${column?.dataKey}-${row[keyExtractor]}`} style={{ width: "3rem" }}>
          <StatusCell isActive={get(row, column?.dataKey, true)} />
        </TableCell>
      );
    default:
      return <TableCell />;
  }
};

interface TableProps<T> {
  columns: any;
  data: T[];
  keyExtractor: keyof T;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  headerFiltersOptions?: any;
  handleFilters?: (filterValue: string) => void;
  headerLabel?: string | undefined;
  showSearch?: boolean;
  searchPlaceholder?: string;
  handleSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCount?: number;
  handlePageChange?: (page: number) => void;
  handleRowsPerPageChange?: (rowsValue: number) => void;
  showTableHeaders?: boolean;
  showPagination?: boolean;
  actionButtonLabel?: string;
  actionButtonClick?: () => void;
  tableContainerSx?: SxProps<Theme>;
}

const Table = <T extends object>({
  columns = [],
  data = [],
  keyExtractor,
  loading,
  onRowClick,
  handleFilters,
  headerLabel,
  headerFiltersOptions,
  showSearch,
  searchPlaceholder,
  handleSearch,
  totalCount,
  handlePageChange,
  handleRowsPerPageChange,
  showTableHeaders = true,
  showPagination = true,
  actionButtonLabel,
  actionButtonClick,
  tableContainerSx
}: TableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = useCallback(
    (column: string) => {
      // If the same column is clicked again, toggle the sort order
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        // Otherwise, set the new column and default to ascending order
        setSortColumn(column);
        setSortOrder("asc");
      }
    },
    [sortColumn, sortOrder]
  );

  const sortedData = useMemo(() => {
    if (sortColumn) {
      // Sort the data based on the sortColumn and sortOrder
      return [...data].sort((a, b) => {
        const valueA = get(a, sortColumn);
        const valueB = get(b, sortColumn);

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    // Return the data as-is if no sorting is applied
    return data;
  }, [data, sortColumn, sortOrder]);

  const handleRowClick = useCallback(
    (row: T) => () => {
      if (isFunction(onRowClick)) {
        onRowClick(row);
      }
    },
    [onRowClick]
  );

  return (
    <StyledTableContainer>
      <TableContainer sx={tableContainerSx}>
        {showTableHeaders && (
          <TableHeaders
            headerLabel={headerLabel}
            filterOptions={headerFiltersOptions}
            handleFilters={handleFilters}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            handleSearch={handleSearch}
            actionButtonLabel={actionButtonLabel}
            actionButtonClick={actionButtonClick}
          />
        )}
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  size='medium'
                  key={column?.label}
                  style={{ width: column?.width }}
                  data-testId={`${column?.dataKey}-column`}
                >
                  <StyledHeaderCell>
                    {column?.label}
                    {column.sort && (
                      <TableSortLabel
                        active={sortColumn === column.dataKey}
                        direction={sortColumn === column.dataKey ? sortOrder : "desc"} // Set direction to "desc" by default
                        onClick={() => handleSort(column.dataKey)}
                      />
                    )}
                  </StyledHeaderCell>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align='center' colSpan={columns?.length}>
                  <StyledLoaderContainer>
                    <CircularProgress />
                  </StyledLoaderContainer>
                </TableCell>
              </TableRow>
            ) : !loading && isEmpty(data) ? (
              <TableRow>
                <TableCell align='center' colSpan={columns?.length}>
                  <MudraTypography size={16} textColor='neutral80' weight='bold' style={{ textAlign: "center" }}>
                    No Result Found!
                  </MudraTypography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row: any, rowIndex: number) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row[keyExtractor]} onClick={handleRowClick(row)}>
                  {columns.map((column: any) => {
                    if (column?.render) {
                      const Component = column?.render;
                      return (
                        <TableCell
                          key={`${column?.dataKey}-${row[keyExtractor]}`}
                          style={{ cursor: "pointer", width: column.maxWidth || "2rem" }}
                          onClick={(e) => e?.stopPropagation()}
                        >
                          <Component data={row} {...column} index={rowIndex} />
                        </TableCell>
                      );
                    }
                    return getTableRowCell(column, row, rowIndex, keyExtractor.toString());
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {showPagination && (
        <TablePagination
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </StyledTableContainer>
  );
};
export default Table;
