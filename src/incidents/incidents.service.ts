import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId, Types, Mongoose } from 'mongoose';
import {
  IncidentDocument,
  CreateIncidentDTO,
  UpdateIncidentDTO,
  Incident,
} from './incident';
import { TeamsService } from '../teams/teams.service';
import { NotificationSub } from 'src/models/notificationSub';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel('Incident') private readonly incident: Model<IncidentDocument>,
    private readonly teamsService: TeamsService,
  ) { }

  async getIncidents(): Promise<IncidentDocument[]> {
    return (await this.incident
      .find()
      .populate('assignedTeam')
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
    if (!isValidObjectId(incident.assignedTeamId)) throw new Error('Not a valid team id');
    const team = await this.teamsService.getTeam(incident.assignedTeamId);
    if (!team) throw new Error('Team not found');
    const assignedTeamObjectId = Types.ObjectId(incident.assignedTeamId)
    return await this.incident.create({ ...incident, assignedTeam: assignedTeamObjectId, resolved: false })
  }

  async updateIncident(incident: UpdateIncidentDTO): Promise<IncidentDocument> {
    return await (
      await this.incident.findByIdAndUpdate(incident.id, incident, {
        new: true,
      })
    ).save();
  }

  async updateIncidentNotificationSubscribers(incidentId: number, notiSub: NotificationSub) {
    const incident = await this.incident.findById(incidentId)
    incident.subscribers.push(notiSub)
    await incident.save();
  }

  async deleteIncident(incidentId: string): Promise<boolean> {
    const result = await this.incident.deleteOne({ _id: incidentId }).exec();
    if (result.ok !== 1) { 
      return false
    } else {
      return true
    }; 
  }
}
