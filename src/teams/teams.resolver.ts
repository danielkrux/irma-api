import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Team, CreateTeamDTO, TeamDocument, UpdateTeamDTO } from './team';
import { TeamsService } from './teams.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/user';

@Resolver('Teams')
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Team])
  async teams(): Promise<TeamDocument[]> {
    return await this.teamsService.getTeams();
  }

  @Query(() => Team)
  async team(
    @Args({ name: 'userId', nullable: true, type: () => String })
    userId: string,
    @Args({ name: 'teamId', nullable: true, type: () => String })
    teamId: string,
  ): Promise<TeamDocument> {
    if (userId) {
      return await this.teamsService.getTeamByUserId(userId);
    } else return await this.teamsService.getTeam(teamId);
  }

  @Mutation(() => Team)
  async createTeam(@Args('team') input: CreateTeamDTO): Promise<TeamDocument> {
    return await this.teamsService.createTeam(input);
  }

  @Mutation(() => Team)
  async updateTeam(@Args('team') input: UpdateTeamDTO): Promise<TeamDocument> {
    return await this.teamsService.updateTeam(input);
  }

  @Mutation(() => Team)
  async createMemberAndAdd(@Args('user') user: CreateUserDTO, @Args('team') team: UpdateTeamDTO): Promise<TeamDocument> {
    const member = await this.usersService.createUser(user);
    const updatedMembers = [...team.members, member.id]
    return await this.teamsService.updateTeam({...team, members: updatedMembers})
  }

  @Mutation(() => Team)
  async addMember(@Args('userId') userId:string, @Args('team') team: UpdateTeamDTO): Promise<TeamDocument> {
    const user = await this.usersService.getUser(userId);
    if(!user) throw new Error('User not found')
    const updatedMembers = [...team.members, userId]
    return await this.teamsService.updateTeam({...team, members: updatedMembers})
  }
}
