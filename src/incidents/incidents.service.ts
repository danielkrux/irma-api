import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Incident, CreateIncidentDTO, UpdateIncidentDTO } from './incident';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel('Incident') private readonly incident: Model<Incident>,
  ) {}

  async getIncidents(): Promise<Incident[]> {
    return (await this.incident.find().exec()) as Incident[];
  }

  async getIncident(incidentId: string): Promise<Incident> {
    return (await this.incident.findById(incidentId).exec()) as Incident;
  }

  async createIncident(incident: CreateIncidentDTO): Promise<Incident> {
    return await (await this.incident.create(incident)).save();
  }

  async updateIncident(incident: UpdateIncidentDTO): Promise<Incident> {
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
