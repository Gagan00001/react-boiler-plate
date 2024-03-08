import { useCallback, useEffect, useState } from "react";

import isArray from "lodash/isArray";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import useSnackbar from "src/hooks/useSnackbar";
import { apiOptionType } from "src/lib/commonTypes";
import { useAppDispatch, useAppSelector } from "src/redux";
import { createBlock, getDistricts, getStateslist } from "src/redux/slices/masterSlice";

import FormSelect from "src/components/Form/Select";
import TextInput from "src/components/Form/TextInput";
import RightModal from "src/components/Modal/rightModal";
import FileUpload from "src/components/FileUpload/simpleFileUpload";
import { ModalContainer, ModalFooterButtonContainer } from "src/components/Containers";
import SubmitButton from "../submitButton";

type blockModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BlockFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

const AddBlock = ({ open, setOpen }: blockModalProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const { control, register, handleSubmit, getValues } = useForm();
  const [isManualSave, setIsManualSave] = useState<boolean>(false);
  const states = useAppSelector((state) => state.masters.states) as apiOptionType[];
  const districts = useAppSelector((state) => state.masters.districts);

  useEffect(() => {
    dispatch(getStateslist());
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmitData = useCallback(
    async (formData: any) => {
      await dispatch(createBlock(formData))
        .unwrap()
        .then((res: string) => {
          showSnackbar({
            message: res,
            type: "success"
          });
          setOpen(false);
          return true;
        })
        .catch((error: any) => {
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

  const handleStateChange = useCallback(
    (selectedState: string) => {
      dispatch(getDistricts({ stateId: selectedState }));
    },
    [dispatch]
  );

  return (
    <RightModal open={open} toggleOpen={handleClose} heading='Add Block' showIcon={false} icon='uploadDarkIcon'>
      {isManualSave ? (
        <>
          <ModalContainer>
            <form>
              <BlockFormContainer>
                <TextInput
                  name='blockName'
                  label='Block Name'
                  placeholder='Eg: Buxar'
                  control={control}
                  register={register}
                  required={true}
                />
                <FormSelect<apiOptionType>
                  name='stateId'
                  label='State'
                  placeholder='Select State'
                  control={control}
                  register={register}
                  required={true}
                  valueAccessor='id'
                  labelAccessor='name'
                  options={isArray(states) ? states : []}
                  handleOnChange={handleStateChange}
                />
                <FormSelect<apiOptionType>
                  name='districtId'
                  label='District'
                  placeholder='Select District'
                  control={control}
                  register={register}
                  required={true}
                  valueAccessor='id'
                  labelAccessor='name'
                  options={isArray(districts[getValues("stateId")]) ? districts[getValues("stateId")] : []}
                />
              </BlockFormContainer>
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

export default AddBlock;
