import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import axiosClient from "../utils/Axios.js";
import queryClient from "../utils/QueryClient.js";

import { ProjectContext } from "../../pages/Dashboard/Dashboard.jsx";

export const useDeleteProject = (title) => {
  const { selectedProject, changeSelectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: () => {
      return axiosClient.delete(`/deleteCollection/${title}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (selectedProject == title) changeSelectedProject(null);
    },
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};

export const useUpdateProject = (oldTitle, newTitle) => {
  const { selectedProject, changeSelectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: (newTitle) => {
      return axiosClient.put(`/updateCollection/${oldTitle}`, newTitle);
    },
    onSuccess: () => {
      if (oldTitle == selectedProject) {
        changeSelectedProject(newTitle);
      }
      queryClient.removeQueries({ queryKey: [oldTitle], exact: true });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (title) => {
      return axiosClient.post(`/createCollection/${title}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};
