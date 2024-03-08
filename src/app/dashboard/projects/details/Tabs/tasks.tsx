/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "src/redux";
import { getAllTasksByProject } from "src/redux/slices/taskSlice";

import SvgIcon from "src/components/SvgIcon";
import MudraButton from "src/components/Mudra/Button";
import MudraTypography from "src/components/Mudra/Typography";
import { PageContainer, RowContainer, StyledBox } from "src/components/Containers";
import { IconAlignment, Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";
import TaskTable from "./tasks/taskTable";
import TaskCSVModal from "./tasks/taskCsvModal";
import ViewTaskDetail from "./tasks/viewTaskDetail";

const TaskParentContainer = styled(PageContainer)`
  margin: 0;
`;

const TaskContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledButtonsContainer = styled(RowContainer)`
  width: 50%;
`;

type TasksProps = {
  handleTaskFormVisbility: () => void;
};
const Tasks = ({ handleTaskFormVisbility }: TasksProps) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "";
  const { data: taskData } = useAppSelector((state) => state.tasks.tasks);
  const [csvModalVisible, setIsCSVModalVisible] = useState<boolean>(false);
  const [isViewTaskVisible, setViewTaskVisible] = useState<boolean>(false);

  useEffect(() => {
    if (projectId && csvModalVisible === false) {
      dispatch(getAllTasksByProject({ projectId }));
    }
  }, [projectId, csvModalVisible]);

  const handleCSVUpload = useCallback(() => {
    setIsCSVModalVisible(true);
  }, []);

  const handleViewTaskVisible = useCallback(() => {
    setViewTaskVisible(!isViewTaskVisible);
  }, [isViewTaskVisible]);

  return (
    <TaskParentContainer>
      {isEmpty(taskData) ? (
        <StyledBox includeTopMargin={false}>
          <TaskContainer>
            <SvgIcon name='folderIcon' width={90} height={90} />
            <MudraTypography size={24} weight='extraBold' textColor='neutral100'>
              No Task
            </MudraTypography>
            <MudraTypography size={16} weight='regular' textColor='neutral70'>
              Start adding tasks here!
            </MudraTypography>
            <StyledButtonsContainer>
              <MudraButton
                onClick={handleTaskFormVisbility}
                variant={Variant.Secondary}
                label='Add Manually'
                size={Size.Medium}
                width={Width.Full}
                iconAlignment={IconAlignment.LeftAligned}
                icon={() => <SvgIcon name='plusIcon' width={16} height={16} style={{ marginRight: "12px" }} />}
              />
              <MudraButton
                onClick={handleCSVUpload}
                variant={Variant.Primary}
                label='Upload CSV'
                size={Size.Medium}
                width={Width.Full}
                iconAlignment={IconAlignment.LeftAligned}
                icon={() => <SvgIcon name='uploadIcon' width={16} height={16} style={{ marginRight: "12px" }} />}
              />
            </StyledButtonsContainer>
          </TaskContainer>
        </StyledBox>
      ) : isViewTaskVisible ? (
        <ViewTaskDetail handleViewTaskVisible={handleViewTaskVisible} />
      ) : (
        <TaskTable projectId={projectId} handleViewTaskVisible={handleViewTaskVisible} />
      )}
      {csvModalVisible && <TaskCSVModal open={csvModalVisible} setOpen={setIsCSVModalVisible} projectId={projectId} />}
    </TaskParentContainer>
  );
};

export default Tasks;
