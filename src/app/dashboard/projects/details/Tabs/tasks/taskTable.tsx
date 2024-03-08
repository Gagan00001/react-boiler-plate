import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import MudraTypography from "src/components/Mudra/Typography";
import SvgIcon from "src/components/SvgIcon";
import Table from "src/components/Table";
import { useAppSelector } from "src/redux";
import styled from "styled-components";

const StyledIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns = [
  {
    label: "Name",
    type: "text",
    dataKey: "taskName",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "Intervention",
    type: "text",
    render: ({ data: { interventionTypeDetails = [] } }) => (
      <MudraTypography size={14} weight='regular' textColor='neutral100'>
        {interventionTypeDetails?.map((item: any) => item?.interventionType).join(" | ")}
      </MudraTypography>
    )
  },
  {
    label: "SubTasks",
    type: "text",
    render: ({ data: { subTasks = [] } }) => (
      <MudraTypography size={14} weight='regular' textColor='neutral100'>
        {subTasks?.length}
      </MudraTypography>
    )
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
    render: () => {
      return (
        <Tooltip title='This feature will come soon.'>
          <StyledIconsWrapper>
            {/* <SvgIcon name='downloadIcon' height={24} width={24} /> */}
            <SvgIcon name='editIcon' height={24} width={24} />
          </StyledIconsWrapper>
        </Tooltip>
      );
    }
  }
];

const TaskTable = ({ projectId, handleViewTaskVisible }: { projectId: string; handleViewTaskVisible: () => void }) => {
  const router = useRouter();
  const { data: taskData, loading } = useAppSelector((state) => state.tasks.tasks);

  const handleTaskClick = useCallback(
    (rowData: any) => {
      router.replace(`/dashboard/projects/details/?id=${projectId}&taskId=${rowData.taskId}`);
      handleViewTaskVisible();
    },
    [handleViewTaskVisible, projectId, router]
  );

  return (
    <Table
      columns={columns}
      data={taskData}
      loading={loading}
      showTableHeaders={false}
      showPagination={false}
      onRowClick={handleTaskClick}
      keyExtractor='taskId'
    />
  );
};

export default TaskTable;
