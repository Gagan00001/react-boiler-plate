import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import isArray from "lodash/isArray";
import { FormContainer, RowContainer, StyledBox } from "src/components/Containers";
import FormDatePicker from "src/components/Form/Datepicker";
import FormSelect from "src/components/Form/Select";
import FormTextInput from "src/components/Form/TextInput";
import FormRadioWithBorder from "src/components/Form/Radio/borderRadio";
import { apiOptionType } from "src/lib/commonTypes";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getDistricts, getDomains, getStateslist } from "src/redux/slices/masterSlice";

const VolunteerForm = () => {
  const dispatch = useAppDispatch();
  const { control, register, getValues } = useForm();
  const projectDomains = useAppSelector((state) => state.masters.projectDomains) as apiOptionType[];
  const statesList = useAppSelector((state) => state.masters.states);
  const districtsList = useAppSelector((state) => state.masters.districts);

  useEffect(() => {
    dispatch(getDomains());
    dispatch(getStateslist());
  }, []);

  const handleStateChange = useCallback(
    (selectedState: string) => {
      dispatch(getDistricts({ stateId: selectedState }));
    },
    [dispatch]
  );

  return (
    <FormContainer>
      <form>
        <StyledBox heading='Basic Details'>
          <RowContainer>
            <FormTextInput
              name='name'
              label='Name'
              placeholder='eg: Amandeep'
              control={control}
              register={register}
              required={true}
            />
            <FormRadioWithBorder<any>
              name='gender'
              label='Gender'
              options={[
                {
                  id: "male",
                  name: "Male"
                },
                {
                  id: "female",
                  name: "Female"
                },
                {
                  id: "others",
                  name: "Others"
                }
              ]}
              control={control}
              register={register}
              required={true}
              valueAccessor='id'
              labelAccessor='name'
            />
          </RowContainer>
          <RowContainer>
            <FormDatePicker name='dob' label='Date of birth' control={control} register={register} />
            <FormSelect<apiOptionType>
              name='language'
              label='Language'
              placeholder='Select language'
              control={control}
              register={register}
              valueAccessor='id'
              labelAccessor='name'
              options={[]}
            />
          </RowContainer>
          <RowContainer>
            <FormSelect<apiOptionType>
              name='educationId'
              label='Education'
              placeholder='Select education'
              control={control}
              register={register}
              valueAccessor='id'
              labelAccessor='name'
              options={[]}
            />
            <FormTextInput
              name='occupation'
              label='Occupation'
              placeholder='eg: Developer'
              control={control}
              register={register}
            />
          </RowContainer>
        </StyledBox>
        <StyledBox heading='Contact Details'>
          <RowContainer>
            <FormTextInput
              name='contactNumber'
              label='Contact Number'
              placeholder='eg: 0123456789'
              control={control}
              register={register}
              required={true}
            />
            <FormTextInput
              name='emailId'
              label='Email Id'
              placeholder='eg: abc@example.com'
              control={control}
              register={register}
            />
          </RowContainer>
        </StyledBox>
        <StyledBox heading='Other Details'>
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
            />
            <FormTextInput
              name='commitmentPeriod'
              label='Commitment Period (hrs per week)'
              placeholder='eg: 8'
              control={control}
              register={register}
            />
          </RowContainer>
          <RowContainer>
            <FormSelect<apiOptionType>
              name='volunteerType'
              label='Why do you want to enroll as volunteer'
              placeholder='eg: Learn New Skills'
              control={control}
              register={register}
              valueAccessor='id'
              labelAccessor='name'
              options={[]}
            />
            <FormRadioWithBorder<any>
              name='volunteerWay'
              label='How do you want to volunteer'
              options={[
                {
                  id: "inCommunity",
                  name: "In Community"
                },
                {
                  id: "virtual",
                  name: "Virtual"
                }
              ]}
              control={control}
              register={register}
              valueAccessor='id'
              labelAccessor='name'
            />
          </RowContainer>
          <RowContainer>
            <FormSelect<apiOptionType>
              name='stateId'
              label={`State`}
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
              name='districtId'
              label='District'
              placeholder='Select District'
              control={control}
              register={register}
              valueAccessor='id'
              labelAccessor='name'
              options={districtsList[getValues("stateId")]}
            />
          </RowContainer>
        </StyledBox>
      </form>
    </FormContainer>
  );
};
export default VolunteerForm;
