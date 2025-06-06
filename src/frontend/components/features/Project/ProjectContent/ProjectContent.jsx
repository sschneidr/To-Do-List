import { useState, useContext, useCallback } from "react";

import { DeletePrompt } from "../../../ui/index.js";
import { ProjectEditor } from "../index.js";
import { EditIcon } from "../../../../common/index.js";

import { ProjectContext } from "../../../../pages/Dashboard/Dashboard.jsx";

import { useDeleteProject } from "../../../../common/hooks/projectMutations.js";

import "./ProjectContent.css";

export default function ProjectContent({ data }) {
  const [editMode, setEditMode] = useState(false);
  const { selectedProject, changeSelectedProject } = useContext(ProjectContext);

  const currentlyActive = selectedProject == data.name;

  const deleteMutation = useDeleteProject(data.name);

  const selectProject = () => {
    changeSelectedProject(data.name);
  };

  const enableEditMode = useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);

  return (
    <>
      <div
        className={`projects__element ${
          currentlyActive ? `projects__element--active` : ""
        }`}
      >
        <p onClick={selectProject}>{data.name} </p>
        <EditIcon className="project__edit-button" onClick={enableEditMode} />
        {editMode && <ProjectEditor data={data} setEditMode={setEditMode} />}
        <DeletePrompt element={data.name} mutation={deleteMutation} />
      </div>
    </>
  );
}
