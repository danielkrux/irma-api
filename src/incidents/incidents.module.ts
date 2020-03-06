import { Module } from '@nestjs/common';
import { IncidentsResolver } from './incidents.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidentSchema } from './incident';
import { IncidentsService } from './incidents.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Incident', schema: IncidentSchema}])],
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
