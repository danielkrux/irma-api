import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDocument, CreateTeamDTO, UpdateTeamDTO } from './team';
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
    return await this.team
      .findById(teamId)
      .populate('admin')
      .populate('members')
      .exec();
  }

  async getTeamByUserId(userId: string): Promise<TeamDocument> {
    return await this.team
      .findOne({ members: userId })
      .populate('admin')
      .populate('members');
  }

  async createTeam(team: CreateTeamDTO): Promise<TeamDocument> {
    return await (await this.team.create(team)).save();
  }

  async updateTeam(team: UpdateTeamDTO): Promise<TeamDocument> {
    return await (await this.team.findByIdAndUpdate(team.id, team)).save();
  }
}
