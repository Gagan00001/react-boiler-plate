"use client";

import { useCallback, useEffect, useState } from "react";
import { InternalScreenContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import Tabs from "src/components/Tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { createTask } from "src/redux/slices/taskSlice";
import { createTaskRequest } from "src/redux/types/task";
import { useAppDispatch, useAppSelector } from "src/redux";
import useSnackbar from "src/hooks/useSnackbar";
import { dateFormatter } from "src/lib/utils";
import { dateFormats } from "src/lib/constants";
import { getProjectById } from "src/redux/slices/projectSlice";
import LoadingScreen from "src/components/Loader";
import ProjectOverview from "./Tabs/overview";
import Documents from "./Tabs/documents";
import LocationTable from "./Tabs/locationTable";
import Tasks from "./Tabs/tasks";
import TaskForm from "./Tabs/tasks/taskForm";

const ProjectDetails = () => {
  const form = useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const { data: projectDetails, loading } = useAppSelector((state) => state.projects.projectDetails);
  const [value, setValue] = useState<number>(0);
  const [isTaskFormVisible, setTaskFormVisibility] = useState<boolean>(false);
  const [saveTaskFormLoading, setTaskFormLoading] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    projectId && dispatch(getProjectById({ id: projectId }));
  }, [projectId]);

  const handleTaskFormVisbility = useCallback(() => {
    setTaskFormVisibility(!isTaskFormVisible);
  }, [isTaskFormVisible]);

  const handleBackButton = useCallback(() => {
    router.back();
  }, [router]);

  const tabScreen = useCallback(() => {
    switch (value) {
      case 0:
        return <ProjectOverview />;
      case 1:
        return <Documents />;
      case 2:
        return <LocationTable />;
      case 3:
        return <Tasks handleTaskFormVisbility={handleTaskFormVisbility} />;
      default:
        return null;
    }
  }, [handleTaskFormVisbility, value]);

  const handleSubmitData = useCallback(
    async (formData: any) => {
      const parsedFormData: createTaskRequest = {
        ...formData,
        projectId,
        startDate: dateFormatter(formData?.startDate, dateFormats.startsWithYear),
        endDate: dateFormatter(formData?.endDate, dateFormats.startsWithYear)
      };
      setTaskFormLoading(true);
      dispatch(createTask(parsedFormData))
        .unwrap()
        .then((res) => {
          // eslint-disable-next-line promise/always-return
          if (res) {
            setTaskFormLoading(false);
            showSnackbar({
              message: "Task added successfully!",
              type: "success"
            });
            handleTaskFormVisbility();
          }
        })
        .catch(({ error }: any) => {
          setTaskFormLoading(false);
          showSnackbar({
            message: error?.errorMessage,
            type: "error"
          });
        });
    },
    [dispatch, handleTaskFormVisbility, projectId, showSnackbar]
  );

  const handleTaskFormSave = useCallback(() => {
    form.handleSubmit(handleSubmitData)();
  }, [form, handleSubmitData]);

  return (
    <>
      {(loading || saveTaskFormLoading) && <LoadingScreen />}
      <PageHeader
        headerLabel={projectDetails?.projectName || ""}
        showBackIcon={true}
        showIcon={true}
        showBadge={true}
        badgeStatus={projectDetails?.isActive || false}
        backButtonAction={handleBackButton}
        secondaryButtonIcon={isTaskFormVisible ? undefined : "plusIcon"}
        // eslint-disable-next-line no-nested-ternary
        secondaryButtonLabel={isTaskFormVisible ? "Discard" : value === 3 ? "AddTask" : undefined}
        secondaryButtonAction={handleTaskFormVisbility}
        primaryButtonIcon={isTaskFormVisible ? undefined : "editWhiteIcon"}
        primaryButtonAction={isTaskFormVisible ? handleTaskFormSave : () => {}}
        primaryButtonLabel={isTaskFormVisible ? "Save" : "Edit Details"}
        showDownloadButton={!isTaskFormVisible}
      />
      {!isTaskFormVisible ? (
        <Tabs
          selected={value}
          setSelection={setValue}
          values={[
            { id: 0, name: "Overview" },
            { id: 1, name: "Documents" },
            { id: 2, name: "Location" },
            { id: 3, name: "Tasks" }
          ]}
        >
          <InternalScreenContainer>{tabScreen()}</InternalScreenContainer>
        </Tabs>
      ) : (
        <TaskForm formInstance={form} />
      )}
    </>
  );
};
export default ProjectDetails;
