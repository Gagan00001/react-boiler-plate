/* eslint-disable no-console */

"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

import Table from "src/components/Table";
import PageHeader from "src/components/PageHeader";
import { TableContainer } from "src/components/Containers";
import { useAppDispatch, useAppSelector } from "src/redux";
import { getProjectTypes, getProjectsList } from "src/redux/slices/projectSlice";
import { ProjectsListRequest } from "src/redux/types/project";
import optionsParser from "src/lib/optionsParser";

import { useRouter } from "next/navigation";
import ProjectCSVModal from "./projectCsvModal";
import columns from "./columns";

type ProjectsListProps = {
  handleManualFormVisibility: () => void;
};

const ProjectsList = ({ handleManualFormVisibility }: ProjectsListProps) => {
  const dispatch = useAppDispatch();
  const { data: projectTypesInfo } = useAppSelector((state) => state.projects.projectTypes);
  const { loading, data: projectsList, totalCount } = useAppSelector((state) => state.projects.projectsList);
  const router = useRouter();
  const [tableFilters, setTableFilters] = useState<ProjectsListRequest>({
    type: "all",
    page: 0,
    recordsPerPage: 10
  });
  const [csvModalVisible, setIsCSVModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjectsList(tableFilters));
  }, [dispatch, tableFilters]);

  const handleCSVUpload = useCallback(() => {
    setIsCSVModalVisible(true);
  }, []);

  const handleFilters = useCallback(
    (projectType: string) => {
      setTableFilters({ ...tableFilters, type: projectType });
    },
    [tableFilters]
  );

  const debouncedSearchResults = useCallback(
    (searchText: string) => {
      setTableFilters({ ...tableFilters, searchText });
    },
    [tableFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchFilter = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      if (!searchValue) {
        setTableFilters({ ...tableFilters, searchText: undefined });
      }
      if (searchValue.length > 3) {
        debouncedSearchResults(searchValue);
      }
    }, 2000),
    [debouncedSearchResults]
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

  const handleRowClick = useCallback(
    (row: any) => {
      router.push(`/dashboard/projects/details?id=${row.id}`);
    },
    [router]
  );

  return (
    <>
      <PageHeader
        headerLabel='Projects'
        showIcon={true}
        secondaryButtonIcon='plusIcon'
        secondaryButtonLabel='Add Manually'
        secondaryButtonAction={handleManualFormVisibility}
        primaryButtonIcon='uploadIcon'
        primaryButtonAction={handleCSVUpload}
        primaryButtonLabel='Upload CSV'
        showDownloadButton={true}
      />
      <TableContainer>
        <Table
          columns={columns}
          data={projectsList}
          keyExtractor='id'
          loading={loading}
          handleFilters={handleFilters}
          onRowClick={handleRowClick}
          headerFiltersOptions={optionsParser({
            labelKey: "projectType",
            valueKey: "projectTypeId",
            options: projectTypesInfo
          })}
          showSearch={true}
          searchPlaceholder='Search Project Name'
          handleSearch={handleSearchFilter}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      {csvModalVisible && <ProjectCSVModal open={csvModalVisible} setOpen={setIsCSVModalVisible} />}
    </>
  );
};
export default ProjectsList;
