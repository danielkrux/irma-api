import { User } from "../users/user";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  accesToken: string;
  @Field()
  user: User;
}

@InputType()
export class LoginDTO {
  @Field()
  email: string;
  @Field()
  password: string;
}

export class RegisterDTO {
  user: User;
  password: string;
}