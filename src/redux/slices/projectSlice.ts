/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosClient } from "src/api";
import {
  CREATE_PROJECT,
  CSV_UPLOAD_PROJECT,
  GET_PROJECT_DOCUMENT_LIST,
  GET_PROJECT_LIST,
  GET_PROJECT_BY_ID,
  GET_PROJECT_TYPES,
  GENERATE_S3_PRESIGNED_URL_UPLOAD,
  ADD_CONTENT_FILE_REQUEST,
  PROJECT_DOCUMENT_DOWNLOAD,
  PROJECT_LOCATIONS
} from "src/api/endpoints";
import { getAbsoluteAPIUrl } from "src/api/serverConfig";
import { format } from "src/lib/utils";

import { s3Client } from "src/api/axiosClient";
import {
  AddContentFileRequest,
  GeneratePresignedURLRequest,
  ProjectByIdRequest,
  ProjectByIdResponse,
  ProjectInfo,
  ProjectType,
  ProjectsListRequest,
  ProjectsListResponse,
  UploadWithPresignedURLRequest,
  createProjectRequest,
  getProjectDocumentsListRequest,
  getProjectDocumentsListResponse,
  getProjectLocationsResponse,
  projectCsvUploadRequest,
  projectDocumentDownloadRequest
} from "../types/project";
import { genericPayload, genericSpecificWrapperData } from "src/lib/commonTypes";

type ProjectInitialState = {
  projectTypes: {
    loading: boolean;
    data: ProjectType[];
  };
  projectDetails: {
    loading: boolean;
    data?: ProjectByIdResponse;
  };
  projectsList: {
    loading: boolean;
    totalCount: number;
    data: ProjectInfo[];
  };
  documentsList: {
    loading: boolean;
    data: getProjectDocumentsListResponse[];
    currentFilter: string;
  };
  csvUpload: {
    loading: boolean;
    data: string;
  };
  projectLocations: {
    loading: boolean;
    data: getProjectLocationsResponse;
  };
};

const initialState: ProjectInitialState = {
  projectTypes: {
    loading: false,
    data: []
  },
  projectDetails: {
    loading: false,
    data: undefined
  },
  projectsList: {
    loading: false,
    totalCount: 0,
    data: []
  },
  documentsList: {
    loading: false,
    data: [],
    currentFilter: ""
  },
  csvUpload: {
    loading: false,
    data: ""
  },
  projectLocations: {
    loading: false,
    data: {
      states: []
    }
  }
};

const getProjectTypes = createAsyncThunk<ProjectType[]>("getProjectTypes", async (_, { rejectWithValue }) => {
  try {
    const url = format(GET_PROJECT_TYPES);
    const absoluteUrl = getAbsoluteAPIUrl(url);
    const projectTypesBackendResponse = await axiosClient.get(absoluteUrl);
    const projectTypesResponse = projectTypesBackendResponse.data as ProjectType[];
    if (projectTypesResponse) {
      return projectTypesResponse;
    }
    return rejectWithValue(projectTypesResponse);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue("error");
    }
    return rejectWithValue("error");
  }
});

const getProjectsList = createAsyncThunk<ProjectsListResponse, ProjectsListRequest>(
  "getProjectsList",
  async (requestInfo, { rejectWithValue }) => {
    try {
      const url = format(GET_PROJECT_LIST, requestInfo.type);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const projectsListBackendResponse = await axiosClient.get(absoluteUrl, {
        params: {
          page: requestInfo.page,
          recordsPerPage: requestInfo.recordsPerPage,
          searchText: requestInfo?.searchText
        }
      });
      const projectTypesResponse = projectsListBackendResponse.data as ProjectsListResponse;
      if (projectTypesResponse) {
        return projectTypesResponse;
      }
      return rejectWithValue(projectTypesResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getProjectById = createAsyncThunk<ProjectByIdResponse, ProjectByIdRequest>(
  "getProjectById",
  async (requestInfo, { rejectWithValue }) => {
    try {
      const url = format(GET_PROJECT_BY_ID, requestInfo.id);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const projectDetailBackendResponse = await axiosClient.get(absoluteUrl);
      const projectDetailResponse = projectDetailBackendResponse.data as ProjectByIdResponse;
      if (projectDetailResponse) {
        return projectDetailResponse;
      }
      return rejectWithValue(projectDetailResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const createProject = createAsyncThunk<string, createProjectRequest>(
  "createProject",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_PROJECT);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createProjectBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createprojectResponse = createProjectBackendResponse.data as genericSpecificWrapperData<string>;
      if (createprojectResponse.success) {
        return createprojectResponse.data;
      }
      return rejectWithValue(createprojectResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ error: error.response?.data });
      }
      return rejectWithValue({ error: error.response?.data });
    }
  }
);

const getProjectDocumentList = createAsyncThunk<getProjectDocumentsListResponse[], getProjectDocumentsListRequest>(
  "getProjectDocumentList",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(
        GET_PROJECT_DOCUMENT_LIST,
        requestObj.projectId,
        requestObj.contentType,
        requestObj.page,
        requestObj.recordsPerPage
      );
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const projectDocumentsBackendResponse = await axiosClient.get(absoluteUrl);
      const projectsDocumentsList = projectDocumentsBackendResponse.data as getProjectDocumentsListResponse[];
      if (projectsDocumentsList) {
        return projectsDocumentsList;
      }
      return rejectWithValue(projectsDocumentsList);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const projectCsvUpload = createAsyncThunk<string, projectCsvUploadRequest>(
  "projectCsvUpload",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CSV_UPLOAD_PROJECT);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const formData = new FormData();
      formData.append("file", requestObj.file);
      const projectCsvUploadBackendResponse = await axiosClient.post(absoluteUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const projectCsvUploadResponse = projectCsvUploadBackendResponse.data as string;
      if (projectCsvUploadResponse) {
        return projectCsvUploadResponse;
      }
      return rejectWithValue(projectCsvUploadResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getS3FileUploadURL = createAsyncThunk<string[], genericPayload<GeneratePresignedURLRequest>>(
  "getS3FileUploadURL",
  async (generateS3FileUploadURLObj, { rejectWithValue }) => {
    try {
      const url = format(GENERATE_S3_PRESIGNED_URL_UPLOAD, ...generateS3FileUploadURLObj.params);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, ...body } = generateS3FileUploadURLObj.body;
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const generateS3FileUploadURLResp = await axiosClient.post(absoluteUrl, body);
      const generateS3FileUploadURL = generateS3FileUploadURLResp.data as genericSpecificWrapperData<string[]>;
      if (generateS3FileUploadURL.success) {
        return generateS3FileUploadURL.data;
      }
      return rejectWithValue(generateS3FileUploadURL.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const uploadDocsToS3 = createAsyncThunk<string[], UploadWithPresignedURLRequest>(
  "uploadDocsToS3",
  async (s3UploadObj, { rejectWithValue }) => {
    try {
      const uploadResponse = await Promise.allSettled(
        s3UploadObj.uploadURLs.map(async (item: string, index: number) => {
          const arrayBuffer = await s3UploadObj.docList[index].arrayBuffer();
          return s3Client.put(item, arrayBuffer, {
            headers: {
              "Content-Type": s3UploadObj.docList[index]?.type
            }
          });
        })
      );
      const results: any[] = [];
      uploadResponse.forEach((response) => {
        if (response.status === "fulfilled") {
          results.push(response.value.data);
        } else {
          rejectWithValue("Error while Uploading.");
        }
      });
      return results;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("Something went wrong");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const addContentFileRequest = createAsyncThunk<string, AddContentFileRequest>(
  "addContentFileRequest",
  async (createNewFeedObj, { rejectWithValue }) => {
    try {
      const url = getAbsoluteAPIUrl(ADD_CONTENT_FILE_REQUEST);
      const createNewFeedResp = await axiosClient.post(url, createNewFeedObj);
      const createNewFeed = createNewFeedResp.data as genericSpecificWrapperData<string>;
      if (createNewFeed.success) {
        return createNewFeed.data;
      }
      return rejectWithValue(createNewFeed.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const documentDownloadFromS3 = createAsyncThunk<string, projectDocumentDownloadRequest>(
  "documentDownloadFromS3",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(PROJECT_DOCUMENT_DOWNLOAD, requestObj.path, requestObj.expiry);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const documentDownloadResp = await axiosClient.get(absoluteUrl);
      const documentDownload = documentDownloadResp.data as genericSpecificWrapperData<string>;
      if (documentDownload.success) {
        return documentDownload.data;
      }
      return rejectWithValue(documentDownload.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getProjectLocations = createAsyncThunk<getProjectLocationsResponse, ProjectByIdRequest>(
  "projectLocations",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(PROJECT_LOCATIONS, requestObj.id);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const projectLocationsResponse = await axiosClient.get(absoluteUrl);
      const projectLocations = projectLocationsResponse.data as getProjectLocationsResponse;
      if (projectLocations) {
        return projectLocations;
      }
      return rejectWithValue(projectLocations);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const ProjectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjectTypes.pending, (state) => {
      state.projectTypes.loading = true;
    });
    builder.addCase(getProjectTypes.fulfilled, (state, action) => {
      state.projectTypes.loading = false;
      state.projectTypes.data = action.payload;
    });
    builder.addCase(getProjectTypes.rejected, () => {});

    builder.addCase(getProjectsList.pending, (state) => {
      state.projectsList.loading = true;
    });
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.projectsList.loading = false;
      state.projectsList.data = action.payload.entries;
      state.projectsList.totalCount = action.payload.totalCount;
    });
    builder.addCase(getProjectsList.rejected, () => {});

    builder.addCase(getProjectById.pending, (state) => {
      state.projectDetails.loading = true;
      state.projectDetails.data = undefined;
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      state.projectDetails.loading = false;
      state.projectDetails.data = action.payload;
    });
    builder.addCase(getProjectById.rejected, (state) => {
      state.projectDetails.loading = false;
    });

    builder.addCase(createProject.pending, () => {});
    builder.addCase(createProject.fulfilled, () => {});
    builder.addCase(createProject.rejected, () => {});

    builder.addCase(getProjectDocumentList.pending, (state) => {
      state.documentsList.loading = true;
    });
    builder.addCase(getProjectDocumentList.fulfilled, (state, action) => {
      state.documentsList.loading = false;
      state.documentsList.data = action.payload;
      state.documentsList.currentFilter = action.meta.arg.contentType;
    });
    builder.addCase(getProjectDocumentList.rejected, () => {});

    builder.addCase(projectCsvUpload.pending, (state) => {
      state.csvUpload.loading = true;
    });
    builder.addCase(projectCsvUpload.fulfilled, (state, action) => {
      state.csvUpload.loading = false;
      state.csvUpload.data = action.payload;
    });
    builder.addCase(projectCsvUpload.rejected, () => {});

    builder.addCase(getProjectLocations.pending, (state) => {
      state.projectLocations.loading = true;
    });
    builder.addCase(getProjectLocations.fulfilled, (state, action) => {
      state.projectLocations.loading = false;
      state.projectLocations.data.states = action.payload?.states;
    });
    builder.addCase(getProjectLocations.rejected, () => {});
  }
});

export default ProjectSlice.reducer;

export {
  getProjectTypes,
  getProjectsList,
  getProjectById,
  createProject,
  getProjectDocumentList,
  projectCsvUpload,
  uploadDocsToS3,
  getS3FileUploadURL,
  addContentFileRequest,
  documentDownloadFromS3,
  getProjectLocations
};
