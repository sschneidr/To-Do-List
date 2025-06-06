import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import queryClient from "../../../../common/utils/QueryClient.js";

import { TaskHeader, TaskFilter, TaskContent } from "../index.js";

import { ProjectContext } from "../../../../pages/Dashboard/Dashboard.jsx";

import "./TaskList.css";

export default function TaskList() {
  const { selectedProject } = useContext(ProjectContext);

  const [sortField, setSortField] = useState("none");
  const [sortOrder, setSortOrder] = useState("descending");
  const [hasFilter, setHasFilter] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: [selectedProject],
    queryFn: () =>
      fetch(
        `http://localhost:${
          import.meta.env.VITE_PORT
        }/getTasks/${selectedProject}/${hasFilter}/${sortField}/${sortOrder}`
      ).then((res) => {
        return res.json();
      }),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [selectedProject] });
  }, [hasFilter, sortField, sortOrder]);

  if (isPending) return;

  if (error) return "Error: " + error.message;

  return (
    <div className="tasks">
      {selectedProject && (
        <>
          <div className="tasks-list">
            {data.map((t) => (
              <div className="tasks-list__element" key={t._id}>
                <TaskContent task={t} />
              </div>
            ))}
          </div>
          <TaskFilter
            sortField={sortField}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            hasFilter={hasFilter}
            setHasFilter={setHasFilter}
          />
          <div className="tasks-header">
            <TaskHeader />
          </div>
        </>
      )}
    </div>
  );
}
