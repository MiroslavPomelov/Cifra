import { Injectable } from '@nestjs/common';
import { Cats } from './cats';

@Injectable()
export class CatsService {
    private readonly cats: Cats[] = [
        new Cats('Bars', 7, 'sphynx'),
        new Cats('Snejok', 3, 'sadasdasd'),
        new Cats('Dima', 4, 'britain'),
    ]

    public async getAllCats(): Promise<Cats[]> {
        return this.cats;
    }

    public async getOneCat(): Promise<Cats> {
        const rndInt = Math.floor(Math.random() * this.cats.length-1) + 1
        return this.cats[rndInt];
    }
}


