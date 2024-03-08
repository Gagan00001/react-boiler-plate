"use client";

import { useEffect } from "react";
import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getProjectTypes } from "src/redux/slices/projectSlice";

const projectTypeColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "projectType",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "Created On",
    type: "date",
    dataKey: "createdDate"
  }
];

const ProjectType = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.projects.projectTypes);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, []);

  return (
    <>
      <PageHeader headerLabel='Project Type' />
      <TableContainer>
        <Table
          data={data}
          loading={loading}
          columns={projectTypeColumns}
          keyExtractor='projectTypeId'
          showTableHeaders={false}
          showPagination={false}
        />
      </TableContainer>
    </>
  );
};

export default ProjectType;
