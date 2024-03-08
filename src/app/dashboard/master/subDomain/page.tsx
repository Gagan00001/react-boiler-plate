"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { subDomainPaginationResponse } from "src/redux/types/master";
import { getSubDomainsList } from "src/redux/slices/masterSlice";
import AddSubDomain from "./addSubDomain";

const subDomainColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "Domain",
    type: "text",
    dataKey: "projectDomain.name"
  }
];

const SubDomain = () => {
  const dispatch = useAppDispatch();
  const { response: subDomainsList, totalCount } = useAppSelector(
    (state) => state.masters.subDomainsList
  ) as subDomainPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getSubDomainsList({ ...tableFilters }));
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
        headerLabel='SubDomain'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add SubDomain'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={subDomainsList}
          columns={subDomainColumns}
          keyExtractor='id'
          showTableHeaders={false}
          showPagination={true}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddSubDomain open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default SubDomain;
