import { useQuery } from "@tanstack/react-query";

import { ProjectContent } from "../";

import "./ProjectList.css";

const port = import.meta.env.VITE_PORT;
console.log(port);

export default function ProjectList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      fetch(`http://localhost:${port}/getProjects`).then((res) => res.json()),
  });

  if (isPending) return;

  if (error) return "Error: " + error.message;

  return (
    <>
      <div className="projects-list">
        {data.map((p) => (
          <ProjectContent key={p.info.uuid} data={p} />
        ))}
      </div>
    </>
  );
}
