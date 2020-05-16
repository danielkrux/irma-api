import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { IncidentsResolver } from './incidents.resolver';
import { IncidentsService } from './incidents.service';
import { TeamsModule } from '../teams/team.module';
import { IncidentSchema, CreateIncidentDTO, IncidentDocument, UpdateIncidentDTO } from './incident';

describe('IncidentsResolver', () => {
  let incidentsResolver: IncidentsResolver;
  let incidentsService: IncidentsService;
  let moduleRef: TestingModule;
  let createdIncident: IncidentDocument

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/irma', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }),
        MongooseModule.forFeature([{ name: 'Incident', schema: IncidentSchema }]),
        TeamsModule,
      ],
      providers: [IncidentsResolver, IncidentsService]
    }).compile();

    incidentsService = moduleRef.get<IncidentsService>(IncidentsService);
    incidentsResolver = moduleRef.get<IncidentsResolver>(IncidentsResolver);
  })

  describe('getIncidents', () => {
    it('should return an array of incidents', async () => {
      const result = await incidentsService.getIncidents()
      jest.spyOn(incidentsService, 'getIncidents').mockImplementation(async() => result);
      expect(await incidentsService.getIncidents()).toBe(result);
    });
  });

  describe('createIncident', () => {
    it('should create an incident', async () => {
      const result = await incidentsService.getIncidents()
      const incident: CreateIncidentDTO = {
        title: 'test', 
        description: 'test', 
        assignedTeamId: '5ea80b51a45c1e38705dfe2d',
        location: {
          adress: '',
          lat: 0,
          lng: 0,
        },
        created: new Date(),
        photos: ['']
      } 
      createdIncident = await incidentsService.createIncident(incident);
    });
  });

  describe('updateIncident', () => {
    it('should update an incident', async () => {
      const incident: UpdateIncidentDTO = {
        id: createdIncident.id,
        title: 'test2', 
        description: 'test', 
        assignedTeamId: '5ea80b51a45c1e38705dfe2d',
        location: {
          adress: '',
          lat: 0,
          lng: 0,
        },
        created: new Date(),
        photos: [''],
        resolved: createdIncident.resolved,
        priority: createdIncident.priority
      }
      await incidentsService.updateIncident(incident)
      const updatedIncident = await incidentsService.getIncident(incident.id)
      expect(updatedIncident.title).toBe(incident.title)
    })
  })

  describe('deleteIncident', () => {
    it('should delete an incident', async () => {
      await incidentsService.deleteIncident(createdIncident.id);
    });
  });

  afterAll(() => {
    moduleRef.close()
  })
});
