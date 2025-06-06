import { useCallback, useRef, memo } from "react";

import { useCreateTask } from "../../../../common/hooks/taskMutations";

import { DetailsIcon, SubmitIcon } from "../../../../common";

import { ToolTip } from "../../../ui";

import "./TaskHeader.css";

const RequiredFields = ({
  toggleDetails,
  detailsButtonRef,
  submitButtonRef,
}) => (
  <div className="tasks-header__required">
    <input
      type="text"
      className="tasks-header__title"
      id="task-title"
      placeholder="enter task title"
      required
    />

    <button
      type="submit"
      className="header-form__submit tasks-header__submit"
      ref={submitButtonRef}
    >
      <SubmitIcon />
      <ToolTip content={"add new task"} parentRef={submitButtonRef} />
    </button>

    <button
      type="button"
      className="tasks-header__details-button"
      onClick={toggleDetails}
      ref={detailsButtonRef}
    >
      <DetailsIcon />
      <ToolTip content={"detailed view"} parentRef={detailsButtonRef} />
    </button>
  </div>
);

const OptionalFields = ({ detailsRef }) => (
  <div
    className="tasks-header__details tasks-header__details--hidden"
    ref={detailsRef}
  >
    <div className="tasks-header__date">
      <label htmlFor="task-date">due:</label>
      <input type="date" id="task-date" />
    </div>

    <div className="tasks-header__priority">
      <label htmlFor="task-priority">priority:</label>
      <select id="task-priority">
        <option readOnly></option>
        <option value="high" readOnly>
          high
        </option>
        <option value="medium" readOnly>
          medium
        </option>
        <option value="low" readOnly>
          low
        </option>
      </select>
    </div>
    <div className="tasks-header__description">
      <label htmlFor="task-description">description:</label>
      <textarea id="task-description"></textarea>
    </div>
    <div className="tasks-header__notes">
      <label htmlFor="task-notes">notes:</label>
      <textarea id="task-notes"></textarea>
    </div>
  </div>
);

export default memo(function TaskHeader() {
  const detailsRef = useRef(null);
  const detailsButtonRef = useRef(null);
  const submitButtonRef = useRef(null);

  const mutation = useCreateTask();

  const submitTask = useCallback((e) => {
    e.preventDefault();
    const entries = e.target.elements;

    const newTask = {
      title: entries["task-title"].value,
      priority: entries["task-priority"].value,
      status: false,
      description: entries["task-description"].value,
      notes: entries["task-notes"].value,
      date: entries["task-date"].value,
    };

    mutation.mutate(newTask);
    e.target.reset();
  });

  const toggleDetails = useCallback(() => {
    detailsRef.current.classList.toggle("tasks-header__details--hidden");

    detailsButtonRef.current.classList.toggle(
      "tasks-header__details-button--active"
    );
  }, [detailsRef, detailsButtonRef]);

  return (
    <form className="tasks-header__form header-form" onSubmit={submitTask}>
      <RequiredFields
        toggleDetails={toggleDetails}
        detailsButtonRef={detailsButtonRef}
        submitButtonRef={submitButtonRef}
      />
      <OptionalFields detailsRef={detailsRef} />
    </form>
  );
});
