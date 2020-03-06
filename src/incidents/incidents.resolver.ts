import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncidentType, CreateIncidentDTO, UpdateIncidentDTO } from './incident';
import { IncidentsService } from './incidents.service';

@Resolver()
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Query(() => [IncidentType])
  async incidents() {
    return this.incidentsService.getIncidents();
  }

  @Query(() => [IncidentType])
  async incident(@Args('id') id: string) {
    return this.incidentsService.getIncident(id);
  }

  @Mutation(() => IncidentType)
  async createIncident(@Args('incident') input: CreateIncidentDTO) {
    return this.incidentsService.createIncident(input);
  }

  @Mutation(() => IncidentType)
  async updateIncident(@Args('incident') input: UpdateIncidentDTO) {
    return this.incidentsService.updateIncident(input);
  }
}
