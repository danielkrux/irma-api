import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Incident, CreateIncidentDTO, UpdateIncidentDTO } from './incident';
import { IncidentsService } from './incidents.service';

@Resolver()
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Query(() => [Incident])
  async incidents() {
    return this.incidentsService.getIncidents();
  }

  @Query(() => [Incident])
  async incident(@Args('id') id: string) {
    return this.incidentsService.getIncident(id);
  }

  @Mutation(() => Incident)
  async createIncident(@Args('incident') input: CreateIncidentDTO) {
    return this.incidentsService.createIncident(input);
  }

  @Mutation(() => Incident)
  async updateIncident(@Args('incident') input: UpdateIncidentDTO) {
    return this.incidentsService.updateIncident(input);
  }
}
