import { Module } from '@nestjs/common';
import { IncidentsResolver } from './incidents.resolver';

@Module({
  providers: [IncidentsResolver]
})
export class IncidentsModule {}
