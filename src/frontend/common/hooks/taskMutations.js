import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import axiosClient from "../utils/Axios.js";
import queryClient from "../utils/QueryClient.js";

import { ProjectContext } from "../../pages/Dashboard/Dashboard.jsx";

export const useDeleteTask = (title) => {
  const { selectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: () => {
      return axiosClient.delete(`/deleteTask/${selectedProject}/${title}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [selectedProject] });
    },
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};

export const useUpdateTask = () => {
  const { selectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: (task) => {
      return axiosClient.put(
        `/updateTask/${selectedProject}/${task._id}`,
        task
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [selectedProject] });
    },
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};

export const useCreateTask = () => {
  const { selectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: (title) => {
      return axiosClient.post(`/createTask/${selectedProject}`, title);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [selectedProject] }),
    onError: () => {
      return "Error: " + mutation.error.message;
    },
  });
};

export const useUpdateStatus = () => {
  const { selectedProject } = useContext(ProjectContext);

  return useMutation({
    mutationFn: (task) => {
      return axiosClient.put(
        `/updateStatus/${selectedProject}/${task._id}`,
        task
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [selectedProject] });
    },
  });
};
