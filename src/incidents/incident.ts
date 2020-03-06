import { Document, Schema } from 'mongoose';
import { ObjectType, Field, InputType, ID, ArgsType } from 'type-graphql';

export const IncidentSchema = new Schema({
  name: String,
  description: String,
});

export interface Incident extends Document {
  name: String;
  description: String;
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class IncidentType {
  @Field(() => ID)
  id: string;
  @Field()
  name: String;
  @Field()
  description: String;
}

@ArgsType()
@InputType()
export class CreateIncidentDTO {
  @Field()
  name: String;
  @Field()
  description: String;
}

@InputType()
export class UpdateIncidentDTO {
  @Field(() => ID)
  id: String;
  @Field()
  name: String;
  @Field()
  description: String;
}
