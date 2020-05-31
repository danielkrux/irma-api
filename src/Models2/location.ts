import { Schema } from 'mongoose';
import { ObjectType, Field, Float, InputType } from 'type-graphql';

export const LocationSchema = new Schema({
  lat: Number,
  lng: Number,
  adress: String,
});

export interface ILocation {
  lat: number;
  lng: number;
  adress: string;
}

@ObjectType()
export class Location {
  @Field(() => Float)
  lat: number;
  @Field(() => Float)
  lng: number;
  @Field()
  adress: string;
}

@InputType()
export class LocationDTO {
  @Field(() => Float)
  lat: number;
  @Field(() => Float)
  lng: number;
  @Field()
  adress: string;
}
