import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDocument, CreateTeamDTO, Team } from './team';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly team: Model<TeamDocument>,
  ) {}

  async getTeams(): Promise<TeamDocument[]> {
    return await this.team
      .find()
      .populate('admin')
      .populate('members')
      .exec();
  }

  async getTeam(teamId: string): Promise<TeamDocument> {
    return await this.team.findById(teamId).exec();
  }

  async createTeam(team: CreateTeamDTO): Promise<TeamDocument> {
    return await (await this.team.create(team)).save();
  }
}
