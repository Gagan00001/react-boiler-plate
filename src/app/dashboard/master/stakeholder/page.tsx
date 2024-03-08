"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getStakeholders } from "src/redux/slices/masterSlice";
import { stakeholderPaginationResponse } from "src/redux/types/master";
import AddStakeholder from "./addStakeholder";

const stakeholderColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  }
];

const StakeHolder = () => {
  const dispatch = useAppDispatch();
  const stakeHoldersData = useAppSelector((state) => state.masters.stakeholders) as stakeholderPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getStakeholders({ ...tableFilters }));
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
        headerLabel='StakeHolder'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add StakeHolder'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={stakeHoldersData?.response}
          columns={stakeholderColumns}
          keyExtractor='id'
          showTableHeaders={false}
          totalCount={stakeHoldersData?.totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddStakeholder open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default StakeHolder;
