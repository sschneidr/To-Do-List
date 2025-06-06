import { useState, createContext } from "react";

import { ProjectList, ProjectHeader } from "../../components/features/Project";
import { TaskList } from "../../components/features/Task";

import "./Dashboard.css";

export const ProjectContext = createContext(null);

export default function Dashboard() {
  const [selectedProject, changeSelectedProject] = useState(null);

  return (
    <ProjectContext.Provider value={{ selectedProject, changeSelectedProject }}>
      <div className="dashboard">
        <div className="projects">
          <ProjectHeader />
          <ProjectList />
        </div>
        {selectedProject && <TaskList />}
      </div>
    </ProjectContext.Provider>
  );
}
