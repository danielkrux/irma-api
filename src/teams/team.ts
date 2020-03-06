import { Schema, Document } from "mongoose";
import { Field, ObjectType, ID, InputType } from "type-graphql";

export const TeamSchema = new Schema({
  name:String,
  description:String,
})

export interface TeamDocument extends Document {
  name:String,
  description: String
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string;
  @Field()
  name: String;
  @Field()
  description: String;
}

@InputType()
export class CreateTeamDTO {
  @Field()
  name: String;
  @Field()
  description: String;
}

@InputType()
export class UpdateTeamDTO {
  @Field(() => ID)
  id: String;
  @Field()
  name: String;
  @Field()
  description: String;
}