import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cats } from './cats';

@Controller('cat')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get('all')
    public async getAllCats(): Promise<Cats[]> {
        return await this.catsService.getAllCats();
    }

    @Get('one')
    public async getOneCat(): Promise<Cats> {
        return await this.catsService.getOneCat();
    }
}



