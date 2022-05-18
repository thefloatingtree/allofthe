import { nanoid } from 'nanoid'
import type { NoteModel } from './Note';
import type { NoteTypeModel } from './NoteType';

// type definitions copied from filedrop-svelte
interface DOMFile extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
export interface FileWithPath extends DOMFile {
    readonly path?: string;
}

export class ProjectModel {

    public id: string = nanoid()
    public noteTypes: Array<NoteTypeModel> = []
    public notes: { [key: string]: Array<NoteModel>} = {}

    constructor(
        public name: string,
        public videos: Array<FileWithPath>
    ) {}
}