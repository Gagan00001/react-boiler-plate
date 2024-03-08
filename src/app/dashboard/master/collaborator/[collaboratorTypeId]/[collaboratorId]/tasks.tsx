import { useEffect } from "react";
import { useParams } from "next/navigation";

import { dateFormatter } from "src/lib/utils";
import { dateFormats } from "src/lib/constants";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getCollaboratorTaskDetailsById } from "src/redux/slices/collaboratorSlice";

import LoadingScreen from "src/components/Loader";
import { InfoBlock, RowContainer, ViewSectionContainer } from "src/components/Containers";
import MudraTypography from "src/components/Mudra/Typography";

const CollaboratorTasks = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.collaborators.collaboratorTaskDetail);
  useEffect(() => {
    dispatch(
      getCollaboratorTaskDetailsById({
        collaboratorId: params.collaboratorId as string,
        collaboratorTypeId: params.collaboratorTypeId as string
      })
    );
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {Object?.keys(data || {})?.map((taskName, index) => (
        <ViewSectionContainer
          key={`${index + 1}-${taskName}`}
          heading={`${taskName} (${data[taskName]?.length})`}
          childContainerStyles={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {data[taskName]?.map((subTask, subTaskIndex) => (
            <RowContainer key={`${subTaskIndex + 1}-${subTask?.subtaskName}`}>
              <InfoBlock>
                <MudraTypography size={14} weight='regular' textColor='neutral50'>
                  {subTask?.subtaskName}
                </MudraTypography>
                <MudraTypography size={16} weight='regular' textColor='neutral50'>
                  Duration:
                  <MudraTypography
                    size={16}
                    weight='bold'
                    style={{ display: "inline", margin: "0px 4px" }}
                    textColor='neutral60'
                  >
                    {`${dateFormatter(subTask.startDate, dateFormats.dateWithMonth)} - ${dateFormatter(subTask.endDate, dateFormats.dateWithMonth)}`}
                  </MudraTypography>
                </MudraTypography>
              </InfoBlock>
            </RowContainer>
          ))}
        </ViewSectionContainer>
      ))}
    </>
  );
};

export default CollaboratorTasks;
