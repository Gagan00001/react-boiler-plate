"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { InternalScreenContainer } from "src/components/Containers";
import PageHeader from "src/components/PageHeader";
import BasicTabs from "src/components/Tabs";
import { useAppSelector } from "src/redux";
import OverviewDetail from "./overview";
import CollaboratorTasks from "./tasks";

const CollaboratorDetail = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const collabType = searchParams.get("collabType") || "";
  const { data } = useAppSelector((state) => state.collaborators.collaboratorDetail);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleBackButton = useCallback(() => {
    router.back();
  }, [router]);

  const tabScreen = useCallback(() => {
    switch (activeTab) {
      case 0:
        return <OverviewDetail />;
      case 1:
        return <CollaboratorTasks />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <>
      <PageHeader
        headerLabel={`${collabType} / ${data?.name}`}
        showBackIcon
        backButtonAction={handleBackButton}
        showIcon={true}
        secondaryButtonLabel='Export'
        secondaryButtonIcon='downloadIcon'
      />
      <BasicTabs
        selected={activeTab}
        setSelection={setActiveTab}
        values={[
          { id: 0, name: "Overview" },
          { id: 1, name: "Tasks" }
        ]}
      >
        <InternalScreenContainer>{tabScreen()}</InternalScreenContainer>
      </BasicTabs>
    </>
  );
};

export default CollaboratorDetail;
