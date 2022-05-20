<script lang="ts">
    import { activeProject, activeVideo } from "../stores/store";
    import FaTrash from "svelte-icons/fa/FaTrash.svelte";
    import type { NoteModel } from "../models/Note";
    import { createEventDispatcher } from "svelte";

    export let note: NoteModel;

    const dispatch = createEventDispatcher();

    function removeNote() {
        $activeProject.notes = {
            ...$activeProject.notes,
            [$activeVideo.path]: $activeProject.notes[$activeVideo.path].filter((value) => value.id !== note.id),
        };
    }

    function seek() {
        dispatch('seek', { time: note.timestamp })
    }
</script>

<div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all" on:click={seek}>
    <p class="font-bold text-lg">{note.noteType.name}</p>
    <p>{note.timestamp.toFixed(1)} second(s)</p>
    <button class="btn btn-square btn-error" on:click={removeNote}>
        <div class="w-5 h-5">
            <FaTrash />
        </div>
    </button>
</div>
