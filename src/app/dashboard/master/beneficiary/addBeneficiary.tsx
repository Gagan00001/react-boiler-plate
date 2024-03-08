import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalContainer, ModalFooterButtonContainer } from "src/components/Containers";
import TextInput from "src/components/Form/TextInput";
import RightModal from "src/components/Modal/rightModal";
import { useAppDispatch } from "src/redux";
import { createBeneficiary } from "src/redux/slices/masterSlice";
import useSnackbar from "src/hooks/useSnackbar";
import FileUpload from "src/components/FileUpload/simpleFileUpload";
import SubmitButton from "../submitButton";

type BeneficiaryModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBeneficiary = ({ open, setOpen }: BeneficiaryModalProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const { control, register, handleSubmit } = useForm();
  const [isManualSave, setIsManualSave] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmitData = useCallback(
    async (formData: any) => {
      await dispatch(createBeneficiary(formData))
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

  return (
    <RightModal open={open} toggleOpen={handleClose} heading='Add Beneficiary' showIcon={false} icon='uploadDarkIcon'>
      {isManualSave ? (
        <>
          <ModalContainer>
            <form>
              <TextInput
                name='beneficiaryName'
                label='Beneficiary Name'
                placeholder='Eg: Senior Citizens'
                control={control}
                register={register}
                required={true}
              />
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

export default AddBeneficiary;
