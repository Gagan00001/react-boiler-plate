import Tooltip from "@mui/material/Tooltip";
import SvgIcon from "src/components/SvgIcon";
import styled from "styled-components";

const StyledIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "Type",
    dataKey: "type",
    type: "text"
  },
  {
    label: "Start Date",
    dataKey: "startDate",
    type: "date"
  },
  {
    label: "End Date",
    dataKey: "endDate",
    type: "date"
  },
  {
    label: "Status",
    dataKey: "isActive",
    type: "status"
  },
  {
    label: "Action",
    width: "96px",
    render: () => {
      return (
        <Tooltip title='This feature will come soon.'>
          <StyledIconsWrapper>
            <SvgIcon name='downloadIcon' height={24} width={24} />
            <SvgIcon name='editIcon' height={24} width={24} />
          </StyledIconsWrapper>
        </Tooltip>
      );
    }
  }
];

export default columns;
