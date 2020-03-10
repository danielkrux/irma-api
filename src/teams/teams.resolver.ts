import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Team, CreateTeamDTO, TeamDocument } from './team';
import { TeamsService } from './teams.service';

@Resolver('Teams')
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => [Team])
  async teams(): Promise<TeamDocument[]> {
    return await this.teamsService.getTeams();
  }

  @Mutation(() => Team)
  async createTeam(@Args('team') input: CreateTeamDTO): Promise<TeamDocument> {
    return await this.teamsService.createTeam(input);
  }
}
