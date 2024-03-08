type CollaboratorListResponse = {
  collaboratorCount: number;
  collaboratorTypeId: number;
  collaboratorTypeName: string;
  createdDate: string | null;
};

type CollaboratorTypeDetailRequest = {
  type: string;
  pageNumber: number;
  pageSize: number;
};

type CollaboratorDetailTypeResponse = {
  response: {
    name: string;
    domain: string[];
    onboardingPartner: string;
    mobileNumber: string;
    collaboratorId: string;
    collaboratorType: number | string;
    district: string;
    state: string;
  }[];
};

type CollaboratorDetailRequest = {
  collaboratorTypeId: number | string;
  collaboratorId: number | string;
};

type CollaboratorDetailResponse = {
  name: string;
  domain: {
    id: number;
    name: string;
  }[];
  onboardingPartner: string;
  gender: string;
  dateOfBirth: string;
  languages: {
    id: number;
    name: string;
  }[];
  education: {
    id: number;
    name: string;
  };
  occupation: string;
  mobileNumber: string;
  emailId: string;
  commitmentPeriod: number | string;
  volunteerMode: string;
  collaboratorType: {
    id: number;
    name: string;
    createdDate: string | null;
  };
  state: string;
  district: string;
  volunteerReason: string;
  sourceApplication: string;
  registrationNumber?: string;
  ngoType?: {
    id: number;
    name: string;
  };
  ceoName?: string;
  website?: string;
  block?: string;
};

type CollaboratorTaskDetailResponse = {
  [key in string]: {
    endDate: string;
    projectName: string;
    startDate: string;
    subtaskName: string;
  }[];
};
export type {
  CollaboratorListResponse,
  CollaboratorTypeDetailRequest,
  CollaboratorDetailTypeResponse,
  CollaboratorDetailRequest,
  CollaboratorDetailResponse,
  CollaboratorTaskDetailResponse
};
