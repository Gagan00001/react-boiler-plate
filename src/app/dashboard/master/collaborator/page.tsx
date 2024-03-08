"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getCollaboratorTypeList } from "src/redux/slices/collaboratorSlice";

const collaboratorColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "collaboratorTypeName",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "No. of Items",
    type: "text",
    dataKey: "collaboratorCount"
  },
  {
    label: "Created On",
    type: "date",
    dataKey: "createdDate"
  }
];

const Collaborator = () => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { data: collabTypeList, loading } = useAppSelector((state) => state.collaborators.collaboratorTypeList);

  useEffect(() => {
    dispatch(getCollaboratorTypeList());
  }, []);

  const handleRowClick = useCallback(
    (rowData: any) => {
      router.push(`${pathName}/${rowData?.collaboratorTypeId}?collabType=${rowData.collaboratorTypeName}`);
    },
    [pathName, router]
  );
  return (
    <>
      <PageHeader headerLabel='Collaborator' />
      <TableContainer>
        <Table
          data={collabTypeList}
          columns={collaboratorColumns}
          loading={loading}
          keyExtractor='collaboratorTypeId'
          showTableHeaders={false}
          totalCount={collabTypeList?.length}
          onRowClick={handleRowClick}
        />
      </TableContainer>
    </>
  );
};

export default Collaborator;
