import { useEffect } from "react";
import { FieldValues, UseFormReturn, useFieldArray } from "react-hook-form";
import MudraButton from "src/components/Mudra/Button";
import { Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";
import SvgIcon from "src/components/SvgIcon";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-bottom: 24px;
`;
const StyledSection = styled.section`
  display: flex;
  gap: 40px;
`;
const StyledIcon = styled.div`
  display: contents;
  cursor: pointer;
`;

interface NestedFormProps {
  name: string;
  control: UseFormReturn<FieldValues>["control"];
  fieldProps: any;
}

const NestedForm = ({ name, control, fieldProps }: NestedFormProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control
  });

  useEffect(() => {
    // Append a default row when the component mounts
    if (fields.length === 0) {
      append(fields.length);
    }
  }, [append, fields, fieldProps?.initialValues]);

  return (
    <form style={{ width: "100%" }}>
      {fields.map((field, index) => (
        <StyledDiv key={field.id}>
          <StyledSection key={field.id}>
            {fieldProps.renderField(index)}
            {fields.length !== 1 && (
              <StyledIcon onClick={() => remove(index)}>
                <SvgIcon name='closeIcon' width={24} height={24}></SvgIcon>
              </StyledIcon>
            )}
          </StyledSection>
        </StyledDiv>
      ))}
      <MudraButton
        onClick={() => append(fields.length)}
        variant={Variant.Primary}
        label='+ Add More'
        size={Size.Small}
        width={Width.Auto}
        style={{ marginTop: "20px" }}
        type='button'
      />
    </form>
  );
};

export default NestedForm;
