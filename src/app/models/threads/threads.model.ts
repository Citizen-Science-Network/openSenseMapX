import { ID } from '@datorama/akita';

export interface Thread {
  _id: ID;
  title: string;
  owner: string;
  date: Date; 
  comments: Array<string>;
  campaign: string;
}