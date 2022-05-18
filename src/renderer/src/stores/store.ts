import type { FileWithPath, ProjectModel } from "../models/Project";
import { writable } from "svelte/store";
import { localStorage, persist } from "@macfja/svelte-persistent-store";

export const projectsStore = persist(writable<Array<ProjectModel>>([]), localStorage(), 'projectsStore')
export const activeProject = writable<ProjectModel>(null)
export const activeVideo = writable<FileWithPath>(null)
export const keyboard = writable<{ [key: string]: boolean }>({})

activeProject.subscribe(activeProject => {
    if (!activeProject) return
    projectsStore.update(projects => {
        if (!projects) return []
        return projects.map(project => {
            if (project.id === activeProject.id) return activeProject
            return project
        })
    })
})