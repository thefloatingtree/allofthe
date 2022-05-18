import type { ProjectModel } from "../models/Project";
import { writable } from "svelte/store";

export const projectsStore = writable<Array<ProjectModel>>([])
export const activeProject = writable<ProjectModel>(null)