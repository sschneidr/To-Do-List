import { useCallback, useContext, useState } from "react";

import { DetailedViewContext } from "../../../../../App";

import { ProjectContext } from "../../../../pages/Dashboard/Dashboard";

import {
  GetDate,
  GetDurationBetweenDates,
} from "../../../../common/utils/Dates";

import {
  useUpdateStatus,
  useDeleteTask,
} from "../../../../common/hooks/taskMutations";

import { DeletePrompt } from "../../../ui";

import { TaskEditor } from "../";

import { EditIcon, ClockIcon } from "../../../../common";

import "./TaskContent.css";

export default function TaskContent({ task }) {
  const { showDetails } = useContext(DetailedViewContext);

  const [editMode, setEditMode] = useState(false);
  const [showNotes, setNotesDisplay] = useState(false);

  const tDate = GetDate(task.date);
  const daysLeft =
    tDate !== null ? GetDurationBetweenDates(tDate, new Date()) : null;

  const dColor =
    daysLeft > 14
      ? "var(--due-later)"
      : daysLeft > 7
      ? "var(--due-next-week)"
      : daysLeft > 0
      ? "var(--due-this-week)"
      : daysLeft <= 0
      ? "var(--due-overdue)"
      : "";

  const deleteMutation = useDeleteTask(task.title);
  const updateStatusMutation = useUpdateStatus();

  const updateStatus = useCallback(
    (e) => {
      e.preventDefault();
      updateStatusMutation.mutate({
        ...task,
        status: !task.status,
      });
    },
    [updateStatusMutation, task]
  );

  const enableEditMode = () => setEditMode(true);
  const toggleNotes = () => setNotesDisplay(!showNotes);

  const DueDate = ({ date, daysLeft, dColor }) => (
    <p
      style={{
        backgroundColor: dColor,
        padding: "5px",
        marginBottom: "5px",
        borderBottom: "1px solid var(--border-task)",
      }}
      className="task__date"
    >
      <ClockIcon className="icon__clock" />
      {date.toLocaleDateString("de-DE")}
      {daysLeft >= 0
        ? ` (${daysLeft} days left)`
        : ` (${Math.abs(daysLeft)} days due)`}
    </p>
  );

  const Status = ({ status, title }) => (
    <div className="task__checkbox">
      <input type="checkbox" onClick={updateStatus} defaultChecked={status} />
      <label
        className={`task__status${status ? " task__status--finished" : ""}`}
      >
        {title}
      </label>
    </div>
  );

  const Priority = ({ priority }) => (
    <p className={`task__priority--${priority}`} type="priority">
      {priority}
    </p>
  );

  const Details = ({ view, content, type }) => (
    <>
      <span className={`task__${type}${view ? "" : ` task__${type}--hidden`}`}>
        {content}
      </span>
    </>
  );

  return (
    <div className="task__data">
      {tDate && <DueDate date={tDate} daysLeft={daysLeft} dColor={dColor} />}
      <Status status={task.status} title={task.title} />

      {task.priority && <Priority priority={task.priority} />}

      {showDetails && (
        <>
          {(task.description || task.notes) && (
            <div className="hrLine task-hline"></div>
          )}

          {task.description && (
            <Details
              view={showDetails}
              content={task.description}
              type={"description"}
            />
          )}

          {task.notes && (
            <>
              <button onClick={toggleNotes} className="task-notes-button">
                {showNotes ? "hide" : "show"} notes
              </button>
              {showNotes && (
                <Details view={showNotes} content={task.notes} type="notes" />
              )}
            </>
          )}
        </>
      )}

      <div className="task__buttons">
        <EditIcon className="task__edit-button" onClick={enableEditMode} />
        <DeletePrompt element={task.title} mutation={deleteMutation} />
      </div>

      {editMode && <TaskEditor setEditMode={setEditMode} task={task} />}
    </div>
  );
}
