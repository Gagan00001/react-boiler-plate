/* eslint-disable max-lines */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format } from "src/lib/utils";
import { apiOptionType, genericSpecificWrapperData } from "src/lib/commonTypes";
import {
  CREATE_BENEFICIARY,
  CREATE_BLOCK,
  CREATE_DISTRICT,
  CREATE_DOMAIN,
  CREATE_STAKEHOLDER,
  CREATE_SUB_DOMAIN,
  CREATE_VILLAGE,
  GET_ALL_BLOCKS,
  GET_ALL_DISTRICTS,
  GET_ALL_INTERVENTIONS,
  GET_ALL_VILLAGES,
  GET_BENEFICIARY,
  GET_BLOCKS,
  GET_DISTRICTS,
  GET_DOMAINS,
  GET_LEARNING_OPPORTUNITY,
  GET_PROJECT_STREAMS,
  GET_STAKEHOLDERS,
  GET_STATE_LIST,
  GET_SUB_DOMAINS_BY_DOMAIN,
  GET_SUB_DOMAINS_LIST
} from "src/api/endpoints";
import { getAbsoluteAPIUrl } from "src/api/serverConfig";
import { axiosClient } from "src/api";
import { AxiosError } from "axios";
import {
  BeneficiaryPaginationResponse,
  BeneficiaryRequest,
  BlockListRequest,
  DistrictListRequest,
  InterventionsResponse,
  SubDomainRequest,
  blockPaginationResponse,
  createBeneficiaryRequest,
  createBlockRequest,
  createDistrictRequest,
  createDomainRequest,
  createStakeholderRequest,
  createSubDomainRequest,
  createVillageRequest,
  districtPaginationResponse,
  domainPaginationResponse,
  domainRequest,
  stakeholderPaginationResponse,
  stakeholderRequest,
  subDomainPaginationResponse,
  villagePaginationResponse
} from "../types/master";

type MasterInitialState = {
  projectDomains: domainPaginationResponse | apiOptionType[] | null;
  projectSubDomains: apiOptionType[];
  beneficiary: BeneficiaryPaginationResponse | apiOptionType[] | null;
  stakeholders: stakeholderPaginationResponse | apiOptionType[] | null;
  interventions: InterventionsResponse[];
  learningOpportunity: apiOptionType[];
  projectStreams: apiOptionType[];
  states: apiOptionType[];
  districts: { [key in string]: apiOptionType[] };
  blocks: { [key in string]: apiOptionType[] };
  subDomainsList: subDomainPaginationResponse;
  districtsList: districtPaginationResponse;
  blocksList: blockPaginationResponse;
  villagesList: villagePaginationResponse;
};

const initialState: MasterInitialState = {
  projectDomains: null,
  projectSubDomains: [],
  beneficiary: null,
  stakeholders: null,
  interventions: [],
  learningOpportunity: [],
  projectStreams: [],
  states: [],
  districts: {},
  blocks: {},
  subDomainsList: {
    response: [],
    pageNumber: 0,
    totalCount: 0
  },
  districtsList: {
    response: [],
    pageNumber: 0,
    totalCount: 0
  },
  blocksList: {
    response: [],
    pageNumber: 0,
    totalCount: 0
  },
  villagesList: {
    response: [],
    pageNumber: 0,
    totalCount: 0
  }
};

const getDomains = createAsyncThunk<apiOptionType[] | domainPaginationResponse, domainRequest>(
  "getDomains",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_DOMAINS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const domainsListBackendResponse = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const domainsList = domainsListBackendResponse.data as genericSpecificWrapperData<
        apiOptionType[] | domainPaginationResponse
      >;
      if (domainsList.success) {
        return domainsList.data;
      }
      return rejectWithValue(domainsList.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getSubDomainsByDomainId = createAsyncThunk<apiOptionType[], SubDomainRequest>(
  "getSubDomainsByDomainId",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_SUB_DOMAINS_BY_DOMAIN, requestObj.domain);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const subDomainsListBackendResponse = await axiosClient.get(absoluteUrl);
      const subDomainsList = subDomainsListBackendResponse.data as apiOptionType[];
      if (subDomainsList) {
        return subDomainsList;
      }
      return rejectWithValue(subDomainsList);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getBeneficiary = createAsyncThunk<apiOptionType[] | BeneficiaryPaginationResponse, BeneficiaryRequest>(
  "getBeneficiary",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_BENEFICIARY);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const beneficiaryBackendResponse = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const beneficaryList = beneficiaryBackendResponse.data as genericSpecificWrapperData<
        apiOptionType[] | BeneficiaryPaginationResponse
      >;
      if (beneficaryList.success) {
        return beneficaryList.data;
      }
      return rejectWithValue(beneficaryList.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getStakeholders = createAsyncThunk<apiOptionType[] | stakeholderPaginationResponse, stakeholderRequest>(
  "getStakeholders",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_STAKEHOLDERS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const stakeholdersBackendResponse = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const stakeholders = stakeholdersBackendResponse.data as genericSpecificWrapperData<
        apiOptionType[] | stakeholderPaginationResponse
      >;
      if (stakeholders.success) {
        return stakeholders.data;
      }
      return rejectWithValue(stakeholders.errorMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getInterventions = createAsyncThunk<InterventionsResponse[]>(
  "getInterventions",
  async (_, { rejectWithValue }) => {
    try {
      const url = format(GET_ALL_INTERVENTIONS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const interventionsBackendResponse = await axiosClient.get(absoluteUrl);
      const interventionsList = interventionsBackendResponse.data as InterventionsResponse[];
      if (interventionsList) {
        return interventionsList;
      }
      return rejectWithValue(interventionsList);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getLearningOpportunity = createAsyncThunk<apiOptionType[]>(
  "getLearningOpportunity",
  async (_, { rejectWithValue }) => {
    try {
      const url = format(GET_LEARNING_OPPORTUNITY);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const learningOpportunityBackendResponse = await axiosClient.get(absoluteUrl);
      const learningOpportunity = learningOpportunityBackendResponse.data as apiOptionType[];
      if (learningOpportunity) {
        return learningOpportunity;
      }
      return rejectWithValue(learningOpportunity);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getStateslist = createAsyncThunk<apiOptionType[]>("getStateslist", async (_, { rejectWithValue }) => {
  try {
    const url = format(GET_STATE_LIST);
    const absoluteUrl = getAbsoluteAPIUrl(url);
    const stateslistBackendResponse = await axiosClient.get(absoluteUrl);
    const stateslist = stateslistBackendResponse.data as apiOptionType[];
    if (stateslist) {
      return stateslist;
    }
    return rejectWithValue(stateslist);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue("error");
    }
    return rejectWithValue("error");
  }
});

const getDistricts = createAsyncThunk<apiOptionType[], DistrictListRequest>(
  "getDistricts",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_DISTRICTS, requestObj.stateId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const districtsListBackendResponse = await axiosClient.get(absoluteUrl);
      const districts = districtsListBackendResponse.data as apiOptionType[];
      if (districts) {
        return districts;
      }
      return rejectWithValue(districts);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getBlocks = createAsyncThunk<apiOptionType[], BlockListRequest>(
  "getBlocks",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_BLOCKS, requestObj.districtId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const blocksListBackendResponse = await axiosClient.get(absoluteUrl);
      const blocks = blocksListBackendResponse.data as apiOptionType[];
      if (blocks) {
        return blocks;
      }
      return rejectWithValue(blocks);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue("error");
      }
      return rejectWithValue("error");
    }
  }
);

const getProjectStreams = createAsyncThunk<apiOptionType[]>("getProjectStreams", async (_, { rejectWithValue }) => {
  try {
    const url = format(GET_PROJECT_STREAMS);
    const absoluteUrl = getAbsoluteAPIUrl(url);
    const projectStreamsBackendResponse = await axiosClient.get(absoluteUrl);
    const projectStreams = projectStreamsBackendResponse.data as apiOptionType[];
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
});

const getSubDomainsList = createAsyncThunk<subDomainPaginationResponse, domainRequest>(
  "getSubDomainsList",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_SUB_DOMAINS_LIST);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const subDomainsListBackendResp = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const subDomainsList = subDomainsListBackendResp.data as genericSpecificWrapperData<subDomainPaginationResponse>;
      if (subDomainsList.success) {
        return subDomainsList.data;
      }
      return rejectWithValue(subDomainsList.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createBeneficiary = createAsyncThunk<string, createBeneficiaryRequest>(
  "createBeneficiary",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_BENEFICIARY);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createBeneficiaryBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createBeneficiaryResponse = createBeneficiaryBackendResponse.data as genericSpecificWrapperData<string>;
      if (createBeneficiaryResponse.success) {
        return createBeneficiaryResponse.data;
      }
      return rejectWithValue(createBeneficiaryResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createDomain = createAsyncThunk<string, createDomainRequest>(
  "createDomain",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_DOMAIN);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createDomainBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createDomainResponse = createDomainBackendResponse.data as genericSpecificWrapperData<string>;
      if (createDomainResponse.success) {
        return createDomainResponse.data;
      }
      return rejectWithValue(createDomainResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createSubDomain = createAsyncThunk<string, createSubDomainRequest>(
  "createSubDomain",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_SUB_DOMAIN, requestObj.domainId);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createSubDomainBackendResponse = await axiosClient.post(absoluteUrl, {
        subDomainName: requestObj.subDomainName
      });
      const createSubDomainResponse = createSubDomainBackendResponse.data as genericSpecificWrapperData<string>;
      if (createSubDomainResponse.success) {
        return createSubDomainResponse.data;
      }
      return rejectWithValue(createSubDomainResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createStakeholder = createAsyncThunk<string, createStakeholderRequest>(
  "createStakeholder",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_STAKEHOLDER);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createStakeholderBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createStakeholderResponse = createStakeholderBackendResponse.data as genericSpecificWrapperData<string>;
      if (createStakeholderResponse.success) {
        return createStakeholderResponse.data;
      }
      return rejectWithValue(createStakeholderResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createDistrict = createAsyncThunk<string, createDistrictRequest>(
  "createDistrict",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_DISTRICT);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createDistrictBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createDistrictResponse = createDistrictBackendResponse.data as genericSpecificWrapperData<string>;
      if (createDistrictResponse.success) {
        return createDistrictResponse.data;
      }
      return rejectWithValue(createDistrictResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const getDistrictsList = createAsyncThunk<districtPaginationResponse, domainRequest>(
  "getDistrictsList",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_ALL_DISTRICTS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const subDomainsListBackendResp = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const subDomainsList = subDomainsListBackendResp.data as genericSpecificWrapperData<districtPaginationResponse>;
      if (subDomainsList.success) {
        return subDomainsList.data;
      }
      return rejectWithValue(subDomainsList.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createBlock = createAsyncThunk<string, createBlockRequest>(
  "createBlock",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_BLOCK);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createBlockBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createBlockResponse = createBlockBackendResponse.data as genericSpecificWrapperData<string>;
      if (createBlockResponse.success) {
        return createBlockResponse.data;
      }
      return rejectWithValue(createBlockResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const getBlocksList = createAsyncThunk<blockPaginationResponse, domainRequest>(
  "getBlocksList",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_ALL_BLOCKS);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const blocksListBackendResp = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const blocksList = blocksListBackendResp.data as genericSpecificWrapperData<blockPaginationResponse>;
      if (blocksList.success) {
        return blocksList.data;
      }
      return rejectWithValue(blocksList.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const createVillage = createAsyncThunk<string, createVillageRequest>(
  "createVillage",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(CREATE_VILLAGE);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const createVillageBackendResponse = await axiosClient.post(absoluteUrl, requestObj);
      const createVillageResponse = createVillageBackendResponse.data as genericSpecificWrapperData<string>;
      if (createVillageResponse.success) {
        return createVillageResponse.data;
      }
      return rejectWithValue(createVillageResponse.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const getVillagesList = createAsyncThunk<villagePaginationResponse, domainRequest>(
  "getVillagesList",
  async (requestObj, { rejectWithValue }) => {
    try {
      const url = format(GET_ALL_VILLAGES);
      const absoluteUrl = getAbsoluteAPIUrl(url);
      const villagesListBackendResp = await axiosClient.get(absoluteUrl, { params: { ...requestObj } });
      const villagesList = villagesListBackendResp.data as genericSpecificWrapperData<villagePaginationResponse>;
      if (villagesList.success) {
        return villagesList.data;
      }
      return rejectWithValue(villagesList.errorMessage);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const MasterSlice = createSlice({
  name: "Masters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDomains.pending, () => {});
    builder.addCase(getDomains.fulfilled, (state, action) => {
      state.projectDomains = action.payload;
    });
    builder.addCase(getDomains.rejected, () => {});

    builder.addCase(getSubDomainsByDomainId.pending, () => {});
    builder.addCase(getSubDomainsByDomainId.fulfilled, (state, action) => {
      state.projectSubDomains = action.payload;
    });
    builder.addCase(getSubDomainsByDomainId.rejected, () => {});

    builder.addCase(getBeneficiary.pending, () => {});
    builder.addCase(getBeneficiary.fulfilled, (state, action) => {
      state.beneficiary = action.payload;
    });
    builder.addCase(getBeneficiary.rejected, () => {});

    builder.addCase(getStakeholders.pending, () => {});
    builder.addCase(getStakeholders.fulfilled, (state, action) => {
      state.stakeholders = action.payload;
    });
    builder.addCase(getStakeholders.rejected, () => {});

    builder.addCase(getInterventions.pending, () => {});
    builder.addCase(getInterventions.fulfilled, (state, action) => {
      state.interventions = action.payload;
    });
    builder.addCase(getInterventions.rejected, () => {});

    builder.addCase(getLearningOpportunity.pending, () => {});
    builder.addCase(getLearningOpportunity.fulfilled, (state, action) => {
      state.learningOpportunity = action.payload;
    });
    builder.addCase(getLearningOpportunity.rejected, () => {});

    builder.addCase(getStateslist.pending, () => {});
    builder.addCase(getStateslist.fulfilled, (state, action) => {
      state.states = action.payload;
    });
    builder.addCase(getStateslist.rejected, () => {});

    builder.addCase(getDistricts.pending, () => {});
    builder.addCase(getDistricts.fulfilled, (state, action) => {
      state.districts[action.meta.arg.stateId] = action.payload;
    });
    builder.addCase(getDistricts.rejected, () => {});

    builder.addCase(getBlocks.pending, () => {});
    builder.addCase(getBlocks.fulfilled, (state, action) => {
      state.blocks[action.meta.arg.districtId] = action.payload;
    });
    builder.addCase(getBlocks.rejected, () => {});

    builder.addCase(getProjectStreams.pending, () => {});
    builder.addCase(getProjectStreams.fulfilled, (state, action) => {
      state.projectStreams = action.payload;
    });
    builder.addCase(getProjectStreams.rejected, () => {});

    builder.addCase(getSubDomainsList.pending, () => {});
    builder.addCase(getSubDomainsList.fulfilled, (state, action) => {
      state.subDomainsList = action.payload;
    });
    builder.addCase(getSubDomainsList.rejected, () => {});

    builder.addCase(getDistrictsList.pending, () => {});
    builder.addCase(getDistrictsList.fulfilled, (state, action) => {
      state.districtsList = action.payload;
    });
    builder.addCase(getDistrictsList.rejected, () => {});

    builder.addCase(getBlocksList.pending, () => {});
    builder.addCase(getBlocksList.fulfilled, (state, action) => {
      state.blocksList = action.payload;
    });
    builder.addCase(getBlocksList.rejected, () => {});

    builder.addCase(getVillagesList.pending, () => {});
    builder.addCase(getVillagesList.fulfilled, (state, action) => {
      state.villagesList = action.payload;
    });
    builder.addCase(getVillagesList.rejected, () => {});
  }
});

export default MasterSlice.reducer;

export {
  getDomains,
  getSubDomainsByDomainId,
  getBeneficiary,
  getStakeholders,
  getInterventions,
  getLearningOpportunity,
  getStateslist,
  getDistricts,
  getBlocks,
  getProjectStreams,
  createBeneficiary,
  createDomain,
  createSubDomain,
  getSubDomainsList,
  createStakeholder,
  createDistrict,
  getDistrictsList,
  createBlock,
  getBlocksList,
  createVillage,
  getVillagesList
};
