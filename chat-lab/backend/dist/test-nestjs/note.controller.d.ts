import { NotesService } from './notes.service.js';
import type { Response } from "express";
export declare class NotesController {
    private NoteService;
    constructor(NoteService: NotesService);
    create(res: Response, text: string): Response<any, Record<string, any>>;
    findAll(): string[];
}
