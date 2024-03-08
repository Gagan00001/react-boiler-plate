import { useParams } from "next/navigation";
import { useEffect } from "react";
import { InformationBlock, RowContainer, ViewSectionContainer } from "src/components/Containers";
import LoadingScreen from "src/components/Loader";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getCollaboratorDetailById } from "src/redux/slices/collaboratorSlice";

const OverviewDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.collaborators.collaboratorDetail);

  useEffect(() => {
    if (params)
      dispatch(
        getCollaboratorDetailById({
          collaboratorId: params.collaboratorId as string,
          collaboratorTypeId: params.collaboratorTypeId as string
        })
      );
  }, [params]);

  return (
    <>
      {loading && <LoadingScreen />}
      <ViewSectionContainer heading='Basic Details'>
        <RowContainer gap={60}>
          <InformationBlock label={"Name"} value={data?.name} />
          {data?.collaboratorType?.name === "NGO" ? (
            <InformationBlock label='CEO Name' value={data?.ceoName} />
          ) : (
            <>
              <InformationBlock label={"Date of Birth"} value={data?.dateOfBirth} />
              <InformationBlock label={"Age"} value={data?.dateOfBirth} />
              <InformationBlock label={"Gender"} value={data?.gender} />
            </>
          )}
        </RowContainer>
        <RowContainer gap={60}>
          {data?.collaboratorType?.name === "NGO" ? (
            <>
              <InformationBlock label='NGO Type' value={data?.ngoType?.name} />
              <InformationBlock label='Registration Number' value={data?.registrationNumber} />
            </>
          ) : (
            <>
              <InformationBlock label={"Language"} value={data?.languages?.map((lang) => lang?.name).join(" | ")} />
              <InformationBlock label={"Education"} value={data?.education?.name} />
              <InformationBlock label={"Occupation"} value={data?.occupation} />
              <InformationBlock label='Onboarding Partner' value={data?.onboardingPartner} />
            </>
          )}
        </RowContainer>
      </ViewSectionContainer>
      <ViewSectionContainer heading='Contact Details'>
        <RowContainer gap={60}>
          <InformationBlock label={"Mobile Number"} value={data?.mobileNumber} />
          <InformationBlock label={"Email Id"} value={data?.emailId} />
          {data?.collaboratorType?.name === "NGO" && <InformationBlock label='Website' value={data?.website} />}
        </RowContainer>
      </ViewSectionContainer>
      <ViewSectionContainer heading='Others'>
        {data?.collaboratorType?.name === "NGO" ? (
          <InformationBlock label='Domain' value={data?.domain?.map((dom) => dom?.name).join(" | ")} />
        ) : (
          <>
            <RowContainer gap={60}>
              <InformationBlock label='Domain' value={data?.domain?.map((dom) => dom?.name).join(" | ")} />
              <InformationBlock label={"Commitment Period"} value={data?.commitmentPeriod} />
            </RowContainer>
            <RowContainer gap={60}>
              <InformationBlock label='Why do you want to enroll as volunteer' value={data?.volunteerReason} />
              <InformationBlock label='How do you want to volunteer' value={data?.volunteerMode} />
            </RowContainer>
          </>
        )}
      </ViewSectionContainer>
      <ViewSectionContainer heading='Demographic Details'>
        <RowContainer gap={60}>
          {data?.collaboratorType?.name === "NGO" && <InformationBlock label='Block' value={data?.block} />}
          <InformationBlock label='District' value={data?.district} />
          <InformationBlock label='State' value={data?.state} />
        </RowContainer>
      </ViewSectionContainer>
    </>
  );
};

export default OverviewDetail;
