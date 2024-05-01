import { Location } from 'src/location/location.entity';

export class NearbyLocationDto {
  id: string;
  name: string;
  longLat: {
    long: number;
    lat: number;
  };
  city: string;
  state: string;
  county: string;

  static fromLocation(nearbyLocation: Location): NearbyLocationDto {
    const { id, name, longLat, city, state, county } = nearbyLocation;
    return {
      id,
      name,
      longLat: {
        long: longLat.getLong(),
        lat: longLat.getLat(),
      },
      city,
      state,
      county,
    };
  }
}
