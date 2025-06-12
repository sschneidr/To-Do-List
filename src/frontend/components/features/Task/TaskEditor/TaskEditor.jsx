import { useRef, useCallback } from "react";

import { GetDate, GetFormattedDate } from "../../../../common/utils/Dates";

import { useUpdateTask } from "../../../../common/hooks/taskMutations";

import "./TaskEditor.css";

export default function TaskEditor({ setEditMode, task }) {
  const formRef = useRef(null);

  const dueDate = GetDate(task.date);
  const dueDateFormatted = GetFormattedDate(dueDate);

  const mutation = useUpdateTask();

  const submitChanges = useCallback(
    (e) => {
      e.preventDefault();
      const entries = formRef.current.elements;
      mutation.mutate({
        _id: task._id,
        title: entries["task-title"].value,
        priority: entries["task-priority"].value,
        description: entries["task-description"].value,
        notes: entries["task-notes"].value,
        date: entries["task-date"].value,
        status: task.status,
      });
      setEditMode(false);
    },
    [formRef, task, mutation, setEditMode]
  );

  const Priority = ({ priority }) => (
    <div className="task__update-priority">
      <label htmlFor="task-priority">priority</label>
      <select id="task-priority" defaultValue={priority}>
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
  );

  const Date = ({ dueDate }) => (
    <div className="task__update-date">
      <label htmlFor="task-date">due date</label>
      <input type="date" id="task-date" defaultValue={dueDate} />
    </div>
  );

  const Details = ({ content, type }) => (
    <>
      <label htmlFor={`task-${type}`}>{`${type}`}</label>
      <textarea
        className={`task__update-${type}`}
        id={`task-${type}`}
        defaultValue={content}
      ></textarea>
    </>
  );

  const Title = ({ title }) => (
    <div className="task__update-checkbox">
      <label htmlFor="task-title">title</label>
      <input
        type="text"
        className="task__update-title"
        id="task-title"
        required
        defaultValue={title}
      />
    </div>
  );

  return (
    <>
      <div id="overlay"></div>
      <div className="task__update-window window">
        <form ref={formRef} className="task__update-form">
          <Title title={task.title} />
          <Date dueDate={dueDateFormatted} />
          <Priority priority={task.priority} />
          <div className={`task__update-details`}>
            <Details content={task.description} type={`description`} />
            <Details content={task.notes} type={`notes`} />
          </div>
          <div className="task__update-buttons window__buttons">
            <button className="task__update-confirm" onClick={submitChanges}>
              confirm changes
            </button>
            <button
              className="task__update-exit window__exit"
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
