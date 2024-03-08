// projects
export const GET_PROJECT_TYPES = "project/getAllProjectTypes";
export const GET_PROJECT_LIST = "projects/type/{0}/list";
export const GET_PROJECT_BY_ID = "projects/getProjectById/{0}";
export const GET_SUB_DOMAINS_BY_DOMAIN = "projectDomain/{0}/subdomain/list";
export const GET_ALL_INTERVENTIONS = "interventions/getAllInterventionTypes";
export const GET_LEARNING_OPPORTUNITY = "learningOpportunity/list";
export const GET_STATE_LIST = "state/list";
export const GET_DISTRICTS = "district/list?stateId={0}";
export const GET_BLOCKS = "block/list?districtId={0}";
export const GET_PROJECT_STREAMS = "projectStream/list";
export const CREATE_PROJECT = "projects/create";
export const CSV_UPLOAD_PROJECT = "csv/upload/projects";
export const GET_PROJECT_DOCUMENT_LIST =
  "projects/content/list?projectId={0}&contentType={1}&page={2}&recordsPerPage={3}";
export const PROJECT_DOCUMENT_DOWNLOAD = "s3/file/download?path={0}&expiry={1}";
export const PROJECT_LOCATIONS = "projects/{0}/locations";

// tasks
export const GET_TASK_PARAMETERS = "parameters/getAllParameters";
export const CREATE_TASK = "tasks/create?projectId={0}";
export const GET_ALL_TASKS_BY_PROJECT_ID = "tasks/getAllTasksByProjectId/{0}";
export const GET_TASK_INFO_BY_TASK_ID = "tasks/getTaskById/{0}";
export const CSV_UPLOAD_TASKS = "csv/upload/tasks?projectId={0}";
export const ADD_CONTENT_FILE_REQUEST = "projects/add/contentFile";
export const GENERATE_S3_PRESIGNED_URL_UPLOAD = "user/posts/generatePresignedUrl?type={0}&action={1}";

// collaborators
export const GET_COLLABORATORS_TYPE_LIST = "collaborator/collaboratorTypeList";
export const GET_COLLABORATOR_DETAIL_BY_TYPE = "collaborator/collaboratorList?type={0}&pageNumber={1}&pageSize={2}";
export const GET_COLLABORATOR_DETAIL_BY_ID = "collaborator/collaboratorDetails?collaboratorId={0}&type={1}";
export const GET_COLLABORATOR_TASK_DETAILS = "collaborator/taskList?collaboratorId={0}&collaboratorType={1}";

// masters
export const CREATE_BENEFICIARY = "beneficiary/create";
export const GET_BENEFICIARY = "beneficiary/list";
export const CREATE_DOMAIN = "projectDomain/create";
export const GET_DOMAINS = "projectDomain/list";
export const CREATE_SUB_DOMAIN = "projectDomain/{0}/subdomain/create";
export const GET_SUB_DOMAINS_LIST = "projectDomain/subdomain/list";
export const CREATE_STAKEHOLDER = "stakeholders/create";
export const GET_STAKEHOLDERS = "stakeholders/list";
export const CREATE_DISTRICT = "district/create";
export const GET_ALL_DISTRICTS = "district/list/all";
export const CREATE_BLOCK = "block/create";
export const GET_ALL_BLOCKS = "block/list/all";
export const CREATE_VILLAGE = "village/create";
export const GET_ALL_VILLAGES = "village/list/all";
