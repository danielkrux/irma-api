import { Document, Schema } from 'mongoose';

export const IncidentSchema = new Schema({
  name: String,
  description: String,
});

export interface Incident extends Document {
  name: String;
  description: String;
}
