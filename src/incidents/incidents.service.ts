import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import {
  IncidentDocument,
  CreateIncidentDTO,
  UpdateIncidentDTO,
} from './incident';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel('Incident') private readonly incident: Model<IncidentDocument>,
    private readonly teamsService: TeamsService,
  ) {}

  async getIncidents(): Promise<IncidentDocument[]> {
    return (await this.incident
      .find()
      .populate({
        path: 'assignedTeam',
        populate: ['admin', 'members'],
      })
      .exec()) as IncidentDocument[];
  }

  async getIncident(incidentId: string): Promise<IncidentDocument> {
    return (await this.incident
      .findById(incidentId)
      .exec()) as IncidentDocument;
  }

  async createIncident(incident: CreateIncidentDTO): Promise<IncidentDocument> {
    if (!isValidObjectId(incident.assignedTeamId))
      throw new Error('Not a valid id');
    const team = await this.teamsService.getTeam(incident.assignedTeamId);
    if (!team) throw new Error('Team not found');
    const newIncident = {
      title: incident.title,
      description: incident.description,
      location: incident.location,
      assignedTeam: team.id,
      created: Date.now()
    };
    return await (await this.incident.create(newIncident)).save();
  }

  async updateIncident(incident: UpdateIncidentDTO): Promise<IncidentDocument> {
    return await (
      await this.incident.findByIdAndUpdate(incident.id, incident, {
        new: true,
      })
    ).save();
  }

  async deleteIncident(incidentId: string): Promise<boolean> {
    const result = await this.incident.deleteOne({ _id: incidentId }).exec();
    if (result.ok !== 1) return false;
  }
}
