import { nanoid } from "nanoid";
import type { NoteTypeModel } from "./NoteType";

export class NoteModel {

    public id: string = nanoid()

    constructor(
        public noteType: NoteTypeModel,
        public timestamp: number
    ) {}
}