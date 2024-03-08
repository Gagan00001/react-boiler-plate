const APP = {
  BASE_URL: "https://public-tms-dev.piramalfoundation.org/"
};

export const getAbsoluteAPIUrl = (url: string) => {
  return APP.BASE_URL + url;
};

export default APP;
