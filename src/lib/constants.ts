const projectModes = [
  {
    label: "In Community",
    value: "IN_COMMUNITY"
  },
  {
    label: "Virtual",
    value: "VIRTUAL"
  }
];

const documentTypeOptions = [
  {
    label: "Media",
    value: "IMAGE"
  },
  {
    label: "Document",
    value: "DOCUMENT"
  }
];

const dateFormats = {
  startsWithDate: "DD/MM/YYYY",
  startsWithYear: "YYYY-MM-DD",
  dateWithMonth: "DD MMM"
};

const errorMessages = {
  PROJECT_CSV_HEADERS_MISMATCH: "Headers are invalid. Aborting further processing.",
  PROJECT_CSV_UPLOAD_MISMATCH: "Error occurred while saving project."
};

export { projectModes, dateFormats, documentTypeOptions, errorMessages };
