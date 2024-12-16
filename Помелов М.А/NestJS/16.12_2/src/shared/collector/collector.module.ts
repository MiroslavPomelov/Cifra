import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service';

@Module({
    providers: [CollectorService]
})
export class CollectorModule {}
