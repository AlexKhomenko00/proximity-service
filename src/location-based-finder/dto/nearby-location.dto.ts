import { Location } from 'src/location/location.entity';
import { LongLatDto } from 'src/shared/long-lang.dto';

export class NearbyLocationDto {
  id: string;
  name: string;
  longLat: LongLatDto;
  city: string;
  state: string;
  county: string;

  static fromLocation(nearbyLocation: Location): NearbyLocationDto {
    const { id, name, longLat, city, state, county } = nearbyLocation;
    return {
      id,
      name,
      longLat: {
        longitude: longLat.getLong(),
        latitude: longLat.getLat(),
      },
      city,
      state,
      county,
    };
  }
}
