import { Schema, Document } from 'mongoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { User } from 'src/users/user';

export const TeamSchema = new Schema({
  name: String,
  description: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface TeamDocument extends Document {
  id: string;
  name: String;
  description: String;
  admin: User;
  members: User[];
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class Team {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field(() => User)
  admin: User;
  @Field(() => [User])
  members: User[];
}

@InputType()
export class CreateTeamDTO {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  admin: string;
  @Field(() => [String])
  members: string[];
}

@InputType()
export class UpdateTeamDTO {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  admin: string;
  @Field(() => [String])
  member: string[];
}
