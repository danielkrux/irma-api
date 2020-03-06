import { Document, Schema } from 'mongoose';
import { ObjectType, Field, InputType, ID, Int } from 'type-graphql';
import { Team, CreateTeamDTO, UpdateTeamDTO } from '../teams/team';

export const IncidentSchema = new Schema({
  title: String,
  description: String,
  assignedTeam: { type: Schema.Types.ObjectId, ref: 'Team'}
});

export interface IncidentDocument extends Document {
  id:string;
  title: String;
  description: String;
  team: Team
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class Incident {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => Team)
  assignedTeam: Team;
}

@InputType()
export class CreateIncidentDTO {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  assignedTeamId: string;
}

@InputType()
export class UpdateIncidentDTO {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  assignedTeamId: string;
}
