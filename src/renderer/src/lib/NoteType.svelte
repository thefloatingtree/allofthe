<script lang="ts">
    import type { NoteTypeModel } from '../models/NoteType'
    import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
    import { activeProject } from '../stores/store';

    export let noteType: NoteTypeModel

    function removeNoteType() {
        $activeProject.noteTypes = $activeProject.noteTypes.filter(value => value.id !== noteType.id)
    }

    function updateActiveProject() {
        $activeProject.noteTypes = $activeProject.noteTypes.map(value => {
            if (value.id === noteType.id) {
                return noteType
            }
            return value
        })
    }
</script>

<div class="flex space-x-3">
    <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs focus:outline-none" on:change={updateActiveProject} bind:value={noteType.name} />
    <input type="text" placeholder="Shortcut" class="input input-bordered w-full max-w-xs focus:outline-none" on:change={updateActiveProject} bind:value={noteType.shortcut} />
    <button class="btn btn-square btn-error" on:click={removeNoteType}>
        <div class="w-5 h-5">
            <FaTrash />
        </div>
    </button>
</div>