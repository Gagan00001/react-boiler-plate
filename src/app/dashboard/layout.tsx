"use client";

import styled from "styled-components";
import Header from "src/components/Header";
import Sidebar from "src/components/Sidebar";
import SnackBar from "src/components/Snackbar";
import { PageContainer } from "src/components/Containers";
import useSnackbar from "src/hooks/useSnackbar";

const DashboardLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1; /* Ensure the container takes up remaining height */
`;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { snackbarMessageData, hideSnackbar } = useSnackbar();
  return (
    <DashboardLayoutContainer>
      <Header></Header>
      <MainContainer>
        <SnackBar type={snackbarMessageData.type} message={snackbarMessageData.message} hideSnackbar={hideSnackbar} />
        <Sidebar />
        <PageContainer>{children}</PageContainer>
      </MainContainer>
    </DashboardLayoutContainer>
  );
}
