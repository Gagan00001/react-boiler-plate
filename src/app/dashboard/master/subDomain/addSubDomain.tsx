import { useCallback, useEffect, useState } from "react";

import isArray from "lodash/isArray";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import useSnackbar from "src/hooks/useSnackbar";
import { apiOptionType } from "src/lib/commonTypes";
import { useAppDispatch, useAppSelector } from "src/redux";
import { createSubDomain, getDomains } from "src/redux/slices/masterSlice";

import { ModalContainer, ModalFooterButtonContainer } from "src/components/Containers";
import FormSelect from "src/components/Form/Select";
import TextInput from "src/components/Form/TextInput";
import RightModal from "src/components/Modal/rightModal";
import FileUpload from "src/components/FileUpload/simpleFileUpload";
import SubmitButton from "../submitButton";

type SubDomainModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubDomainFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

const AddSubDomain = ({ open, setOpen }: SubDomainModalProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const { control, register, handleSubmit } = useForm();
  const [isManualSave, setIsManualSave] = useState<boolean>(false);
  const projectDomains = useAppSelector((state) => state.masters.projectDomains) as apiOptionType[];

  useEffect(() => {
    dispatch(getDomains());
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmitData = useCallback(
    async (formData: any) => {
      await dispatch(createSubDomain(formData))
        .then((res: any) => {
          showSnackbar({
            message: res.payload,
            type: "success"
          });
          setOpen(false);
          return true;
        })
        .catch(({ error }: any) => {
          showSnackbar({
            message: error?.errorMessage,
            type: "error"
          });
        });
    },
    [dispatch, showSnackbar, setOpen]
  );

  const handleFormSave = useCallback(() => {
    handleSubmit(handleSubmitData)();
  }, [handleSubmit, handleSubmitData]);

  const handleManualSaveVisibility = useCallback(() => {
    setIsManualSave(!isManualSave);
  }, [isManualSave]);

  return (
    <RightModal open={open} toggleOpen={handleClose} heading='Add Sub-Domain' showIcon={false} icon='uploadDarkIcon'>
      {isManualSave ? (
        <>
          <ModalContainer>
            <form>
              <SubDomainFormContainer>
                <TextInput
                  name='subDomainName'
                  label='Sub-Domain Name'
                  placeholder='Eg: Senior Citizens'
                  control={control}
                  register={register}
                  required={true}
                />
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
              </SubDomainFormContainer>
            </form>
          </ModalContainer>
          <ModalFooterButtonContainer>
            <SubmitButton submitAction={handleFormSave} />
          </ModalFooterButtonContainer>
        </>
      ) : (
        <ModalContainer style={{ justifyContent: "center" }}>
          <FileUpload handleButtonClick={handleManualSaveVisibility} />
        </ModalContainer>
      )}
    </RightModal>
  );
};

export default AddSubDomain;
