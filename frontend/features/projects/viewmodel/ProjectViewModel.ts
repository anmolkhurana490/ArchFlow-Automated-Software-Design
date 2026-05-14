"use client";
import { useEffect, useState } from "react";
import { getUserProjects, createProject as apiCreate, updateProject as apiUpdate, deleteProject as apiDelete } from "@/features/projects/repositories";
import type { Project, ProjectModalPayload } from "../model/types";
import { toast } from "sonner";

export function useProjectViewModel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await getUserProjects(100, 0);
      setProjects(res.projects || []);
    } catch (e) {
      toast.error("Failed to load projects");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: ProjectModalPayload) => {
    setLoading(true);
    try {
      const created = await apiCreate(payload);
      setProjects((p) => [created, ...p]);
      toast.success("Project created successfully");
      setLoading(false);
      return created;
    }
    catch (e) {
      toast.error("Failed to create project");
      console.error(e);
      setLoading(false);
      return null;
    }
  };

  const update = async (id: string, payload: ProjectModalPayload) => {
    setLoading(true);
    try {
      const updated = await apiUpdate(id, payload);
      setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
      toast.success("Project updated successfully");
      setLoading(false);
      return updated;
    }
    catch (e) {
      toast.error("Failed to update project");
      console.error(e);
      setLoading(false);
      return null;
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await apiDelete(id);
      setProjects((p) => p.filter((x) => x.id !== id));
      toast.success("Project deleted successfully");
      setLoading(false);
    }
    catch (e) {
      toast.error("Failed to delete project");
      console.error(e);
      setLoading(false);
    }
  };

  const selectProject = (p: Project | null) => setSelectedProject(p);

  return {
    projects,
    loading,
    selectedProject,
    loadProjects,
    create,
    update,
    remove,
    selectProject,
  };
}

export default useProjectViewModel;
