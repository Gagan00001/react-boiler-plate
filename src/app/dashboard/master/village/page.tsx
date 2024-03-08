"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "src/redux";
import { getVillagesList } from "src/redux/slices/masterSlice";
import { villagePaginationResponse } from "src/redux/types/master";

import Table from "src/components/Table";
import PageHeader from "src/components/PageHeader";
import { TableContainer } from "src/components/Containers";

import AddVillage from "./addVillage";

const villageColumns = [
  {
    label: "Village",
    type: "text",
    dataKey: "name",
    sort: true
  },
  {
    label: "Block",
    type: "text",
    dataKey: "blockName",
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

const Village = () => {
  const dispatch = useAppDispatch();
  const { response: villagesList, totalCount } = useAppSelector(
    (state) => state.masters.villagesList
  ) as villagePaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getVillagesList({ ...tableFilters }));
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
        headerLabel='Village'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add Village'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={villagesList}
          columns={villageColumns}
          keyExtractor='id'
          showTableHeaders={false}
          showPagination={true}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddVillage open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default Village;
