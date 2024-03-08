/* eslint-disable no-console */

"use client";

import { useCallback, useState } from "react";

import ManualForm from "./manualForm";
import ProjectsList from "./list";

const Projects = () => {
  const [isManualFormVisible, setIsManualFormVisible] = useState<boolean>(false);

  const handleManualFormVisibility = useCallback(() => {
    setIsManualFormVisible(!isManualFormVisible);
  }, [isManualFormVisible]);

  return (
    <>
      {isManualFormVisible ? (
        <ManualForm handleManualFormVisibility={handleManualFormVisibility} />
      ) : (
        <ProjectsList handleManualFormVisibility={handleManualFormVisibility} />
      )}
    </>
  );
};
export default Projects;
