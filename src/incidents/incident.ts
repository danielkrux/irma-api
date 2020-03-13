import { Document, Schema } from 'mongoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Team } from '../teams/team';

export const IncidentSchema = new Schema({
  title: String,
  description: String,
  assignedTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export interface IncidentDocument extends Document {
  id: string;
  title: String;
  description: String;
  team: Team;
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class Incident {
  @Field()
  id: string;
  @Field({nullable:true})
  title: string;
  @Field({nullable:true})
  description: string;
  @Field(() => Team, { nullable: true })
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
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  assignedTeamId: string;
}
