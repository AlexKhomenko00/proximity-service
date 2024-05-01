import type { LongLat } from 'src/shared/long-lang';

export interface NearbyLocationsSearchPayload {
  longLat: LongLat;
  radiusInKm: number;
  minimumDesiredLocationCount: number;
}
