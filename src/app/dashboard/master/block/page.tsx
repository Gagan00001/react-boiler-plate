"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "src/redux";
import { blockPaginationResponse } from "src/redux/types/master";
import { getBlocksList } from "src/redux/slices/masterSlice";

import Table from "src/components/Table";
import PageHeader from "src/components/PageHeader";
import { TableContainer } from "src/components/Containers";
import AddBlock from "./addBlock";

const blockColumns = [
  {
    label: "Block",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "District",
    type: "text",
    dataKey: "districtName"
  },
  {
    label: "State",
    type: "text",
    dataKey: "stateName"
  }
];

const Block = () => {
  const dispatch = useAppDispatch();
  const { response: blocksList, totalCount } = useAppSelector(
    (state) => state.masters.blocksList
  ) as blockPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getBlocksList({ ...tableFilters }));
    }
  }, [addModalVisibility, tableFilters]);

  const handlePageChange = useCallback(
    (currentPage: number) => {
      setTableFilters({ ...tableFilters, pageNumber: currentPage });
    },
    [tableFilters]
  );

  const handleRowsPerPageChange = useCallback(
    (recordsPerPage: number) => {
      setTableFilters({ ...tableFilters, pageSize: recordsPerPage });
    },
    [tableFilters]
  );

  const handleAddModalVisibility = useCallback(() => {
    setAddModalVisibility(true);
  }, []);
  return (
    <>
      <PageHeader
        headerLabel='Block'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add Block'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={blocksList}
          columns={blockColumns}
          keyExtractor='id'
          showTableHeaders={false}
          showPagination={true}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddBlock open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default Block;
