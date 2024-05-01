import type { LongLat } from 'src/shared/long-lang';
import type { NearbyLocationsSearchPayload } from './interface/nearby-locations-search-payload.interface';

export abstract class LocationBasedFinderRepository {
  public abstract getNearbyLocationIds(
    payload: NearbyLocationsSearchPayload,
  ): Promise<string[]>;

  public abstract addLocation(id: string, longLat: LongLat): Promise<void>;
}
