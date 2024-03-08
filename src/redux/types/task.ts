type createTaskRequest = {
  projectId: string;
  taskName: string;
  interventionType: string[];
  startDate: string;
  endDate: string;
  description: string;
  subtasks: { subTaskName: string; parameters: string[] }[];
};

type parametersResponse = {
  parameterId: string;
  parameter: string;
};

type getTasksRequest = {
  projectId: string;
};

type getTaskByIdRequest = {
  taskId: string;
};

type taskCsvUploadRequest = {
  projectId: string;
  file: File;
};

type getTaskByIdResponse = {
  taskId: string;
  project: {
    projectId: string;
    projectType: {
      projectTypeId: string;
      projectType: string;
      description: string;
      createdDate: string;
      updatedDate: string;
      createdBy: string | null;
      visibleTo: string[];
      viewOrder: number | string;
      active: boolean;
    };
    projectName: string;
  };
  projectTypeId: string;
  taskName: string;
  description: string;
  taskComplexityLevel: string | null;
  startDate: string;
  endDate: string;
  subTasks: {
    subTaskId: string;
    taskId: string;
    subTaskName: string;
    subTaskForm: string | null;
    repeatSubTask: string | null;
    capabilities: string | null;
    parameters: string[];
    interventionType: string | null;
    subTaskDescription: string | null;
    startDate: string;
    endDate: string;
  }[];
  interventionType: string[];
  interventionTypeDetails: object[];
  taskStatus: string;
};

export type {
  createTaskRequest,
  parametersResponse,
  getTasksRequest,
  getTaskByIdRequest,
  taskCsvUploadRequest,
  getTaskByIdResponse
};
