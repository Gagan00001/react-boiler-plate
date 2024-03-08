"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import Table from "src/components/Table";
import PageHeader from "src/components/PageHeader";
import { TableContainer } from "src/components/Containers";
import MudraTypography from "src/components/Mudra/Typography";

import { useAppDispatch, useAppSelector } from "src/redux";
import { getCollaboratorTypeDetail } from "src/redux/slices/collaboratorSlice";
import { CollaboratorTypeDetailRequest } from "src/redux/types/collaborator";

const detailColumns = [
  {
    label: "Name",
    type: "text",
    dataKey: "name",
    maxWidth: "12rem",
    sort: true,
    render: ({ data: { name, state, district } }: { data: { name: string; state: string; district: string } }) => (
      <>
        <MudraTypography size={14} weight='regular' textColor='neutral100'>
          {name}
        </MudraTypography>
        <MudraTypography size={12} weight='regular' textColor='neutral50'>
          {`${district} , ${state}`}
        </MudraTypography>
      </>
    )
  },
  {
    label: "Contact Number",
    dataKey: "mobileNumber",
    type: "text"
  },
  {
    label: "Domain",
    type: "text",
    maxWidth: "10rem",
    render: ({ data: { domain = [] } }) => (
      <MudraTypography size={14} weight='regular' textColor='neutral100'>
        {domain?.map((item: any) => item).join(" | ")}
      </MudraTypography>
    )
  },
  {
    label: "Onboarding Partner",
    dataKey: "onboardingPartner",
    type: "text"
  }
];

const CollaboratorDetail = () => {
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const collabType = searchParams.get("collabType") || "";
  const dispatch = useAppDispatch();
  const { data: collabDetail, loading } = useAppSelector((state) => state.collaborators.collaboratorTypeDetail);
  const [tableFilters, setTableFilters] = useState<CollaboratorTypeDetailRequest>({
    type: params.collaboratorTypeId as string,
    pageNumber: 0,
    pageSize: 10
  });

  useEffect(() => {
    dispatch(getCollaboratorTypeDetail({ ...tableFilters }));
  }, [tableFilters]);

  const handleBackButton = useCallback(() => {
    router.back();
  }, [router]);

  const handlePageChange = useCallback(
    (currentPage: number) => {
      setTableFilters({ ...tableFilters, pageNumber: currentPage });
    },
    [tableFilters]
  );

  const handleRowsPerPageChange = useCallback(
    (recordsPerPage: number) => {
      setTableFilters({ ...tableFilters, pageSize: recordsPerPage });
    },
    [tableFilters]
  );

  const handleRowClick = useCallback(
    (rowData: any) => {
      router.push(`${pathName}/${rowData.collaboratorId}?${searchParams}`);
    },
    [pathName, router, searchParams]
  );

  return (
    <>
      <PageHeader
        headerLabel={collabType}
        showBackIcon
        backButtonAction={handleBackButton}
        showIcon={true}
        secondaryButtonLabel='Export CSV'
        secondaryButtonIcon='downloadIcon'
      />
      <TableContainer>
        <Table
          data={collabDetail?.response}
          columns={detailColumns}
          loading={loading}
          keyExtractor='collaboratorId'
          showTableHeaders={false}
          totalCount={collabDetail?.response?.length}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          onRowClick={handleRowClick}
        />
      </TableContainer>
    </>
  );
};

export default CollaboratorDetail;
