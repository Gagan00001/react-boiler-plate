/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";
import { axiosClient } from "src/api";
import { format } from "src/lib/utils";
import { getAbsoluteAPIUrl } from "src/api/serverConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GET_COLLABORATORS_TYPE_LIST,
  GET_COLLABORATOR_DETAIL_BY_ID,
  GET_COLLABORATOR_DETAIL_BY_TYPE,
  GET_COLLABORATOR_TASK_DETAILS
} from "src/api/endpoints";
import { genericSpecificWrapperData } from "src/lib/commonTypes";
import {
  CollaboratorTypeDetailRequest,
  CollaboratorDetailTypeResponse,
  CollaboratorListResponse,
  CollaboratorDetailRequest,
  CollaboratorDetailResponse,
  CollaboratorTaskDetailResponse
} from "../types/collaborator";

type initialStateType = {
  collaboratorTypeList: {
    loading: boolean;
    data: CollaboratorListResponse[];
  };
  collaboratorTypeDetail: {
    loading: boolean;
    data: CollaboratorDetailTypeResponse;
  };
  collaboratorDetail: {
    loading: boolean;
    data: CollaboratorDetailResponse | null;
  };
  collaboratorTaskDetail: {
    loading: boolean;
    data: CollaboratorTaskDetailResponse;
  };
};
const initialState: initialStateType = {
  collaboratorTypeList: {
    loading: false,
    data: []
  },
  collaboratorTypeDetail: {
    loading: false,
    data: {
      response: []
    }
  },
  collaboratorDetail: {
    loading: false,
    data: null
  },
  collaboratorTaskDetail: {
    loading: false,
    data: {}
  }
};

const getCollaboratorTypeList = createAsyncThunk<CollaboratorListResponse[]>(
  "getCollaboratorTypeList",
  async (_, { rejectWithValue }) => {
    try {
      const url = format(GET_COLLABORATORS_TYPE_LIST);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const collaboratorsBackendResponse = await axiosClient.get(absoluteUrl);
      const collaboratorsList = collaboratorsBackendResponse.data as genericSpecificWrapperData<
        CollaboratorListResponse[]
      >;
      if (collaboratorsList.success) {
        return collaboratorsList.data;
      }
      return rejectWithValue(collaboratorsList.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getCollaboratorTypeDetail = createAsyncThunk<CollaboratorDetailTypeResponse, CollaboratorTypeDetailRequest>(
  "getCollaboratorTypeDetail",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_COLLABORATOR_DETAIL_BY_TYPE, requestObj.type, requestObj.pageNumber, requestObj.pageSize);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const collaboratorsTypeDetailBackendResponse = await axiosClient.get(absoluteUrl);
      const collaboratorsTypeDetails =
        collaboratorsTypeDetailBackendResponse.data as genericSpecificWrapperData<CollaboratorDetailTypeResponse>;
      if (collaboratorsTypeDetails.success) {
        return collaboratorsTypeDetails.data;
      }
      return rejectWithValue(collaboratorsTypeDetails.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getCollaboratorDetailById = createAsyncThunk<CollaboratorDetailResponse, CollaboratorDetailRequest>(
  "getCollaboratorDetailById",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_COLLABORATOR_DETAIL_BY_ID, requestObj.collaboratorId, requestObj.collaboratorTypeId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const collaboratorsDetailBackendResponse = await axiosClient.get(absoluteUrl);
      const collaboratorsDetails =
        collaboratorsDetailBackendResponse.data as genericSpecificWrapperData<CollaboratorDetailResponse>;
      if (collaboratorsDetails.success) {
        return collaboratorsDetails.data;
      }
      return rejectWithValue(collaboratorsDetails.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getCollaboratorTaskDetailsById = createAsyncThunk<CollaboratorTaskDetailResponse, CollaboratorDetailRequest>(
  "getCollaboratorTaskDetailsById",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_COLLABORATOR_TASK_DETAILS, requestObj.collaboratorId, requestObj.collaboratorTypeId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const collaboratorTaskDetailBackendResponse = await axiosClient.get(absoluteUrl);
      const collaboratorTasksDetails =
        collaboratorTaskDetailBackendResponse.data as genericSpecificWrapperData<CollaboratorTaskDetailResponse>;
      if (collaboratorTasksDetails.success) {
        return collaboratorTasksDetails.data;
      }
      return rejectWithValue(collaboratorTasksDetails.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const CollaboratorSlice = createSlice({
  name: "Collaborators",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCollaboratorTypeList.pending, (state) => {
      state.collaboratorTypeList.loading = true;
    });
    builder.addCase(getCollaboratorTypeList.fulfilled, (state, action) => {
      state.collaboratorTypeList.loading = false;
      state.collaboratorTypeList.data = action.payload;
    });
    builder.addCase(getCollaboratorTypeList.rejected, () => {});

    builder.addCase(getCollaboratorTypeDetail.pending, (state) => {
      state.collaboratorTypeDetail.loading = true;
    });
    builder.addCase(getCollaboratorTypeDetail.fulfilled, (state, action) => {
      state.collaboratorTypeDetail.loading = false;
      state.collaboratorTypeDetail.data = action.payload;
    });
    builder.addCase(getCollaboratorTypeDetail.rejected, () => {});

    builder.addCase(getCollaboratorDetailById.pending, (state) => {
      state.collaboratorDetail.loading = true;
    });
    builder.addCase(getCollaboratorDetailById.fulfilled, (state, action) => {
      state.collaboratorDetail.loading = false;
      state.collaboratorDetail.data = action.payload;
    });
    builder.addCase(getCollaboratorDetailById.rejected, () => {});

    builder.addCase(getCollaboratorTaskDetailsById.pending, (state) => {
      state.collaboratorTaskDetail.loading = true;
    });
    builder.addCase(getCollaboratorTaskDetailsById.fulfilled, (state, action) => {
      state.collaboratorTaskDetail.loading = false;
      state.collaboratorTaskDetail.data = action.payload;
    });
    builder.addCase(getCollaboratorTaskDetailsById.rejected, () => {});
  }
});

export default CollaboratorSlice.reducer;

export {
  getCollaboratorTypeList,
  getCollaboratorTypeDetail,
  getCollaboratorDetailById,
  getCollaboratorTaskDetailsById
};
