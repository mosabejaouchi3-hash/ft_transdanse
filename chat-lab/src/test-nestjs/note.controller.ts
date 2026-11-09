import { Body, Controller, Get, Post, Res, HttpStatus } from "@nestjs/common";
import { NotesService } from './notes.service.js'
import type { Response } from "express";


@Controller('notes')
export class NotesController
{

    constructor(private NoteService: NotesService)
    {

    }
    
    @Post()
    create(@Res() res: Response, @Body('text') text: string)
    {
        this.NoteService.create(text);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get()
    findAll(): string []
    {
        return this.NoteService.findAll();
    }
}