type SubDomainRequest = {
  domain: string;
};

type InterventionsResponse = {
  interventionTypeId: string;
  interventionType: string;
};

type DistrictListRequest = {
  stateId: string;
};

type BlockListRequest = {
  districtId: string;
};

type BeneficiaryRequest =
  | {
      pageNumber?: number;
      pageSize?: number;
    }
  | undefined;

type BeneficiaryPaginationResponse = {
  pageNumber: number;
  response: {
    beneficiaryId: string;
    beneficiaryType: string;
  }[];
  totalCount: number;
};

type domainRequest =
  | {
      pageNumber?: number;
      pageSize?: number;
    }
  | undefined;

type domainPaginationResponse = {
  response: {
    id: string;
    name: string;
    subDomainsList: string[];
    createdDate: string;
    updatedDate: string | null;
    createdBy: string;
    updatedBy: string | null;
  }[];
  pageNumber: number;
  totalCount: number;
};

type subDomainPaginationResponse = {
  response: {
    id: string;
    name: string;
    projectDomain: {
      id: string;
      name: string;
      subDomainsList: string[];
      createdDate: string;
      updatedDate: string | null;
      createdBy: string;
      updatedBy: string | null;
    };
    createdDate: string;
    updatedDate: string | null;
    createdBy: string;
    updatedBy: string | null;
  }[];
  pageNumber: number;
  totalCount: number;
};

type createBeneficiaryRequest = {
  beneficiaryName: string;
};

type createDomainRequest = {
  domainName: string;
};

type createSubDomainRequest = {
  subDomainName: string;
  domainId: string;
};

type createStakeholderRequest = {
  stakeholderName: string;
};

type stakeholderRequest =
  | {
      pageNumber?: number;
      pageSize?: number;
    }
  | undefined;

type stakeholderPaginationResponse = {
  response: {
    id: string;
    name: string;
    createdDate: string;
    updatedDate: string | null;
    createdBy: string;
    updatedBy: string | null;
  }[];
  pageNumber: number;
  totalCount: number;
};

type createDistrictRequest = {
  districtName: string;
  stateId: string;
};

type districtPaginationResponse = {
  response: {
    districtId: string;
    districtName: string;
    stateName: string;
  }[];
  pageNumber: number;
  totalCount: number;
};

type createBlockRequest = {
  blockName: string;
  stateId: string;
  districtId: string;
};

type blockPaginationResponse = {
  response: {
    id: string;
    name: string;
    districtName: string | null;
    stateName: string | null;
  }[];
  pageNumber: number;
  totalCount: number;
};

type createVillageRequest = {
  blockId: string;
  districtId: string;
  stateId: string;
  villageName: string;
};

type villagePaginationResponse = {
  response: {
    id: string;
    name: string;
    districtName: string;
    stateName: string;
    blockName: string;
  }[];
  pageNumber: number;
  totalCount: number;
};
export type {
  SubDomainRequest,
  InterventionsResponse,
  DistrictListRequest,
  BlockListRequest,
  BeneficiaryRequest,
  BeneficiaryPaginationResponse,
  createBeneficiaryRequest,
  createDomainRequest,
  createSubDomainRequest,
  domainRequest,
  domainPaginationResponse,
  subDomainPaginationResponse,
  stakeholderRequest,
  createStakeholderRequest,
  stakeholderPaginationResponse,
  createDistrictRequest,
  districtPaginationResponse,
  createBlockRequest,
  blockPaginationResponse,
  createVillageRequest,
  villagePaginationResponse
};
