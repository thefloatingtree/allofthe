<script lang="ts">
    import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";
    import FaCloudUploadAlt from "svelte-icons/fa/FaCloudUploadAlt.svelte";
    import { filedrop } from "filedrop-svelte";
    import type { Files } from "filedrop-svelte";
    import NoteType from "../lib/NoteType.svelte";
    import { activeProject, activeVideo, projectsStore } from "../stores/store";
    import { navigate } from "svelte-navigator";
    import { NoteTypeModel } from "../models/NoteType";
    import type { FileWithPath } from "../models/Project";
    import FaTrash from "svelte-icons/fa/FaTrash.svelte";

    function addNoteType() {
        $activeProject.noteTypes = [...$activeProject.noteTypes, new NoteTypeModel("", "")];
    }

    function addFiles(files: Files) {
        $activeProject.videos = files.accepted;
    }

    function deleteProject() {
        $projectsStore = $projectsStore.filter((project) => project.id !== $activeProject.id);
        navigateToProjectList();
    }

    function navigateToProjectList() {
        navigate("/");
    }

    function navigateToVideo(file: FileWithPath) {
        $activeVideo = file;
        navigate("/video");
    }

    function bytesToSize(bytes) {
        var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes == 0) return "0 Bytes";
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    }
</script>

<div class="flex flex-col space-y-6">
    <div class="flex justify-between">
        <div class="flex space-x-3 items-center">
            <div class="btn btn-square" on:click={navigateToProjectList}>
                <div class="w-6 h-6">
                    <FaArrowLeft />
                </div>
            </div>
            <h1 class="text-4xl font-bold">{$activeProject.name}</h1>
        </div>
        <div class="btn btn-square" on:click={deleteProject}>
            <div class="w-6 h-6">
                <FaTrash />
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-12">
        <div class="w-full space-y-3">
            <div
                class="card card-side bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all"
                use:filedrop={{}}
                on:filedrop={(e) => {
                    addFiles(e.detail.files);
                }}
            >
                <figure class="p-8 w-64"><FaCloudUploadAlt /></figure>
                <div class="card-body">
                    <h2 class="card-title">Add your video files</h2>
                    <p>Drag and drop the files to this card or click to browse.</p>
                </div>
            </div>

            {#if $activeProject.videos}
                {#each $activeProject.videos as file}
                    <div class="card shadow-xl image-full">
                        <figure>
                            <video>
                                <source src={file.path} type="video/mp4" />
                                <track kind="captions" />
                            </video>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">{file.name}</h2>
                            <p>{bytesToSize(file.size)}</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary" on:click={() => navigateToVideo(file)}>Watch</button>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="w-full space-y-6">
            <button class="btn" on:click={addNoteType}>Add Note Type</button>
            <div class="space-y-3">
                {#each $activeProject.noteTypes as noteType}
                    <NoteType {noteType} />
                {/each}
            </div>
        </div>
    </div>
</div>
