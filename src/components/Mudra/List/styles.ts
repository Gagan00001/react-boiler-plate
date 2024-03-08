/* eslint-disable import/no-cycle */
import styled, { css } from "styled-components";
import { IMudraListProps } from "./index";

export const UnorderedList = styled.ul<IMudraListProps>`
  ${({ listStyleType }) => css`
    list-style-type: ${listStyleType};
    padding: unset;
  `}
`;

export const OrderedList = styled.ol<IMudraListProps>`
  ${({ listStyleType }) => css`
    list-style-type: ${listStyleType};
    padding: unset;
  `}
`;
