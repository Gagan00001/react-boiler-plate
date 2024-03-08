import { useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "src/redux";
import { getTaskByTaskId } from "src/redux/slices/taskSlice";

import LoadingScreen from "src/components/Loader";
import MudraTypography from "src/components/Mudra/Typography";
import { InformationBlock, RowContainer, ViewSectionContainer } from "src/components/Containers";
import SubTaskTable from "./subTaskTable";

const BreadCrumbContainer = styled.div`
  margin-bottom: 12px;
`;
const ViewTaskDetail = ({ handleViewTaskVisible }: { handleViewTaskVisible: () => void }) => {
  const searchParams = useSearchParams();
  const taskId = searchParams?.get("taskId");
  const dispatch = useAppDispatch();

  const { data: taskDetail, loading } = useAppSelector((state) => state.tasks.taskDetail);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByTaskId({ taskId }));
    }
  }, [taskId]);

  return (
    <>
      {loading && <LoadingScreen />}
      <BreadCrumbContainer>
        <MudraTypography
          textColor='neutral40'
          weight='bold'
          onClick={handleViewTaskVisible}
          style={{ cursor: "pointer" }}
        >
          Tasks /
          <MudraTypography
            textColor='neutral80'
            weight='bold'
            style={{ display: "inline", margin: "0px 4px", cursor: "pointer" }}
          >
            {taskDetail?.taskName}
          </MudraTypography>
        </MudraTypography>
      </BreadCrumbContainer>
      <ViewSectionContainer heading='Basic Details'>
        <RowContainer gap={60}>
          <InformationBlock label={"Name"} value={taskDetail?.taskName} />
          <InformationBlock
            label={"Intervention"}
            value={taskDetail?.interventionTypeDetails?.map((item: any) => item?.interventionType).join(" | ")}
          />
        </RowContainer>
        <RowContainer gap={60}>
          <InformationBlock label={"Start Date"} value={dayjs(taskDetail?.startDate).format("DD/MM/YYYY")} />
          <InformationBlock label={"End Date"} value={dayjs(taskDetail?.endDate).format("DD/MM/YYYY")} />
        </RowContainer>
        <RowContainer gap={60}>
          <InformationBlock label={"Description"} value={taskDetail?.description} />
        </RowContainer>
      </ViewSectionContainer>
      <div style={{ marginTop: "24px" }}>
        <SubTaskTable subTaskData={taskDetail?.subTasks} />
      </div>
    </>
  );
};

export default ViewTaskDetail;
