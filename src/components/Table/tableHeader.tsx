import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import styled from "styled-components";
import isFunction from "lodash/isFunction";

import TextField from "@mui/material/TextField";
import SvgIcon from "../SvgIcon";
import MudraTypography from "../Mudra/Typography";
import MudraButton from "../Mudra/Button";
import { Size, Variant, Width } from "../Mudra/Button/buttonPropsEnum";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
`;

const ChipsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const StyledChip = styled.div<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[80]}`};
  background-color: ${({ active, theme }) => (active ? theme.colors.piramalBlue[100] : theme.colors.neutral[0])};
  color: ${({ active, theme }) => (active ? theme.colors.neutral[0] : theme.colors.neutral[80])};
  margin-right: 12px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  /* height: 32px; */
`;

const defaultChipsOption = {
  label: "All",
  value: "all"
};

type chipOption = {
  label: string;
  value: string;
};

type TableHeadersProps = {
  filterOptions?: chipOption[];
  handleFilters?: (filterValue: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  handleSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  actionButtonLabel?: string;
  actionButtonClick?: () => void;
  headerLabel?: string | undefined;
};

const TableHeaders = ({
  filterOptions = [],
  handleFilters,
  showSearch = false,
  searchPlaceholder,
  handleSearch,
  actionButtonLabel,
  actionButtonClick,
  headerLabel
}: TableHeadersProps) => {
  const chipsOptions = [defaultChipsOption, ...filterOptions];
  const [activeChip, setActiveChip] = useState("all");

  const handleChipClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const chipValue = e?.currentTarget?.dataset?.value || "all";
      setActiveChip(chipValue);
      if (isFunction(handleFilters)) {
        handleFilters(chipValue);
      }
    },
    [handleFilters]
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (handleSearch) {
        handleSearch(event);
      }
    },
    [handleSearch]
  );

  return (
    <HeaderContainer>
      {headerLabel && (
        <MudraTypography weight='bold' size={16} textColor='neutral80'>
          {headerLabel}
        </MudraTypography>
      )}
      {filterOptions?.length > 0 && (
        <ChipsContainer>
          {chipsOptions?.map((chip) => {
            return (
              <StyledChip
                active={activeChip === chip.value}
                key={chip.value}
                data-value={chip.value}
                onClick={handleChipClick}
              >
                {chip.label}
              </StyledChip>
            );
          })}
        </ChipsContainer>
      )}
      {showSearch && (
        <SearchContainer>
          <TextField
            id='outlined-search'
            size='small'
            placeholder={searchPlaceholder}
            type='search'
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SvgIcon name='searchIcon' height={16} width={16} />
            }}
          />
        </SearchContainer>
      )}
      {actionButtonLabel && (
        <MudraButton
          onClick={actionButtonClick}
          variant={Variant.Secondary}
          label={actionButtonLabel}
          size={Size.Small}
          width={Width.Auto}
        />
      )}
    </HeaderContainer>
  );
};

export default TableHeaders;
