import { Injectable } from "@nestjs/common";


@Injectable()
export class NotesService
{
    arr: string[] = [];

    create(text: string)
    {
        this.arr.push(text);
    }

    findAll(): string[]
    {
        return this.arr;
    }
}