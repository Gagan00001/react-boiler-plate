export type GeneratePresignedURLRequest = {
  projectId: string;
  docList: string[];
  type: "PROJECT_DOC";
};

export type UploadWithPresignedURLRequest = {
  docList: File[];
  uploadURLs: string[];
};

export type AddContentFileRequest = {
  projectId: string;
  name: string;
  description: string;
  contentType: "IMAGE" | "VIDEO" | "DOCUMENT";
  filePath: string;
};

type ProjectType = {
  active: boolean;
  createdBy: string | null;
  createdDate: string;
  description: string;
  projectType: string;
  projectTypeId: string;
  updatedDate: string;
  visibleTo: string[];
};

type ProjectInfo = {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

type ProjectsListRequest = {
  type: string;
  page: number;
  recordsPerPage: number;
  searchText?: string | undefined;
};
type ProjectsListResponse = {
  entries: ProjectInfo[];
  totalCount: number;
};

type ProjectByIdRequest = {
  id: string;
};
type ProjectByIdResponse = {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  projectVision: string | null;
  projectPreReadLinks: string[];
  videoImageLink: string | null;
  beneficiaries: { beneficiaryId: string; beneficiaryType: string }[];
  interventionType?: {
    interventionTypeId: string;
    interventionType: string;
  }[];
  projectLogo: string | null;
  projectType: {
    projectTypeId: string;
    projectType: string;
    description?: string | null;
    createdDate: string;
    updatedDate: string;
    createdBy: string | null;
    visibleTo: ("PL" | "Admin")[];
    viewOrder: number;
    active: boolean;
  };
  createdDate: string;
  updatedDate: string;
  createdBy: null;
  isActive: null;
  states: string[];
  districts: {
    districtId: string;
    districtName: string;
    state: string;
    states: {
      id: string;
      name: string;
      districts: string[];
      createdDate: string | null;
      updatedDate: string | null;
      createdBy: string | null;
      updatedBy: string | null;
    };
    blocks: [];
    createdDate: string;
    updatedDate: string;
    createdBy: string;
  }[];
  blocks: string[];
  projectDomainList: {
    id: string;
    name: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
  }[];
  projectSubDomainList: {
    id: string;
    name: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
  }[];
  stakeholders: {
    createdBy: string;
    createdDate: string;
    id: string;
    name: string;
    updatedBy: string;
    updatedDate: string;
  }[];
  learningOpportunities: {
    createdBy: string;
    createdDate: string;
    id: string;
    name: string;
    updatedBy: string;
    updatedDate: string;
  }[];
  projectStreams: {
    createdBy: string;
    createdDate: string;
    id: string;
    name: string;
    updatedBy: string;
    updatedDate: string;
  }[];
  projectContents: string[];
  projectMode: string | null;
};

type createProjectRequest = {
  projectTypeId: string;
  name: string;
  projectMode: string;
  startDate: string;
  endDate: string;
  domainId: string;
  subDomainId: string;
  description: string;
  vision: string;
  beneficiaryIds: string[];
  stakeholderIds: string[];
  interventionTypeIds: string[];
  learningOpportunityIds?: string[];
  stateIds: string[];
  districtIds: string[];
  blockIds: string[];
  projectStreamId: string[];
};

type getProjectDocumentsListRequest = {
  projectId: string;
  contentType: string;
  page: number;
  recordsPerPage: number;
};

type getProjectDocumentsListResponse = {
  name: string;
  description: string;
  contentType: string;
  filePath: string;
};

type getProjectLocationsResponse = {
  states: {
    id: string;
    name: string;
    districts: { id: string; name: string }[];
    blocks: { id: string; name: string }[];
  }[];
};

type projectDocumentDownloadRequest = {
  path: string;
  expiry: number;
};
type projectCsvUploadRequest = {
  file: File;
};

export type {
  ProjectType,
  ProjectInfo,
  ProjectsListRequest,
  ProjectsListResponse,
  ProjectByIdRequest,
  ProjectByIdResponse,
  createProjectRequest,
  getProjectDocumentsListRequest,
  getProjectDocumentsListResponse,
  getProjectLocationsResponse,
  projectDocumentDownloadRequest,
  projectCsvUploadRequest
};
