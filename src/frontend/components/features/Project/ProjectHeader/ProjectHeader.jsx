import { useCallback, useState, useRef } from "react";

import { SubmitIcon } from "../../../../common";

import { ToolTip } from "../../../ui/";

import { useCreateProject } from "../../../../common/hooks/projectMutations";

import "./ProjectHeader.css";

export default function ProjectHeader() {
  const buttonRef = useRef(null);

  const [newProjectTitle, setNewProjectTitle] = useState("");

  const mutation = useCreateProject();

  const updateNewProjectTitle = useCallback((event) => {
    setNewProjectTitle(event.target.value);
  }, []);

  const submitNewProject = useCallback(
    (event) => {
      event.preventDefault();
      mutation.mutate(newProjectTitle);
      event.target.reset();
    },
    [newProjectTitle]
  );

  return (
    <div className="projects-header">
      <form
        action="/submit"
        className="projects-header__form header-form"
        onSubmit={submitNewProject}
      >
        <div className="projects-header__required">
          <input
            type="text"
            className="projects-header__title"
            placeholder="enter project title"
            onChange={updateNewProjectTitle}
            required
          />
          <button
            type="submit"
            className="projects-header__submit"
            ref={buttonRef}
          >
            <SubmitIcon />
            <ToolTip content={`add new project`} parentRef={buttonRef} />
          </button>
        </div>
      </form>
    </div>
  );
}
