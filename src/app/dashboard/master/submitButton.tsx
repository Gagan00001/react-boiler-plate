import MudraButton, { IMudraButtonProps } from "src/components/Mudra/Button";
import { Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";

interface submitButtonProps extends IMudraButtonProps {
  submitAction: () => void;
}
const SubmitButton = ({ submitAction, ...restProps }: submitButtonProps) => {
  return (
    <MudraButton
      onClick={submitAction}
      variant={Variant.Primary}
      label='Submit'
      size={Size.Medium}
      width={Width.Full}
      {...restProps}
    />
  );
};

export default SubmitButton;
