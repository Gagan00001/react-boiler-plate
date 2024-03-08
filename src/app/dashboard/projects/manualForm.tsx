import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uniq from "lodash/uniq";
import isArray from "lodash/isArray";
import { useAppDispatch, useAppSelector } from "src/redux";
import { createProjectRequest } from "src/redux/types/project";
import { InterventionsResponse } from "src/redux/types/master";

import useSnackbar from "src/hooks/useSnackbar";
import LoadingScreen from "src/components/Loader";
import PageHeader from "src/components/PageHeader";
import FormSelect from "src/components/Form/Select";
import FormRadioGroup from "src/components/Form/Radio";
import NestedForm from "src/components/Form/NestedForm";
import FormTextInput from "src/components/Form/TextInput";
import FormDatePicker from "src/components/Form/Datepicker";
import { FormContainer, RowContainer, StyledBox } from "src/components/Containers";

import { dateFormatter } from "src/lib/utils";
import { dateFormats, projectModes } from "src/lib/constants";
import { genericOptionType, apiOptionType } from "src/lib/commonTypes";

import {
  getBeneficiary,
  getBlocks,
  getDistricts,
  getDomains,
  getInterventions,
  getLearningOpportunity,
  getProjectStreams,
  getStakeholders,
  getStateslist,
  getSubDomainsByDomainId
} from "src/redux/slices/masterSlice";
import { createProject, getProjectTypes } from "src/redux/slices/projectSlice";

type ManualFormPropsType = {
  handleManualFormVisibility: () => void;
};

const ManualForm = ({ handleManualFormVisibility }: ManualFormPropsType) => {
  const { showSnackbar } = useSnackbar();
  const { control, register, handleSubmit, getValues } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data: projectTypesInfo } = useAppSelector((state) => state.projects.projectTypes);
  const projectDomains = useAppSelector((state) => state.masters.projectDomains) as apiOptionType[];
  const projectSubDomains = useAppSelector((state) => state.masters.projectSubDomains);
  const beneficiary = useAppSelector((state) => state.masters.beneficiary) as apiOptionType[];
  const stakeholders = useAppSelector((state) => state.masters.stakeholders) as apiOptionType[];
  const interventionsList = useAppSelector((state) => state.masters.interventions);
  const learningOpportunityList = useAppSelector((state) => state.masters.learningOpportunity);
  const projectStreamsList = useAppSelector((state) => state.masters.projectStreams);
  const statesList = useAppSelector((state) => state.masters.states);
  const districtsList = useAppSelector((state) => state.masters.districts);
  const blocksList = useAppSelector((state) => state.masters.blocks);

  useEffect(() => {
    if (!projectTypesInfo) {
      dispatch(getProjectTypes());
    }
    dispatch(getDomains());
    dispatch(getBeneficiary());
    dispatch(getStakeholders());
    dispatch(getInterventions());
    dispatch(getLearningOpportunity());
    dispatch(getProjectStreams());
    dispatch(getStateslist());
  }, []);

  const handleDomainChange = useCallback(
    (selectedDomain: string) => {
      dispatch(getSubDomainsByDomainId({ domain: selectedDomain }));
    },
    [dispatch]
  );

  const handleStateChange = useCallback(
    (selectedState: string) => {
      dispatch(getDistricts({ stateId: selectedState }));
    },
    [dispatch]
  );

  const handleDistrictChange = useCallback(
    (selectedDistrict: string) => {
      dispatch(getBlocks({ districtId: selectedDistrict }));
    },
    [dispatch]
  );

  const handleSubmitData = useCallback(
    async (formData: any) => {
      const parsedFormData: createProjectRequest = {
        projectTypeId: formData?.projectTypeId,
        name: formData?.name,
        projectMode: formData?.projectMode,
        startDate: dateFormatter(formData?.startDate, dateFormats.startsWithYear),
        endDate: dateFormatter(formData?.endDate, dateFormats.startsWithYear),
        domainId: formData?.domainId,
        subDomainId: formData?.subDomainId,
        description: formData?.description,
        vision: formData?.vision,
        beneficiaryIds: formData?.beneficiaryIds,
        stakeholderIds: formData?.stakeholderIds,
        interventionTypeIds: formData?.interventionTypeIds,
        learningOpportunityIds: formData?.learningOpportunityIds,
        projectStreamId: formData?.projectStreamId,
        stateIds: uniq(formData?.locations?.map((loc: any) => loc.stateIds) || []),
        districtIds: uniq(formData?.locations?.map((loc: any) => loc.districtIds) || []),
        blockIds: uniq(formData?.locations?.flatMap((loc: any) => loc.blockIds) || [])
      };
      setIsLoading(true);
      await dispatch(createProject(parsedFormData))
        .then((res) => {
          // eslint-disable-next-line promise/always-return
          if (res) {
            setIsLoading(false);
            showSnackbar({
              message: "Project added successfully!",
              type: "success"
            });
            handleManualFormVisibility();
          }
        })
        .catch(({ error }: any) => {
          setIsLoading(false);
          showSnackbar({
            message: error?.errorMessage,
            type: "error"
          });
        });
    },
    [dispatch, handleManualFormVisibility, showSnackbar]
  );

  const handleFormSave = useCallback(() => {
    handleSubmit(handleSubmitData)();
  }, [handleSubmit, handleSubmitData]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PageHeader
        headerLabel='Add New Project'
        secondaryButtonLabel='Discard'
        secondaryButtonAction={handleManualFormVisibility}
        primaryButtonAction={handleFormSave}
        primaryButtonLabel='Save'
        showBackIcon={true}
        backButtonAction={handleManualFormVisibility}
      />
      <FormContainer>
        <form>
          <StyledBox includeTopMargin={false}>
            <FormRadioGroup<any>
              name='projectTypeId'
              label='Project Type'
              options={projectTypesInfo}
              control={control}
              register={register}
              required={true}
              valueAccessor='projectTypeId'
              labelAccessor='projectType'
            />
          </StyledBox>
          <StyledBox heading='Basic Details'>
            <RowContainer>
              <FormTextInput
                name='name'
                label='Name'
                placeholder='eg: Khushaal Bachpan Abhiyan'
                control={control}
                register={register}
                required={true}
              />
              <FormSelect<genericOptionType>
                name='projectMode'
                label='Mode of Project'
                placeholder='eg: In Community'
                control={control}
                register={register}
                required={true}
                options={projectModes}
                valueAccessor='value'
                labelAccessor='label'
              />
            </RowContainer>
            <RowContainer>
              <FormDatePicker
                name='startDate'
                label='Start Date'
                control={control}
                register={register}
                required={true}
                shouldDisableDate={(date) => {
                  return getValues("endDate") ? date > getValues("endDate") : false;
                }}
              />
              <FormDatePicker
                name='endDate'
                label='End Date'
                control={control}
                register={register}
                required={true}
                shouldDisableDate={(date) => {
                  return getValues("startDate") ? date < getValues("startDate") : false;
                }}
              />
            </RowContainer>
            <RowContainer>
              <FormSelect<apiOptionType>
                name='domainId'
                label='Domain'
                placeholder='Select domain'
                control={control}
                register={register}
                required={true}
                valueAccessor='id'
                labelAccessor='name'
                options={isArray(projectDomains) ? projectDomains : []}
                handleOnChange={handleDomainChange}
              />
              <FormSelect<apiOptionType>
                name='subDomainId'
                label='Sub-Domain'
                placeholder='Select sub-domain'
                control={control}
                register={register}
                required={true}
                options={projectSubDomains}
                valueAccessor='id'
                labelAccessor='name'
              />
            </RowContainer>
            <RowContainer>
              <FormTextInput
                name='description'
                label='Description'
                placeholder='eg: Khushaal Bachpan Abhiyan aims to improve the Pre School education and Nutritional status of Children aged 0 to 5 years.'
                control={control}
                register={register}
                required={true}
                multiline={true}
              />
              <FormTextInput
                name='vision'
                label='Vision'
                placeholder='eg: To improve Early Childhood Care and Education(ECCE) among ​ Children (0-6 years) at AWCs'
                control={control}
                register={register}
                required={true}
                multiline={true}
              />
            </RowContainer>
          </StyledBox>
          <StyledBox heading='Other Details'>
            <RowContainer>
              <FormSelect<apiOptionType>
                name='beneficiaryIds'
                label='Beneficary'
                placeholder='Select Beneficiary'
                control={control}
                register={register}
                required={true}
                multiple={true}
                options={isArray(beneficiary) ? beneficiary : []}
                valueAccessor='id'
                labelAccessor='name'
              />
              <FormSelect<apiOptionType>
                name='stakeholderIds'
                label='Stakeholders Associated'
                placeholder='Select Stakeholders'
                control={control}
                register={register}
                required={true}
                multiple={true}
                valueAccessor='id'
                labelAccessor='name'
                options={isArray(stakeholders) ? stakeholders : []}
              />
            </RowContainer>
            <RowContainer>
              <FormSelect<InterventionsResponse>
                name='interventionTypeIds'
                label='Intervention Type'
                placeholder='Select Intervention Type'
                control={control}
                register={register}
                required={true}
                multiple={true}
                valueAccessor='interventionTypeId'
                labelAccessor='interventionType'
                options={interventionsList}
              />
              <FormSelect<apiOptionType>
                name='learningOpportunityIds'
                label='Learning Opportunities'
                placeholder='Select'
                control={control}
                register={register}
                multiple={true}
                valueAccessor='id'
                labelAccessor='name'
                options={learningOpportunityList}
              />
            </RowContainer>
            <RowContainer>
              <FormSelect<apiOptionType>
                name='projectStreamId'
                label='Project Streams'
                placeholder='Select Project Stream'
                control={control}
                register={register}
                required={true}
                valueAccessor='id'
                labelAccessor='name'
                options={projectStreamsList}
              />
              <div style={{ width: "100%" }} />
            </RowContainer>
          </StyledBox>
          <StyledBox heading='Locations'>
            <NestedForm
              name='locations'
              control={control}
              fieldProps={{
                initialValues: { title: "", description: "" }, // Specify initial values here
                renderField: (index: number) => (
                  <>
                    <FormSelect<apiOptionType>
                      name={`locations[${index}].stateIds`}
                      label={`State${index + 1}`}
                      placeholder='Select State'
                      control={control}
                      register={register}
                      required={true}
                      options={statesList}
                      valueAccessor='id'
                      labelAccessor='name'
                      handleOnChange={handleStateChange}
                    />
                    <FormSelect<apiOptionType>
                      name={`locations[${index}].districtIds`}
                      label='District'
                      placeholder='Select District'
                      control={control}
                      register={register}
                      required={true}
                      // multiple={true}
                      valueAccessor='id'
                      labelAccessor='name'
                      options={districtsList[getValues(`locations[${index}].stateIds`)]}
                      handleOnChange={handleDistrictChange}
                    />
                    <FormSelect<apiOptionType>
                      name={`locations[${index}].blockIds`}
                      label='Block'
                      placeholder='Select Block'
                      control={control}
                      register={register}
                      required={true}
                      multiple={true}
                      valueAccessor='id'
                      labelAccessor='name'
                      options={blocksList[getValues(`locations[${index}].districtIds`)]}
                    />
                  </>
                )
              }}
            />
          </StyledBox>
        </form>
      </FormContainer>
    </>
  );
};
export default ManualForm;
