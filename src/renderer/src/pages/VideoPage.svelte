<script lang="ts">
    import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";
    import { onDestroy, onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import { activeProject, activeVideo, keyboard } from "../stores/store";
    import type { NoteTypeModel } from "../models/NoteType";
    import { NoteModel } from "../models/Note";
    import Note from "../lib/Note.svelte";
    import Portal from "svelte-portal";
    import { clickOutside } from "../lib/clickOutside";
    const { ipcRenderer } = require("electron");

    let currentTime = 0;

    let modalOpen = false;
    let trimDuration = 10;
    let outputPath = "";
    let exportLoading = false;
    let animateNoteFeedback = false;
    let animateNoteFeedbackTimer = null;

    function navigateToProject() {
        navigate("/project");
    }

    function makeNote(noteType: NoteTypeModel) {
        triggerFeedbackAnimation()
        let previousValue = $activeProject.notes[$activeVideo.path];
        if (!previousValue) previousValue = [];
        $activeProject.notes = { ...$activeProject.notes, [$activeVideo.path]: [new NoteModel(noteType, currentTime), ...previousValue] };
    }

    function onKeyDown(e: KeyboardEvent) {
        $keyboard = { ...$keyboard, [e.key]: true };
    }

    function onKeyUp(e: KeyboardEvent) {
        $keyboard = { ...$keyboard, [e.key]: false };

        $activeProject.noteTypes.forEach((noteType) => {
            if (noteType.shortcut === e.key) {
                makeNote(noteType);
            }
        });
    }

    function triggerFeedbackAnimation() {
        animateNoteFeedback = true;
        if (animateNoteFeedbackTimer) clearTimeout(animateNoteFeedbackTimer)
        animateNoteFeedbackTimer = setTimeout(() => {
            animateNoteFeedback = false;
            animateNoteFeedbackTimer = null;
        }, 200)
    }

    async function exportVideo() {
        const promises = $activeProject.notes[$activeVideo.path].map((note) => {
            return ipcRenderer.invoke("trim", {
                inputPath: $activeVideo.path,
                outputPath: outputPath + `/${note.noteType.name}@${note.timestamp.toFixed(0)}s--${note.id}.mp4`,
                start: note.timestamp,
                duration: 10,
            });
        });

        exportLoading = true;
        await Promise.all(promises);
        exportLoading = false;
        modalOpen = false;
    }

    onMount(() => {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    });

    onDestroy(() => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
    });
</script>

<div class="flex flex-col space-y-6">
    <div class="flex justify-between items-center">
        <div class="flex space-x-3 items-center">
            <div class="btn btn-square" on:click={navigateToProject}>
                <div class="w-6 h-6">
                    <FaArrowLeft />
                </div>
            </div>
            <h1 class="text-4xl font-bold">{$activeVideo.name}</h1>
        </div>
        <button class={"btn" + (exportLoading ? " loading btn-disabled" : "")} on:click={() => (modalOpen = !modalOpen)}>Export</button>
    </div>

    <div class="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-12">
        <div class="w-full space-y-3">
            <video bind:currentTime class={"rounded-lg transition-all" + (animateNoteFeedback ? " opacity-50 scale-95 rounded-3xl" : "")} controls>
                <source src={$activeVideo.path} type="video/mp4" />
                <track kind="captions" />
            </video>
            <div class="flex space-x-3">
                {#each $activeProject.noteTypes as noteType}
                    <button on:click={() => makeNote(noteType)} class="btn">{noteType.name}</button>
                {/each}
            </div>
        </div>
        <div class="w-2/5 space-y-3">
            {#each $activeProject.notes[$activeVideo.path] as note}
                <Note
                    on:seek={(e) => {
                        currentTime = e.detail.time;
                    }}
                    {note}
                />
            {/each}
            {#if $activeProject.notes[$activeVideo.path].length === 0}
                <p>Notes will appear here as you add them</p>
            {/if}
        </div>
    </div>
</div>

<Portal target="body">
    <div class={"modal cursor-pointer" + (modalOpen ? " modal-open" : "")}>
        <div class="modal-box relative cursor-default" use:clickOutside on:click_outside={() => (modalOpen = false)}>
            <h3 class="font-bold text-xl">Export</h3>
            <p class="py-4">Trim notes out of the video</p>
            <div class="space-y-3">
                <input bind:value={trimDuration} type="text" placeholder="Duration (seconds)" class="input input-bordered w-full focus:outline-none" />
                <input bind:value={outputPath} type="text" placeholder="Output Path" class="input input-bordered w-full focus:outline-none" />
            </div>
            <div class="modal-action">
                <button on:click={exportVideo} class={"btn" + (exportLoading ? " loading btn-disabled" : "")}> Export </button>
            </div>
        </div>
    </div>
</Portal>
