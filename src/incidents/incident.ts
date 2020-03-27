import { Document, Schema } from 'mongoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Team } from '../teams/team';
import { Location, ILocation, LocationSchema, LocationDTO } from '../Models/location';

export const IncidentSchema = new Schema({
  title: String,
  description: String,
  location: LocationSchema,
  photos: [String],
  assignedTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
  created: { type: Date },
  updated: { type: Date, default: Date.now },
});

export interface IncidentDocument extends Document {
  id: string;
  title: String;
  description: String;
  location: ILocation;
  photos: string[];
  team: Team;
  created: Date;
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class Incident {
  @Field()
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => Location, { nullable: true })
  location: Location;
  @Field(() => [String])
  photos: string[];
  @Field(() => Team, { nullable: true })
  assignedTeam: Team;
  @Field()
  created: Date
}

@InputType()
export class CreateIncidentDTO {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => LocationDTO)
  location: Location;
  @Field(() => [String])
  photos: string[];
  @Field()
  assignedTeamId: string;
  @Field()
  created: Date
}

@InputType()
export class UpdateIncidentDTO {
  @Field()
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => [String])
  photos: string[];
  @Field(() => LocationDTO, { nullable: true })
  location: Location;
  @Field({ nullable: true })
  assignedTeamId: string;
  @Field()
  created: Date
}
