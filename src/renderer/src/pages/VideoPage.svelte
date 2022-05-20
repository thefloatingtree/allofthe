<script lang="ts">
    import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";
    import { onDestroy, onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import { activeProject, activeVideo, keyboard } from "../stores/store";
    import type { NoteTypeModel } from "../models/NoteType";
    import { NoteModel } from "../models/Note";
    import Note from "../lib/Note.svelte";

    let currentTime = 0;

    function navigateToProject() {
        navigate("/project");
    }

    function makeNote(noteType: NoteTypeModel) {
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

    onMount(() => {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    });

    onDestroy(() => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
    })
</script>

<div class="flex flex-col space-y-6">
    <div class="flex space-x-3 items-center">
        <div class="btn btn-square" on:click={navigateToProject}>
            <div class="w-6 h-6">
                <FaArrowLeft />
            </div>
        </div>
        <h1 class="text-4xl font-bold">{$activeVideo.name}</h1>
    </div>

    <div class="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-12">
        <div class="w-full space-y-3">
            <video bind:currentTime class="rounded-lg" controls>
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
            {#if $activeProject.notes[$activeVideo.path]}
                {#each $activeProject.notes[$activeVideo.path] as note}
                    <Note on:seek={(e) => { currentTime = e.detail.time }} {note} />
                {/each}
            {/if}
        </div>
    </div>
</div>
