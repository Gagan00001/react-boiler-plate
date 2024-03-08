"use client";

import { TableContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Table from "src/components/Table";

const interventionTypeColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "No. of Items",
    type: "text",
    dataKey: "items"
  },
  {
    label: "Project Type",
    type: "date",
    dataKey: "projectType"
  }
];

const InterventionType = () => {
  return (
    <>
      <PageHeader headerLabel='Intervention Type' />
      <TableContainer>
        <Table data={[]} columns={interventionTypeColumns} keyExtractor='id' showTableHeaders={false} />
      </TableContainer>
    </>
  );
};

export default InterventionType;
