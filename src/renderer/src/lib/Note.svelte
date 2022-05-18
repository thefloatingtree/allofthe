<script lang="ts">
    import type { NoteModel } from "../models/Note";

    export let note: NoteModel
</script>

<div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
    <p class="font-bold text-lg">{note.noteType.name}</p>
    <p>{note.timestamp.toFixed(1)} second(s)</p>
</div>