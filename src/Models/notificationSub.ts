import { Schema, Document } from 'mongoose';

// const KeysSchema = new Schema({
//   p256dh: String,
//   auth: String
// })

export const NotificationSubSchema = new Schema({
  subscriptionId: String,
  endpoint: String,
  exporationTime: String,
  keys: {
    p256dh: String,
    auth: String
  }
})

export interface NotificationSub extends Document{
  subscriptionId: string;
  endpoint: string;
  exporationTime: string;
  keys?: {
    p256dh: string;
    auth: string;
  }
}
