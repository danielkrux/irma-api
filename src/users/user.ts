import { Schema, Document } from "mongoose";
import { ObjectType, InputType, Field } from "type-graphql";
import { NotificationSubSchema, NotificationSub } from "../Models2/notificationSub";

export const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  isSuperAdmin: Boolean,
  notificationSubscription: NotificationSubSchema
})

export interface UserDocument extends Document {
  id: string;
  firstname: string;
  lastname:string;
  password:string;
  email:string;
  isSuperAdmin: boolean;
  notificationSubscription?: NotificationSub
}

/////////////////////////
//// GraphQL Models /////
/////////////////////////

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  isSuperAdmin: boolean;
  notificationSubscription?: NotificationSub | null
}

@InputType()
export class CreateUserDTO {
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true, defaultValue: false })
  isSuperAdmin: boolean;
  notificationSubscription: null
}

@InputType()
export class UpdateUserDTO {
  @Field()
  id: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field({ nullable: true })
  email: string;
  notificationSubscription: NotificationSub
}