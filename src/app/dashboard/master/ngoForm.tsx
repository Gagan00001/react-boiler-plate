import { useEffect } from "react";
import isArray from "lodash/isArray";
import { useForm } from "react-hook-form";
import { FormContainer, RowContainer, StyledBox } from "src/components/Containers";
import FormSelect from "src/components/Form/Select";
import FormTextInput from "src/components/Form/TextInput";
import FormRadioWithBorder from "src/components/Form/Radio/borderRadio";
import { apiOptionType } from "src/lib/commonTypes";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getDomains, getStateslist } from "src/redux/slices/masterSlice";

const NGOForm = () => {
  const dispatch = useAppDispatch();
  const { control, register } = useForm();
  const projectDomains = useAppSelector((state) => state.masters.projectDomains) as apiOptionType[];

  useEffect(() => {
    dispatch(getDomains());
    dispatch(getStateslist());
  }, []);

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
            <FormTextInput
              name='registrationNumber'
              label='Registration Number'
              placeholder='eg: 0123456789'
              control={control}
              register={register}
              required={true}
            />
          </RowContainer>
          <RowContainer>
            <FormTextInput
              name='ceoName'
              label='CEO Name'
              placeholder='eg: James'
              control={control}
              register={register}
              required={true}
            />
            <FormRadioWithBorder<any>
              name='ngoType'
              label='NGO Type'
              options={[
                {
                  id: "society",
                  name: "Society"
                },
                {
                  id: "trust",
                  name: "Trust"
                },
                {
                  id: "section8",
                  name: "Section 8"
                },
                {
                  id: "other",
                  name: "Other"
                }
              ]}
              control={control}
              register={register}
              required={true}
              valueAccessor='id'
              labelAccessor='name'
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
            <FormTextInput
              name='website'
              label='Website'
              placeholder='eg: www.example.com'
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
          </RowContainer>
        </StyledBox>
      </form>
    </FormContainer>
  );
};
export default NGOForm;
