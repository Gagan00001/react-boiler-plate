/* eslint-disable import/no-cycle */
import React from "react";
import { UnorderedList, OrderedList } from "./styles";
import MudraTypography, { ColorVariant, Sizes, Weight } from "../Typography";

// eslint-disable-next-line no-shadow
export enum LIST_TYPE {
  ORDERED = "ordered",
  UNORDERED = "unordered"
}
export type lstType = "ordered" | "unordered";

export interface IMudraListProps {
  data: string[];
  listType?: lstType;
  listStyleType?: string;
  textColor?: ColorVariant;
  size?: Sizes;
  weight?: Weight;
  listStyles?: React.CSSProperties;
}

const MudraList = (props: IMudraListProps) => {
  const { data, listType, listStyleType, textColor, size, weight, listStyles } = props;
  return (
    <div>
      {listType === LIST_TYPE.ORDERED ? (
        <>
          <OrderedList listStyleType={listStyleType}>
            {data?.map((dataItem: string, index: any) => {
              return (
                <li key={`mudra-ordered-list-${index}`} style={listStyles}>
                  <MudraTypography textColor={textColor} size={size} weight={weight}>
                    {dataItem}
                  </MudraTypography>
                </li>
              );
            })}
          </OrderedList>
        </>
      ) : (
        <>
          <UnorderedList listStyleType={listStyleType}>
            {data?.map(
              (
                dataItem:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined,
                index: any
              ) => {
                return (
                  <li key={`mudra-unordered-list-${index}`} style={listStyles}>
                    <MudraTypography textColor={textColor} size={size} weight={weight}>
                      {dataItem}
                    </MudraTypography>
                  </li>
                );
              }
            )}
          </UnorderedList>
        </>
      )}
    </div>
  );
};

MudraList.defaultProps = {
  listType: "unordered",
  listStyleType: "disc",
  textColor: "neutral100",
  size: 16,
  weight: "regular"
};

export default MudraList;
