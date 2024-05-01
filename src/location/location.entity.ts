import { LongLat } from 'src/shared/long-lang';

export class Location {
  id: string;
  name: string;
  longLat: LongLat;
  city: string;
  state: string;
  county: string;
}
