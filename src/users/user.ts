import { Schema, Document } from "mongoose";
import { ObjectType, InputType, Field } from "type-graphql";

export const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,

})

export interface UserDocument extends Document {
  id: string;
  firstname: string;
  lastname:string;
  email:string;
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class User {
  @Field()
  id:string;
  @Field()
  firstname:string;
  @Field()
  lastname:string;
  @Field()
  email:string;
}

@InputType()
export class CreateUserDTO {
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
}

@InputType()
export class UpdateUserDTO {
  @Field()
  id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
}