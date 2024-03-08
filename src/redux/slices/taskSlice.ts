/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosClient } from "src/api";
import {
  CREATE_TASK,
  CSV_UPLOAD_TASKS,
  GET_ALL_TASKS_BY_PROJECT_ID,
  GET_TASK_INFO_BY_TASK_ID,
  GET_TASK_PARAMETERS
} from "src/api/endpoints";
import { getAbsoluteAPIUrl } from "src/api/serverConfig";
import { format } from "src/lib/utils";
import {
  createTaskRequest,
  getTaskByIdRequest,
  getTaskByIdResponse,
  getTasksRequest,
  parametersResponse,
  taskCsvUploadRequest
} from "../types/task";

type initialStateTypes = {
  parameters: parametersResponse[];
  tasks: {
    data: any;
    loading: boolean;
  };
  csvUpload: {
    loading: boolean;
    data: string;
  };
  taskDetail: {
    loading: boolean;
    data: undefined | getTaskByIdResponse;
  };
};
const initialState: initialStateTypes = {
  parameters: [],
  tasks: {
    data: [],
    loading: false
  },
  csvUpload: {
    loading: false,
    data: ""
  },
  taskDetail: {
    loading: false,
    data: undefined
  }
};

const getTaskParameters = createAsyncThunk<parametersResponse[]>(
  "getTaskParameters",
  async (_, { rejectWithValue }) => {
    try {
      const url = format(GET_TASK_PARAMETERS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const taskParametersResponse = await axiosClient.get(absoluteUrl);
      const projectStreams = taskParametersResponse.data as parametersResponse[];
      if (projectStreams) {
        return projectStreams;
      }
      return rejectWithValue(projectStreams);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const createTask = createAsyncThunk<string, createTaskRequest>(
  "createTask",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_TASK, requestObj.projectId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createTaskBackendResponse = await axiosClient.post(absoluteUrl, {
        taskName: requestObj.taskName,
        interventionType: requestObj.interventionType,
        description: requestObj.description,
        endDate: requestObj.endDate,
        startDate: requestObj.startDate,
        subtasks: requestObj.subtasks
      });
      const createTaskResponse = createTaskBackendResponse.data as string;
      if (createTaskResponse) {
        return createTaskResponse;
      }
      return rejectWithValue(createTaskResponse);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ error: error.response?.data });
      }
      return rejectWithValue({ error: error.response?.data });
    }
  }
);

const tasksCsvUpload = createAsyncThunk<string, taskCsvUploadRequest>(
  "tasksCsvUpload",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CSV_UPLOAD_TASKS, requestObj.projectId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const formData = new FormData();
      formData.append("file", requestObj.file);
      const tasksCsvUploadBackendResponse = await axiosClient.post(absoluteUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const tasksCsvUploadResponse = tasksCsvUploadBackendResponse.data as string;
      if (tasksCsvUploadResponse) {
        return tasksCsvUploadResponse;
      }
      return rejectWithValue(tasksCsvUploadResponse);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

const getAllTasksByProject = createAsyncThunk<any, getTasksRequest>(
  "getAllTasksByProject",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_ALL_TASKS_BY_PROJECT_ID, requestObj.projectId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const tasksResponse = await axiosClient.get(absoluteUrl);
      const tasks = tasksResponse.data as any;
      if (tasks) {
        return tasks;
      }
      return rejectWithValue(tasks);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getTaskByTaskId = createAsyncThunk<getTaskByIdResponse, getTaskByIdRequest>(
  "getTaskByTaskId",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_TASK_INFO_BY_TASK_ID, requestObj.taskId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const taskByIdResponse = await axiosClient.get(absoluteUrl);
      const taskByIdData = taskByIdResponse.data as getTaskByIdResponse;
      if (taskByIdData) {
        return taskByIdData;
      }
      return rejectWithValue(taskByIdData);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTaskParameters.pending, () => {});
    builder.addCase(getTaskParameters.fulfilled, (state, action) => {
      state.parameters = action.payload;
    });
    builder.addCase(getTaskParameters.rejected, () => {});

    builder.addCase(createTask.pending, () => {});
    builder.addCase(createTask.fulfilled, () => {});
    builder.addCase(createTask.rejected, () => {});

    builder.addCase(tasksCsvUpload.pending, (state) => {
      state.csvUpload.loading = true;
    });
    builder.addCase(tasksCsvUpload.fulfilled, (state, action) => {
      state.csvUpload.loading = false;
      state.csvUpload.data = action.payload;
    });
    builder.addCase(tasksCsvUpload.rejected, () => {});

    builder.addCase(getAllTasksByProject.pending, (state) => {
      state.tasks.loading = true;
    });
    builder.addCase(getAllTasksByProject.fulfilled, (state, action) => {
      state.tasks.loading = false;
      state.tasks.data = action.payload;
    });
    builder.addCase(getAllTasksByProject.rejected, () => {});

    builder.addCase(getTaskByTaskId.pending, (state) => {
      state.taskDetail.loading = true;
    });
    builder.addCase(getTaskByTaskId.fulfilled, (state, action) => {
      state.taskDetail.loading = false;
      state.taskDetail.data = action.payload;
    });
    builder.addCase(getTaskByTaskId.rejected, () => {});
  }
});

export default TaskSlice.reducer;

export { createTask, getTaskParameters, getAllTasksByProject, getTaskByTaskId, tasksCsvUpload };
