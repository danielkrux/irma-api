import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Team, CreateTeamDTO } from './team';
import { TeamsService } from './teams.service';

@Resolver('Teams')
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  async createTeam(@Args('team') input: CreateTeamDTO) {
    return this.teamsService.createTeam(input);
  }
}
