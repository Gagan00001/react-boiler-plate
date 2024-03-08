import dayjs from "dayjs";
import React from "react";
import { InformationArrayBlock, InformationBlock, RowContainer, ViewSectionContainer } from "src/components/Containers";
import { useAppSelector } from "src/redux";

const ProjectOverview = () => {
  const { data } = useAppSelector((state) => state.projects.projectDetails);

  return (
    <>
      <ViewSectionContainer heading='Basic Details'>
        <RowContainer gap={60}>
          <InformationBlock label={"Name"} value={data?.projectName} />
          <InformationBlock label={"Project Category"} value={data?.projectType?.projectType} />
          <InformationBlock label={"Stream"} value={data?.projectStreams?.map((item) => item.name)?.join(", ")} />
          <InformationBlock label={"Mode of Project"} value={data?.projectMode} />
        </RowContainer>
        <RowContainer gap={60}>
          <InformationBlock label={"Domain"} value={data?.projectDomainList?.map((item) => item.name).join(", ")} />
          <InformationBlock
            label={"Sub-Domain"}
            value={data?.projectSubDomainList?.map((item) => item.name).join(", ")}
          />
          <InformationBlock
            label={"Start Date"}
            value={data?.startDate ? dayjs(data?.startDate).format("DD/MM/YYYY") : "-"}
          />
          <InformationBlock
            label={"End Date"}
            value={data?.endDate ? dayjs(data?.endDate).format("DD/MM/YYYY") : "-"}
          />
        </RowContainer>
        <RowContainer gap={60}>
          <InformationBlock label={"Description"} value={data?.projectDescription} />
          <InformationBlock label={"Vision"} value={data?.projectVision} />
        </RowContainer>
      </ViewSectionContainer>
      <ViewSectionContainer heading='Other Details'>
        <RowContainer gap={60}>
          <InformationArrayBlock
            label={"Beneficiary Type"}
            values={data?.beneficiaries?.map((item) => item.beneficiaryType)}
          />
          <InformationArrayBlock
            label={"Stakeholders Associated"}
            values={data?.stakeholders?.map((item) => item.name)}
          />
        </RowContainer>
        <RowContainer gap={60}>
          <InformationArrayBlock
            label={"Intervention Type"}
            values={data?.interventionType?.map((item) => item.interventionType)}
          />
          <InformationArrayBlock
            label={"Learning Opportunities"}
            values={data?.learningOpportunities?.map((item) => item.name)}
          />
        </RowContainer>
      </ViewSectionContainer>
    </>
  );
};

export default ProjectOverview;
