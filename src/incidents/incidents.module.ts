import { Module } from '@nestjs/common';
import { IncidentsResolver } from './incidents.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidentSchema } from './incident';
import { IncidentsService } from './incidents.service';
import { TeamsModule } from '../teams/team.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Incident', schema: IncidentSchema }]),
    TeamsModule,
  ],
  exports: [IncidentsService],
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
