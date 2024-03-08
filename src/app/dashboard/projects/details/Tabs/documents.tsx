import { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "src/redux";
import { getProjectDocumentList } from "src/redux/slices/projectSlice";

import SvgIcon from "src/components/SvgIcon";
import MudraButton from "src/components/Mudra/Button";
import { TitleSubtitleBlock } from "src/components/Containers";
import { IconAlignment, Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";

import UploadDocModal from "./documents/uploadDocFormModal";
import DocumentsTable from "./documents/documentTable";

const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  gap: 32px;
  padding: 40px 0;
`;
const Documents = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "";
  const { data, currentFilter } = useAppSelector((state) => state.projects.documentsList);
  const [docModalVisible, setIsDocModalVisible] = useState(false);

  useEffect(() => {
    if (projectId && docModalVisible === false) {
      dispatch(getProjectDocumentList({ projectId, contentType: "all", page: 0, recordsPerPage: 10 }));
    }
  }, [docModalVisible, projectId]);

  const handleDocUpload = useCallback(() => {
    setIsDocModalVisible(true);
  }, []);

  return (
    <>
      {isEmpty(data) && currentFilter === "all" ? (
        <DocumentContainer>
          <SvgIcon name='folderIcon' width={90} height={90} />
          <TitleSubtitleBlock title='No Document' subtitle='Start adding documents here!' />
          <MudraButton
            onClick={handleDocUpload}
            variant={Variant.Primary}
            label=' Add Document / Media'
            size={Size.Medium}
            width={Width.Auto}
            iconAlignment={IconAlignment.LeftAligned}
            icon='plusWhiteIcon'
          />
        </DocumentContainer>
      ) : (
        <DocumentsTable projectId={projectId} handleDocUpload={handleDocUpload} />
      )}
      {docModalVisible && <UploadDocModal open={docModalVisible} setOpen={setIsDocModalVisible} />}
    </>
  );
};

export default Documents;
