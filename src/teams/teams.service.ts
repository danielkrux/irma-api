import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDocument, CreateTeamDTO } from './team';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly team: Model<TeamDocument>,
  ) {}

  async createTeam(team: CreateTeamDTO): Promise<TeamDocument> {
    return await (await this.team.create(team)).save();
  }

  async getTeam(teamId: string): Promise<TeamDocument> {
    return await this.team.findById(teamId).exec();
  }
}
