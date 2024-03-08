"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getDomains } from "src/redux/slices/masterSlice";
import { domainPaginationResponse } from "src/redux/types/master";
import AddDomain from "./addDomain";

const domainColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  }
];

const Domain = () => {
  const dispatch = useAppDispatch();
  const domainsData = useAppSelector((state) => state.masters.projectDomains) as domainPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getDomains({ ...tableFilters }));
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
        headerLabel='Domain'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add Domain'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={domainsData?.response}
          columns={domainColumns}
          keyExtractor='id'
          showTableHeaders={false}
          showPagination={true}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          totalCount={domainsData?.totalCount}
        />
      </TableContainer>
      {addModalVisibility && <AddDomain open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default Domain;
