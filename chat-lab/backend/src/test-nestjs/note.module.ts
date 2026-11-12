import {Module} from '@nestjs/common'
import { NotesService } from './notes.service.js'
import { NotesController } from './note.controller.js'

@Module(
{
        providers: [NotesService],
        controllers: [NotesController],
})
export class NotesModule { }