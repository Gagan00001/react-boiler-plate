"use client";

import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getBeneficiary } from "src/redux/slices/masterSlice";
import { BeneficiaryPaginationResponse } from "src/redux/types/master";
import AddBeneficiary from "./addBeneficiary";

const beneficiaryColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "beneficiaryType",
    maxWidth: "8rem",
    sort: true
  }
];

const Beneficiary = () => {
  const dispatch = useAppDispatch();
  const beneficiaryData = useAppSelector((state) => state.masters.beneficiary) as BeneficiaryPaginationResponse;
  const [tableFilters, setTableFilters] = useState({
    pageNumber: 0,
    pageSize: 10
  });
  const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(tableFilters) && addModalVisibility === false) {
      dispatch(getBeneficiary({ ...tableFilters }));
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
        headerLabel='Beneficiary'
        showIcon
        primaryButtonIcon='plusWhiteIcon'
        primaryButtonLabel='Add Beneficiary'
        primaryButtonAction={handleAddModalVisibility}
        secondaryButtonIcon='downloadIcon'
        secondaryButtonLabel='Export CSV'
      />
      <TableContainer>
        <Table
          data={beneficiaryData?.response}
          columns={beneficiaryColumns}
          keyExtractor='beneficiaryId'
          showTableHeaders={false}
          showPagination={true}
          totalCount={beneficiaryData?.totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {addModalVisibility && <AddBeneficiary open={addModalVisibility} setOpen={setAddModalVisibility} />}
    </>
  );
};

export default Beneficiary;
