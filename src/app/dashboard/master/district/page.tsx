"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "src/redux";
import { districtPaginationResponse } from "src/redux/types/master";

import Table from "src/components/Table";
import PageHeader from "src/components/PageHeader";
import { TableContainer } from "src/components/Containers";
import { getDistrictsList } from "src/redux/slices/masterSlice";
import AddDistrict from "./addDistrict";

const districtColumns = [
  {
    label: "District",
    type: "text",
    dataKey: "districtName",
    sort: true
  },
  {
    label: "State",
    type: "text",
    dataKey: "stateName"
  }
];

const District = () => {
  const dispatch = useAppDispatch();
  const { response: districtsList, totalCount } = useAppSelector(
    (state) => state.masters.districtsList
  ) as districtPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getDistrictsList({ ...tableFilters }));
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
        headerLabel='District'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add District'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={districtsList}
          columns={districtColumns}
          keyExtractor='districtId'
          showTableHeaders={false}
          showPagination={true}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddDistrict open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default District;
