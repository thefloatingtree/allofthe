
// type definitions copied from filedrop-svelte
interface DOMFile extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
export interface FileWithPath extends DOMFile {
    readonly path?: string;
}

export class ProjectModel {
    constructor(
        public name: string,
        public videos: Array<FileWithPath>
    ) {}
}