<script lang="ts">
    import { navigate } from "svelte-navigator";
    import type { ProjectModel } from "../models/Project";
    import { activeProject } from "../stores/projects";
    
    export let project: ProjectModel;

    function navigateToProject() {
        $activeProject = project;
        navigate('/project')
    }

</script>

<div class="flex flex-col space-y-3" on:click={navigateToProject}>
    <div class="w-48 h-48 bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-all">
        <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold">{project.name}</h2>
        </div>
    </div>
</div>
