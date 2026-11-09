import { B } from './decoClasseB.js'

export class A
{

    constructor(b)
    {
        this.ClassB = b;
        console.log('constructor A');
    }

    welcome()
    {
        this.ClassB.welcome();
        console.log('Class A');
    }
}

const b = new B();
const a = new A(b);


a.welcome();