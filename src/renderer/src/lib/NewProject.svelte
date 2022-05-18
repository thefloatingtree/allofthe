<script lang="ts">
    import { ProjectModel } from "../models/Project";
    import { activeProject, projectsStore } from "../stores/projects";
    import Portal from "svelte-portal";
    import { clickOutside } from "../lib/clickOutside";

    let modalOpen = false;
    let name = "";

    function addProject() {
        if (name === "") return;

        const newProject = new ProjectModel(name, []);
        $projectsStore = [newProject, ...$projectsStore];
        $activeProject = newProject;
        modalOpen = false;
    }
</script>

<div class="text-lg font-bold w-48 h-48 bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-all" on:click={() => (modalOpen = !modalOpen)}>New Project</div>

<Portal target="body">
    <div class={"modal cursor-pointer" + (modalOpen ? " modal-open" : "")}>
        <div class="modal-box relative cursor-default" use:clickOutside on:click_outside={() => (modalOpen = false)}>
            <h3 class="font-bold text-xl">Make a new project</h3>
            <p class="py-4">A project holds a list of videos and note types</p>
            <input bind:value={name} type="text" placeholder="Project Name" class="input input-bordered w-full focus:outline-none" />
            <div class="modal-action">
                <button class="btn" on:click={addProject}>Create Project</button>
            </div>
        </div>
    </div>
</Portal>
