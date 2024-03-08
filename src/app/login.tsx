/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */

import React, { useCallback } from "react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import styled from "styled-components";

import LoadingScreen from "src/components/Loader";
import MudraTypography from "src/components/Mudra/Typography";
import MudraButton from "src/components/Mudra/Button";
import { IconAlignment, Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";
import { loginRequest, msalConfig } from "../api/authConfig";
import SvgIcon from "../components/SvgIcon";

const LoginContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(1deg, #6e8fe3 1.31%, #ffb75c00 106.94%);
    opacity: 0.15;
    z-index: -1;
  }
`;

const LoginSubContainer = styled.div`
  margin: auto;
`;

const AppLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomeHeading = styled.div`
  margin-top: 40px;
`;

const ButtonHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const SignInButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
  msalInstance
    .handleRedirectPromise()
    .then((res) => {
      if (res) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(res));
        window.location.replace("/dashboard/projects");
        localStorage.setItem("redirectionResponseLoading", "false");
      }
    })
    .catch((err) => {
      console.error(err);
    });

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event?.payload) {
      const { account }: any = event.payload;
      msalInstance.setActiveAccount(account);
    }
  });
});

const Login = () => {
  const handleLogIn = useCallback(() => {
    localStorage.setItem("redirectionResponseLoading", "true");
    msalInstance.loginRedirect(loginRequest).catch((e) => {
      // eslint-disable-next-line no-console
      console.log("error inside login screen", e);
    });
  }, []);

  const redirectionResponseLoading = localStorage.getItem("redirectionResponseLoading");

  return (
    <>
      {redirectionResponseLoading && JSON.parse(redirectionResponseLoading) ? (
        <LoadingScreen
          title='Logging you in'
          description='Please wait, while we are fetching your account details'
          showWhiteBackground={true}
        />
      ) : (
        <LoginContainer>
          <LoginSubContainer>
            <AppLogo>
              <SvgIcon name='appLogo' height={100} width={210} />
            </AppLogo>
            <WelcomeHeading>
              <MudraTypography size={28} textColor='neutral80' weight='extraBold'>
                Welcome to Piramal Foundation
              </MudraTypography>
            </WelcomeHeading>
            <ButtonHeading>
              <MudraTypography size={16} textColor='neutral80' weight='bold'>
                Sign in with your organisation account
              </MudraTypography>
            </ButtonHeading>
            <SignInButton>
              <MudraButton
                onClick={handleLogIn}
                variant={Variant.Secondary}
                label='Sign In with Microsoft'
                size={Size.Medium}
                width={Width.Half}
                iconAlignment={IconAlignment.LeftAligned}
                icon={() => <SvgIcon name='microsoftLogo' width={16} height={16} style={{ marginRight: "12px" }} />}
              />
            </SignInButton>
          </LoginSubContainer>
        </LoginContainer>
      )}
    </>
  );
};

export default Login;
