import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getProjectLocations } from "src/redux/slices/projectSlice";
import Table from "src/components/Table";
import MudraTypography from "src/components/Mudra/Typography";

const columns = [
  {
    label: "State",
    type: "text",
    dataKey: "name",
    maxWidth: "8rem",
    sort: true
  },
  {
    label: "District",
    dataKey: "district",
    render: ({ data: { districts = [] } }) => (
      <MudraTypography size={14} weight='regular' textColor='neutral100'>
        {districts?.map((item: any) => item?.name).join(" | ")}
      </MudraTypography>
    )
  },
  {
    label: "Block",
    dataKey: "block",
    render: ({ data: { blocks = [] } }) => (
      <MudraTypography size={14} weight='regular' textColor='neutral100'>
        {blocks?.map((item: any) => item?.name).join(" | ")}
      </MudraTypography>
    )
  }
];

const LocationTable = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const { data, loading } = useAppSelector((state) => state.projects.projectLocations);
  useEffect(() => {
    if (projectId) dispatch(getProjectLocations({ id: projectId }));
  }, [projectId]);

  return (
    <Table
      columns={columns}
      data={data?.states}
      loading={loading}
      showTableHeaders={false}
      showPagination={false}
      keyExtractor={"id"}
    />
  );
};

export default LocationTable;
