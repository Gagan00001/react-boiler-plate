const clientId = "26bed5ae-dd9f-4895-896d-ab292e654bf5";
const tenantName = "9738051c-aa63-42f9-a52c-b57fe3cc7575";

export const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantName}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: true
  },
  // cache: {
  //   cacheLocation: "localStorage",
  //   storeAuthStateInCookie: false
  // },
  system: {
    allowNativeBroker: false // Disables WAM Broker
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["openid", "profile", "email", "offline_access", "26bed5ae-dd9f-4895-896d-ab292e654bf5/.default"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
