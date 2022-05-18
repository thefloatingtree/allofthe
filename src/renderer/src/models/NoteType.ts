import { nanoid } from 'nanoid'

export class NoteTypeModel {

    public id: string = nanoid()

    constructor(
        public name: string,
        public shortcut: string
    ) {}
}