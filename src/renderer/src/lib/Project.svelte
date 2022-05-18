<script lang="ts">
    import { navigate } from "svelte-navigator";
    import type { ProjectModel } from "../models/Project";
    import { activeProject } from "../stores/store";

    export let project: ProjectModel;

    function navigateToProject() {
        $activeProject = project;
        navigate("/project");
    }
</script>

<div class="flex flex-col space-y-3" on:click={navigateToProject}>
    <div class="w-48 h-48 bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-all">
        <h2 class="text-lg font-bold">{project.name}</h2>
        <p>{project.videos.length} video(s)</p>
        {#if project.videos.length}
            <video class="rounded">
                <source src={project.videos[0].path} type="video/mp4" />
                <track kind="captions" />
            </video>
        {/if}
    </div>
</div>
