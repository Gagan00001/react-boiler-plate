import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { documentTypeOptions } from "src/lib/constants";

import { useAppDispatch, useAppSelector } from "src/redux";
import { documentDownloadFromS3, getProjectDocumentList } from "src/redux/slices/projectSlice";
import { getProjectDocumentsListRequest } from "src/redux/types/project";

import Table from "src/components/Table";
import SvgIcon from "src/components/SvgIcon";
import { downloadFile } from "src/lib/utils";

const StyledIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns = (handleDocumentDownload: (data: any) => void) => {
  return [
    {
      label: "Name",
      type: "text",
      dataKey: "name",
      maxWidth: "8rem",
      sort: true
    },
    {
      label: "Description",
      dataKey: "description",
      type: "text"
    },
    {
      label: "Type",
      dataKey: "contentType",
      type: "text"
    },
    {
      label: "Action",
      width: "96px",
      render: ({ data: rowData }: { data: any }) => {
        return (
          <StyledIconsWrapper>
            <SvgIcon name='downloadIcon' height={24} width={24} onClick={() => handleDocumentDownload(rowData)} />
            <span id='downloadIcon'></span>
            {/* <SvgIcon name='deleteIcon' height={24} width={24} /> */}
          </StyledIconsWrapper>
        );
      }
    }
  ];
};

const DocumentTable = ({ projectId, handleDocUpload }: { projectId: string; handleDocUpload: () => void }) => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.projects.documentsList);

  const [tableFilters, setTableFilters] = useState<getProjectDocumentsListRequest>({
    projectId,
    contentType: "all",
    page: 0,
    recordsPerPage: 10
  });

  useEffect(() => {
    dispatch(getProjectDocumentList(tableFilters));
  }, [dispatch, tableFilters]);

  const handleFilters = useCallback(
    (projectType: string) => {
      setTableFilters({ ...tableFilters, contentType: projectType });
    },
    [tableFilters]
  );

  const handlePageChange = useCallback(
    (currentPage: number) => {
      setTableFilters({ ...tableFilters, page: currentPage });
    },
    [tableFilters]
  );

  const handleRowsPerPageChange = useCallback(
    (recordsPerPage: number) => {
      setTableFilters({ ...tableFilters, recordsPerPage });
    },
    [tableFilters]
  );

  const handleDocumentDownload = useCallback(
    (rowData: any) => {
      dispatch(documentDownloadFromS3({ path: rowData.filePath, expiry: 15000 }))
        .unwrap()
        // eslint-disable-next-line promise/always-return
        .then((res: any) => {
          const s3Url = res[0] as string;
          downloadFile({ fileName: "document.png", filePath: s3Url });
        })
        .catch(() => {});
    },
    [dispatch]
  );

  return (
    <Table
      columns={columns(handleDocumentDownload)}
      data={data}
      keyExtractor='name'
      loading={loading}
      handleFilters={handleFilters}
      headerFiltersOptions={documentTypeOptions}
      actionButtonLabel='+ Add Document/Media'
      actionButtonClick={handleDocUpload}
      showSearch={false}
      tableContainerSx={{ maxHeight: "284px" }}
      totalCount={10}
      handlePageChange={handlePageChange}
      handleRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default DocumentTable;
