<script>
    import Project from "../lib/Project.svelte";
    import NewProject from "../lib/NewProject.svelte";
    import { projectsStore } from "../stores/store";
</script>

<div class="flex flex-col space-y-6">
    <h1 class="text-4xl font-bold">Projects</h1>

    <div class="flex space-x-3 transition-all">
        {#each $projectsStore as project}
            <Project {project} />
        {/each}

        <NewProject />
    </div>
</div>
