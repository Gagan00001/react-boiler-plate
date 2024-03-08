import { useCallback, useState } from "react";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";

import { InformationArrayBlock, InformationBlock, RowContainer } from "src/components/Containers";
import RightModal from "src/components/Modal/rightModal";
import SvgIcon from "src/components/SvgIcon";
import Table from "src/components/Table";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

const columns = [
  {
    label: "Name",
    type: "text",
    dataKey: "subTaskName",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "Start Date",
    dataKey: "startDate",
    type: "date"
  },
  {
    label: "End Date",
    dataKey: "endDate",
    type: "date"
  },
  {
    label: "Action",
    width: "96px",
    render: () => (
      <Tooltip title='This feature will come soon.'>
        <SvgIcon name='deleteIcon' height={24} width={24} />
      </Tooltip>
    )
  }
];

const ContentContainer = styled.div`
  padding: 24px;
`;

const SubTaskTable = ({ subTaskData = [] }: { subTaskData: any }) => {
  const [isSubTaskModalVisible, setSubTaskModalVisibility] = useState(false);
  const [rowData, setRowData] = useState<any>({});

  const handleSubTaskClick = useCallback((row: any) => {
    setRowData(row);
    setSubTaskModalVisibility(true);
  }, []);

  return (
    <>
      <Table
        columns={columns}
        data={subTaskData}
        showTableHeaders={true}
        showPagination={false}
        headerLabel='Subtasks'
        keyExtractor='subTaskId'
        onRowClick={handleSubTaskClick}
      />
      {isSubTaskModalVisible && !isEmpty(rowData) && (
        <RightModal
          heading={rowData.subTaskName || ""}
          open={isSubTaskModalVisible}
          toggleOpen={() => setSubTaskModalVisibility(false)}
          showIcon={false}
          icon='uploadDarkIcon'
        >
          <ContentContainer>
            <RowContainer gap={60}>
              <InformationBlock label={"Start Date"} value={dayjs(rowData?.startDate).format("DD/MM/YYYY")} />
              <InformationBlock label={"End Date"} value={dayjs(rowData?.endDate).format("DD/MM/YYYY")} />
            </RowContainer>
            <RowContainer gap={60} style={{ marginTop: "20px" }}>
              <InformationArrayBlock label='Parameters' values={rowData?.parameters?.map((item: any) => item)} />
            </RowContainer>
          </ContentContainer>
        </RightModal>
      )}
    </>
  );
};

export default SubTaskTable;
