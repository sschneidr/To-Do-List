import { useRef, useState, useCallback } from "react";

import { useUpdateProject } from "../../../../common/hooks/projectMutations";

import "./ProjectEditor.css";

export default function ProjectEditor({ data, setEditMode }) {
  const formRef = useRef(null);

  const [newTitle, updateTitle] = useState("");

  const mutation = useUpdateProject(data.name, newTitle);

  const submitChanges = useCallback(
    (e) => {
      e.preventDefault();
      const entry = formRef.current.elements["projects__update-title"].value;
      if (entry !== data.name) {
        mutation.mutate({
          name: newTitle,
        });
      }
      setEditMode(false);
    },
    [formRef, newTitle]
  );

  const changeTitle = (e) => {
    updateTitle(e.target.value);
  };

  return (
    <>
      <div id="overlay"></div>
      <div className="task__update-window window">
        <form ref={formRef} className="projects__update-form">
          <textarea
            type="text"
            id="projects__update-title"
            defaultValue={data.name}
            onChange={changeTitle}
            required
          />
          <div className="projects__update-buttons window__buttons">
            <button
              className="projects__update-confirm window__confirm"
              onClick={submitChanges}
            >
              confirm changes
            </button>
            <button
              className="projects__update-exit window__exit"
              onClick={() => {
                setEditMode(false);
              }}
            >
              cancel edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
