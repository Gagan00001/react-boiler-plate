import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux";

import FormSelect from "src/components/Form/Select";
import NestedForm from "src/components/Form/NestedForm";
import FormTextInput from "src/components/Form/TextInput";
import FormDatePicker from "src/components/Form/Datepicker";
import { FormContainer, RowContainer, StyledBox } from "src/components/Containers";

import { getInterventions } from "src/redux/slices/masterSlice";
import { InterventionsResponse } from "src/redux/types/master";
import { parametersResponse } from "src/redux/types/task";

import { getTaskParameters } from "src/redux/slices/taskSlice";

type TaskFormProps = {
  formInstance: UseFormReturn;
};

const TaskForm = ({ formInstance }: TaskFormProps) => {
  const { control, register, getValues } = formInstance;
  const interventionsList = useAppSelector((state) => state.masters.interventions);
  const parametersList = useAppSelector((state) => state.tasks.parameters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInterventions());
    dispatch(getTaskParameters());
  }, [dispatch]);

  return (
    <>
      <FormContainer>
        <form>
          <StyledBox includeTopMargin={false} heading='Task Details'>
            <RowContainer>
              <FormTextInput
                name='taskName'
                label='Name'
                placeholder='eg: Khushaal Bachpan Abhiyan'
                control={control}
                register={register}
                required={true}
              />
              <FormSelect<InterventionsResponse>
                name='interventionType'
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
              <FormTextInput
                name='description'
                label='Description'
                placeholder='eg: Khushaal Bachpan Abhiyan aims to improve the Pre School education and Nutritional status of Children aged 0 to 5 years.'
                control={control}
                register={register}
                required={true}
                multiline={true}
              />
            </RowContainer>
          </StyledBox>
          <StyledBox heading='Sub-Tasks'>
            <NestedForm
              name='subtasks'
              control={control}
              fieldProps={{
                initialValues: { title: "", description: "" }, // Specify initial values here
                renderField: (index: number) => (
                  <>
                    <FormTextInput
                      name={`subtasks[${index}].subTaskName`}
                      label={`Sub-Task ${index + 1}`}
                      placeholder='eg: Child Assessment'
                      control={control}
                      register={register}
                      required={index === 0}
                    />
                    <FormSelect<parametersResponse>
                      name={`subtasks[${index}].parameters`}
                      label='Parameters'
                      placeholder='Input Text'
                      control={control}
                      register={register}
                      required={index === 0}
                      multiple={true}
                      valueAccessor='parameterId'
                      labelAccessor='parameter'
                      options={parametersList}
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
export default TaskForm;
