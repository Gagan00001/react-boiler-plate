import styled from "styled-components";

const StyledCellContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 64px;
  border-radius: 4px;
  background-color: ${({ active, theme }) => (active ? theme.colors.emeraldGreen[10] : theme.colors.neutral[10])};
  color: ${({ active, theme }) => (active ? theme.colors.emeraldGreen[140] : theme.colors.neutral[90])};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;

const StyledIndicator = styled.div<{ active: boolean }>`
  height: 10px;
  width: 10px;
  margin-right: 4px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => (active ? theme.colors.emeraldGreen[140] : theme.colors.neutral[90])};
`;

interface StatusCellProps {
  isActive: boolean;
}

const StatusCell = ({ isActive = true }: StatusCellProps) => {
  return (
    <StyledCellContainer active={isActive}>
      <StyledIndicator active={isActive} />
      {isActive ? "Active" : "Inactive"}
    </StyledCellContainer>
  );
};

export default StatusCell;
