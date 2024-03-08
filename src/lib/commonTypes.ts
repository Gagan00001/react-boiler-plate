type genericOptionType = {
  label: string;
  value: string;
};

type apiOptionType = {
  id: string;
  name: string;
};

type genericSpecificWrapperData<T> = {
  timeStamp: string;
  data: T;
  errorMessage: string | null;
  errorCode: string | null;
  errorStatus: string | null;
  success: boolean;
};

type genericPayload<T> = {
  params: string[];
  body: T;
};

export type { genericOptionType, apiOptionType, genericPayload, genericSpecificWrapperData };
